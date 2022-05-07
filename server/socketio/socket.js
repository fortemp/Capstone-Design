const SocketIO = require('socket.io');
const passport = require('passport')
const Room = require('../models/Room')
module.exports = (server,app,sessionMid)=>{
    //R은 room섹션, C는 chat섹션, G는 game섹션 
    //같은 emit이름에 R,C,G만 붙여서 보내는 경우가 있음.
    const wrap = middleware=>(socket,next) =>middleware(socket.request, {}, next);
    const io = SocketIO(server,{maxHttpBufferSize:1e7, pingInterval:2500,pingTimeout: 60000,})

    app.set('io',io);

    const room = io.of('/room')
    const public = io.of('/public');

    public.use(wrap(sessionMid));
    room.use(wrap(sessionMid));
    room.use(wrap(passport.initialize()));
    room.use(wrap(passport.session()));

    // room.use((socket,next)=>{  인증안된 사용자들 ignore하는 코드
    //     if(socket,request.user){
    //         next()
    //     }else{
    //         next(new Error('unauthorized'))
    //     }
    // })

    public.on('connection', (socket)=>{//방 안들어가도 공개채팅할수있게
        const ip = socket.request.headers['x-forwarded-for']||socket.request.connection.remoteAddress;
        console.log(`public에 새로운 클라이언트 접속 아이피:${ip} 소켓아이디: ${socket.id}`);
        
        socket.on('sendChat',(message)=>{
            if(!myName){//로그인하지 않은 유저라면
                socket.broadcast.emit('publicMessage',{name:'익명' , message:message,fromWhom:'other'});
                socket.emit('publicMessage',{name:'익명' , message:message,fromWhom:'me'});
            }else{//로그인을 한 유저라면
                socket.broadcast.emit('publicMessage',{name:socket.who.name , message:message,fromWhom:'other'});
                socket.emit('publicMessage',{name:socket.who.name , message:message,fromWhom:'me'});
            }
        })

    })

    room.on('connection', (socket)=>{//방 들어간 사람들끼리
        const ip = socket.request.headers['x-forwarded-for']||socket.request.connection.remoteAddress;
        console.log(`room에 새로운 클라이언트 접속 아이피:${ip} 소켓아이디: ${socket.id}`);
        let myName;
        if(socket.request.session.passport != null){//로그인 했다면
            socket.who = socket.request.user
        //    myName = socket.who.name;                          <-----------------------------이거 주석 지우면 안돌아감 
            //who에 user객체 저장되어 있음
        }
        //방들어가는 함수
        socket.on('joinRoom',async (room_id,title,password)=>{
            let roomPassFlag = false;
            if(!socket.who){//로그인 안한 사용자임
                console.log('로그인안함')
                return socket.emit("roomError",{message:"먼저 로그인해주세요."})
            }
            
            if(socket.room){//만약 사용자가 어떤 방에 들어가 있다면 먼저 나간다.

                if(socket.room===room_id){//같은방에 들어 갈려고 시도했다면
                    return socket.emit("roomError",{message:"이미 들어간 방입니다."})
                }

                let room = await Room.findOne({where:{room_id:socket.room}})//들어갔던 방을 찾기
                
                if(room.people<=1){//나간방에 자기 혼자밖에 없었다면 그방을 없앰
                    await Room.destroy({where:{room_id:socket.room}})
                    .catch(err=>{
                        return socket.emit("roomError",{message:"방을 지우는데 문제가 발생하였습니다.",error:err})
                    })
                }else{//나간방에 누군가 있을때
                    //자기가 들어갔던 방에 나간다는 말을 한다.
                    socket.broadcast.to(socket.room).emit('announce',{message:`${myName}님이 나가셨습니다.`})
                    await Room.increment({people:-1},{where:{room_id:socket.room}});
                }
                socket.leave(socket.room);
            } 
            
            roomPassFlag = await Room.findOne({where:{room_id:room_id}})
            .then(async room=>{
                if(room.ispass){//비밀번호가 있으면
                    if(room.password!==password){//비밀번호 비교
                        socket.emit("roomError",{message:"비밀번호가 틀립니다."})
                        return false
                    }
                }
                if(room.max_people < room.people+1){//방이 꽉차면
                    socket.emit("roomError",{message:"방이 가득찼습니다."})
                    return false
                }
                return true
            })
            .catch(err=>{
                console.log(err)
                socket.emit("roomError",{message:"에러가 발생했습니다."})
                return false;
            })
            if(roomPassFlag){
                socket.room = room_id;
                socket.join(room_id);
                await Room.increment({people:1},{where:{room_id:room_id}});
                //R은 room섹션, C는 chat섹션, G는 game섹션 
                socket.emit("roomJoinedR",{message:`${title} 방에 입장했습니다. `,room:{roomId:socket.room,roomName:title}})//사용자에게 방에 입장했음을 알림
                socket.broadcast.to(socket.room).emit("refreshR");//방에오면 방목록을 새로고침하라고 방에 있는 인원에게 알림
                socket.broadcast.to(socket.room).emit("roomJoinedC",{message:`${myName}님이 ${title} 방에 입장했습니다. `,fromWhom:'announce',name:'announce',room:{roomId:socket.room,roomName:title}})
                //방에 있는 인원들에게 자신이 왔다고 알림; 채팅
                socket.broadcast.to(socket.room).emit("roomJoinedG",{message:`${title} 방에 입장했습니다. `,room:{roomId:socket.room,roomName:title}})
                //방에 있는 인원들에게 자신이 왔다고 알림; 게임
            }
        })

        //방나가는 함수
        socket.on('disconnect',async ()=>{

            if(socket.room){//만약 사용자가 어떤 방에 들어가 있다면 먼저 나간다.

                //사용자가 들어갔던 방의 현재 인원을 구한다.
                const curpeople = await Room.findOne({where:{room_id:socket.room}}).then(room=>room.people)

                if(curpeople<=1){//나 한명밖에 없다면
                    await Room.destroy({where:{room_id:socket.room}})
                    .catch(err=>{
                        return socket.emit("roomError",{message:"방을 지우는데 문제가 발생하였습니다.",error:err})
                    })
                    return;//함수 끝냄
                }
                //나갔는데 사람들이 1명이상 남아있다면
                //자기가 들어갔던 방에 나간다는 말을 한다.
                socket.broadcast.to(socket.room).emit("roomLeavedC",{message:`${myName}님이 나가셨습니다. `,fromWhom:'announce',name:'announce'})
                await Room.increment({people:-1},{where:{room_id:socket.room}});
                socket.leave(socket.room);
                socket.room = undefined;
            }
        })

        //채팅보내기
        socket.on('sendChat',(message)=>{
            //방인원 전부에게 보내고, 나 자신에게도 보냄
            const room_id = socket.room;
            const clients = socket.adapter.rooms.get(room_id);
            const adapterOfMe = socket.adapter.rooms.get(socket.id);
            adapterOfMe.add(message)
            console.log(adapterOfMe)
            socket.broadcast.to(socket.room).emit('roomMessage',{name:socket.who.name , message:message,fromWhom:'other'});
            socket.emit('roomMessage',{name:socket.who.name , message:message,fromWhom:'me'});
        })

        //아래의 함수들은 socket.adapter를 사용하여 구현, adapter로 해당 room의 정보를 알수 있음.

        //준비
        socket.on('ready',()=>{
            const adapterOfMe = socket.adapter.rooms.get(socket.id);//Set자료구조임
            adapterOfMe.add('ready')
        })

        //준비풀기
        socket.on('unready',()=>{
            const adapterOfMe = socket.adapter.rooms.get(socket.id);//Set자료구조임
            adapterOfMe.delete('ready')
        })
        
        //게임시작:게임시작 요청이 오면 방의 인원 모두에게 문제정보를 송신한다. (방인원의 준비상태 체크必)
        socket.on('startgame',()=>{

        })

        //코드 보내기:여기서 누군가 코드를 보냈음을 방 인원전부에게 알린다.(채점중)
        //그리고 클라이언트가 보낸코드를 돌리고, 결과를 방의 인원 모두에게 보낸다
        socket.on('sendCode',(room_id,text)=>{

        })

        //누군가의 코드가 정답일시 방의 호스트가 게임이 끝났음을 서버에 알린다.
        //이때 elo레이팅의 계산을 하고, 각각의 client들에게 채팅으로 elo의 결과를 알린다.
        socket.on('gameEnded',(room_id)=>{

        })

    })
}