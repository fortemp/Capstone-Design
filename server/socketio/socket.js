const SocketIO = require('socket.io');
const passport = require('passport')
const {Room} = require('../models/Room')
module.exports = (server,app,sessionMid)=>{
    
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
        console.log('public에 새로운 클라이언트 접속 ',ip,' ',socket.id);
        socket.emit('hello');
    })

    room.on('connection', (socket)=>{//방 들어간 사람들끼리
        const ip = socket.request.headers['x-forwarded-for']||socket.request.connection.remoteAddress;
        console.log('room에 새로운 클라이언트 접속 ',ip,' ',socket.id);

        if(socket.request.session.passport != null){//로그인 했다면
            socket.who = socket.request.user
        }

        socket.on('joinRoom',(roomId,name,password)=>{
            if(!socket.who){//로그인 안한 사용자임
                console.log('로그인안함')
                return socket.emit("roomError",{message:"먼저 로그인해주세요."})
            }
            if(socket.room){//만약 사용자가 어떤 방에 들어가 있다면 먼저 나간다.

                if(socket.room===roomId)//같은방에 들어 갈려고 시도했다면
                        return socket.emit("roomError",{message:"이미 들어간 방입니다."})

                //사용자가 들어갔던 방의 현재 인원을 구한다. 이는 익스프레스 서버에 변수로 저장함.
                let prevRoomPeopleNum = app.get(socket.room);

                if(prevRoomPeopleNum===1){//나간방에 자기 혼자밖에 없었다면 그방을 없앰
                    app.set(socket.room,undefined);
                    Room.deleteOne({_id:socket.room},(err)=>{
                        return socket.emit("roomError",{message:"방을 지우는데 문제가 발생하였습니다.",error:err})
                    });
                }else{//나간방에 누군가 있을때
                    //자기가 들어갔던 방에 나간다는 말을 한다.
                    socket.broadcast.to(socket.room).emit('announce',{message:`${socket.who.name}님이 나가셨습니다.`})
                    app.set(socket.room, prevRoomPeopleNum-1);
                }
                socket.leave(socket.room);
            }

            // Room.findOne({_id:roomId}).exec()
            // .then(result=>{
            //     const room = result

            //     room.comparePassword(password,(err,isMatch)=>{//먼저 패스워드 검사

            //         if(err){//에러 
            //             return socket.emit("error",{message:"에러가 발생했습니다."})
            //         }
            //         if(!isMatch){//비번 틀림
            //             return socket.emit("error",{message:"비밀번호가 틀렸습니다."})
            //         }
            //     })
            //     //방이 가득찼다면
            // })
            // .catch(err=>{
            //     return socket.emit("error",{message:"에러가 발생했습니다."})
            // })

            //socket.join(_id)
            
        })
    })
}