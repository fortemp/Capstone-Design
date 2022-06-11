const SocketIO = require('socket.io');
const passport = require('passport')
const Room = require('../models/Room')
const User = require('../models/User')
const Problem = require('../models/Problem');
const {executeCode} = require('../util/GradingApi')
const {eloRating} = require('../util/elo');
const db = require('../models/index');
const { Sequelize } = require('../models/index');
module.exports = (server,app,sessionMid)=>{

    var winnerArr = new Array();//방을 데이터베이스에서 메모리로 옮기고싶음(원래 이렇게해야됨), 구현에대한 구상이 떠오르는대로 실행에 옮길예정
    var Timer = new Array();//타이머 배열
    var TimerFlag = new Array();//타이머가 작동중인지 아닌지 배열
    var roomRoundStatus = new Array();//방의 라운드 상황을저장하는 배열
    var players = new Array();//방에있는 플레이어 현황
    var elo = new Array();//각방의 elo계산결과를 담아두는 배열
    var winnerLimit = {//승자 한계
        '2':1,'3':2,'4':2,'5':2,'6':2,'7':3,'8':3
    }
    function getObjectbyValueInArray(arr,value){//어레이 안에서 객체를 key값만으로 찾을때 쓰는 함수
        let result = arr.find(x=>{
            return x.socketId===value
        })
        return result
    }
    function passportInfoFilter(passportObj){//패스포트객체안에 비밀번호라던가 쓸모없는 정보가 통째로 들어가있음. 걸러줘야..
        const userObj = passportObj.dataValues
        const data = {
            name:userObj.name,
            img_url:userObj.img_url,
            elo:userObj.elo,
            point:userObj.point,
            user_id:userObj.user_id,
        }
        return data;

    }

    function GameTimeOut(socket){
        socket.broadcast.to(socket.room).emit("timeout");
        socket.emit('timeout')
        TimerFlag[socket.room] = false;
    }
    
    function getRandomProblemExceptThat(problemArr,playedProblem){
        console.log(playedProblem)
        while(true){
            let randomProblemNumber = Math.floor(Math.random() * problemArr.length);//중복이 안될때 까지 임의의 숫자를 뽑음
            let dupflag = false;
            for(let i=0; i<playedProblem.length; i++){
                if(problemArr[randomProblemNumber].problem_id === playedProblem[i]){ //같은거 있으면 안됨
                    dupflag = true;
                    break;
                }
            }
            if(!dupflag){
                return randomProblemNumber;
            }
        }
    }
    //R은 room섹션, C는 chat섹션, G는 game섹션 
    //같은 emit이름에 R,C,G만 붙여서 보내는 경우가 있음.
    const wrap = middleware=>(socket,next) =>middleware(socket.request, {}, next);
    const io = SocketIO(server,{maxHttpBufferSize:1e7, pingInterval:2500,pingTimeout: 60000})

    app.set('io',io);

    const room = io.of('/room')
    const public = io.of('/public');


    public.use(wrap(sessionMid));
    room.use(wrap(sessionMid));//세션미들웨어를 사용한다는뜻. 즉 로그인이 되어있는지 여부를 확인가능

    room.use(wrap(passport.initialize()));//패스포트 미들웨어를 사용한다는뜻, 즉 로그인이 되어있는사람의 정보를 알수 있음.
    room.use(wrap(passport.session()));
    public.use(wrap(passport.initialize()));
    public.use(wrap(passport.session()));


    public.on('connection', (socket)=>{//방 안들어가도 공개채팅할수있게
        const ip = socket.request.headers['x-forwarded-for']||socket.request.connection.remoteAddress;
        console.log(`public에 새로운 클라이언트 접속 아이피:${ip} 소켓아이디: ${socket.id}`);
        socket.emit('publicMessage',{name:'알림', message:"안녕하세요!! CCC입니다.", fromWhom:'announce'});
        socket.who = false;
        if(socket.request.session.passport){
            if(socket.request.session.passport.constructor === Object
                && Object.keys(socket.request.session.passport).length !== 0){//로그인 했다면
                socket.who = socket.request.user
            }
        }

        socket.on('sendChat',(message)=>{
            if(!socket.who){//로그인하지 않은 유저라면
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
        let amIHost = false;//자신이 호스트인지 아닌지 확인하기 위한 변수
        let readyState = false;//레디상태: 호스트이면 이미 레디상태로 만들기위해 굳이빼놓았음
        let roomObject;//플레이어가 들어가있는 room의 오브젝트
        socket.who = false;

        if(socket.request.session.passport != null){//로그인 했다면
            socket.who = socket.request.user
        }
        //방들어가는 함수
        socket.on('joinRoom',async (room_id,title,password)=>{
            let roomPassFlag = false;
            if(!socket.who){//로그인 안한 사용자임
                console.log('로그인안함')
                return socket.emit("roomError",{message:"먼저 로그인해주세요."})
            }
            
            roomPassFlag = await Room.findOne({where:{room_id:room_id}})
            .then(async room=>{
                //1.비번검사, 2.호스트검사, 3.방인원검사, 4.현재게임중검사 순서대로 체크한다.

                if(room.ispass){//1.비밀번호가 있으면
                    if(room.password!==password){//비밀번호 비교
                        socket.emit("roomError",{message:"비밀번호가 틀립니다."})
                        return false
                    }
                }

                if(room.is_waiting){//2.호스트를 기다리고있는 방이면
                    if(room.user_id !== socket.who.user_id){
                        socket.emit("roomError",{message:"아직 호스트가 입장하지 않은 방입니다."})
                        return false
                    }else{
                        await Room.update({is_waiting:0},{where:{room_id:room_id}})
                        amIHost = true;
                        readyState = true;
                        roomObject = room;
                        players[room_id] = [];//배열로 초기화
                        return true
                        //입장하는게 호스트이면 is_waiting을 false로 바꾸고 return true한다.
                    }
                }

                if(room.max_people < room.people+1){//3.방이 꽉차면
                    socket.emit("roomError",{message:"방이 가득찼습니다."})
                    return false
                }

                if(room.is_running){//4.현재게임중검사
                    socket.emit("roomError",{message:"현재 게임중인 방입니다."})
                    return false
                }
                roomObject = room;
                return true
            })
            .catch(err=>{
                console.log(err)
                socket.emit("roomError",{message:"에러가 발생했습니다."})
                return false;
            })

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
                    socket.broadcast.to(socket.room).emit('announce',{message:`${socket.who.name}님이 나가셨습니다.`})
                    await Room.increment({people:-1},{where:{room_id:socket.room}});
                }
                socket.leave(socket.room);
                adapterOfMe.delete(socket.room);//자신의 어댑터에서 들어갔던 방을 지운다.
            }
            
            
            if(roomPassFlag){
                socket.room = room_id;
                socket.join(room_id);//방에 입장함
                await Room.increment({people:1},{where:{room_id:room_id}});//roomobject갱신
                roomObject.people = roomObject.people+1;
                players[socket.room] = [...players[socket.room],{[socket.who.user_id]:socket.who.elo}];//배열로 자신의 user_id를 넣음
                console.log('player배열: ')
                console.log(players[socket.room]);
                const roomAdapter = socket.adapter.rooms.get(room_id);
                const Myobject = Object.assign({},passportInfoFilter(socket.who), {"host":amIHost}, {"roomName":title},{"socketId":socket.id}, {"ready":readyState}) // 자신의 정보를 담은 객체이다.
                roomAdapter.add(Myobject)//roomAdapter에 자신의 정보를 추가한다.

                socket.emit("roomJoinedR",{message:`${title} 방에 입장했습니다. `,room:{roomId:socket.room,roomName:title}})//사용자에게 방에 입장했음을 알림
                socket.broadcast.to(socket.room).emit("refreshR");//방에오면 방목록을 새로고침하라고 방에 있는 인원에게 알림

                socket.broadcast.to(socket.room).emit("roomJoinedC",{message:`${socket.who.name}님이 ${title} 방에 입장했습니다. `,fromWhom:'announce',name:'announce',room:{roomId:socket.room,roomName:title}})
                socket.emit("roomJoinedC",{message:`${socket.who.name}님이 ${title} 방에 입장했습니다. `,fromWhom:'announce',name:'announce',room:{roomId:socket.room,roomName:title}})
                //방에 있는 인원들에게 자신이 왔다고 알림; 채팅

                socket.emit("roomInfoG",roomObject);//방정보를 보내준다.

                //아래의 것들은 방에 들어올때 나갈때 해줘야됨
                socket.broadcast.to(socket.room).emit("roomPlayersG",[...roomAdapter]);//자신을 포함한 다른사람의 정보를 보냄.
                socket.emit("roomPlayersG",[...roomAdapter]);//자신을 포함한 다른사람의 정보를 보냄.
                socket.emit("roomMeG", {"me":Myobject});//자신의 정보를 보냄
                //나를 포함한 방에있는 사람들의 정보를 보낸다.

                socket.emit("roomInfoGS",roomObject);//방정보를 보내준다.
                socket.broadcast.to(socket.room).emit("roomInfoGS",roomObject);
                socket.emit("roomMeGS", {"me":Myobject});//자신의 정보를 보냄
                //나를 포함한 방에있는 사람들의 정보를 보낸다.
            }
        })
        
        //방나가는 함수: 호스트가 나갔을때 호스트위임기능이 구현필요
        socket.on('disconnect',async ()=>{

            if(socket.room){//만약 사용자가 어떤 방에 들어가 있다면 먼저 나간다.
                //사용자가 들어갔던 방의 현재 인원을 구한다.
                const curpeople = await Room.findOne({where:{room_id:socket.room}}).then(room=>room.people).catch(err=>(console.log(err)))

                if(curpeople<=1){//나 한명밖에 없다면
                    await Room.destroy({where:{room_id:socket.room}})
                    .catch(err=>{
                        return socket.emit("roomError",{message:"방을 지우는데 문제가 발생하였습니다.",error:err})
                    })
                }
                //나갔는데 사람들이 1명이상 남아있다면
                
                
                //roomAdpater에서 자신의 객체를 찾아서 지움
                //내가 host인데 나가면 다른사람한테 host를 위임함
                const roomAdapter = socket.adapter.rooms.get(socket.room);
                const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
                roomAdapter.delete(Myobject)//방정보에서 자신의 객체를 지움

                if(Myobject.host){//내가 host라면 가장 높은 elo를 가진 사람에게 host를 위임하고 떠난다.
                    let roomAdapterArr = [...roomAdapter];
                    roomAdapterArr.sort(function(a,b){
                        if(typeof(a)==='string'&&typeof(b)==='object'){//스트링,object비교
                            return 1;
                        }else if(typeof(a)==='object'&&typeof(b)==='string'){
                            return -1;
                        }else if(typeof(a)==='object'&&typeof(b)==='object'){
                            return a.elo-b.elo;
                        }
                    })
                    if(typeof(roomAdapterArr[0])==='object'){
                        let highestEloPlayer = roomAdapterArr[0];
                        roomAdapter.delete(highestEloPlayer);
                        highestEloPlayer.host = true;
                        roomAdapter.add(highestEloPlayer);
                    }
                }

                //자기가 들어갔던 방에 나간다는 말을 한다.
                socket.broadcast.to(socket.room).emit("roomLeavedC",{message:`${socket.who.name}님이 나가셨습니다. `,fromWhom:'announce',name:'announce'})
                //자신을 포함한 다른사람의 정보를 보냄.
                socket.broadcast.to(socket.room).emit("roomPlayersG",[...roomAdapter]);
                //GameSettingSection에도 보낸다.
                socket.broadcast.to(socket.room).emit("roomPlayersGS",[...roomAdapter]);
                //방의 인원을 한명 줄인다.
                await Room.increment({people:-1},{where:{room_id:socket.room}});
                //방에서 나간다.
                socket.leave(socket.room);
                let newPlayerArr = players[socket.room].filter(function(data){
                    return Object.keys(data)[0] !== socket.who.user_id;
                });
                console.log('삭제뒤의 newPlayerArr');
                console.log(newPlayerArr);
                players[socket.room] = newPlayerArr;
                //저장해두었던 roomId변수를 없앤다.
                amIHost = false;//나갈때 false값으로 바꿔줘야됌 안그러면 다시 들어갈때 또 방장이 되어버림.
                readyState = false;//나갈때 false값으로 바꿔줘야됌 안그러면 방장이 다시들어가면 레디된상태가 되어버림
                socket.room = undefined;
            }
        })

        //채팅보내기
        socket.on('sendChat',(message)=>{
            //방인원 전부에게 보내고, 나 자신에게도 보냄
            socket.broadcast.to(socket.room).emit('roomMessage',{name:socket.who.name , message:message,fromWhom:'other'});
            socket.emit('roomMessage',{name:socket.who.name , message:message,fromWhom:'me'});
        })

        //아래의 함수들은 socket.adapter를 사용하여 구현, adapter로 해당 room의 정보를 알수 있음.

        //강퇴
        socket.on('Eject',(data)=>{
            let {
                host,
                whoSocket,
                roomId
            } = data;

            if(host){
                socket.to(whoSocket).emit("youAreBanned",{me:whoSocket,room:roomId});
            }
        })
        //방 나가기: 강퇴, 방나가기를 통해 방이 나가진다. 새로고침해서 나가는건 disconnect함수임
        socket.on('leaveRoom',async ()=>{

            if(socket.room){
                const curpeople = await Room.findOne({where:{room_id:socket.room}}).then(room=>room.people)

                if(curpeople<=1){//나 한명밖에 없다면
                    await Room.destroy({where:{room_id:socket.room}})
                    .catch(err=>{
                        return socket.emit("roomError",{message:"방을 지우는데 문제가 발생하였습니다.",error:err})
                    })
                }
                //나갔는데 사람들이 1명이상 남아있다면
                
                //roomAdpater에서 자신의 객체를 찾아서 지움
                //내가 host인데 나가면 다른사람한테 host를 위임함
                const roomAdapter = socket.adapter.rooms.get(socket.room);
                const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
                roomAdapter.delete(Myobject)//방정보에서 자신의 객체를 지움

                if(Myobject.host){//내가 host라면 가장 높은 elo를 가진 사람에게 host를 위임하고 떠난다.
                    let roomAdapterArr = [...roomAdapter];
                    roomAdapterArr.sort(function(a,b){
                        if(typeof(a)==='string'&&typeof(b)==='object'){//스트링,object비교
                            return 1;
                        }else if(typeof(a)==='object'&&typeof(b)==='string'){
                            return -1;
                        }else if(typeof(a)==='object'&&typeof(b)==='object'){
                            return a.elo-b.elo;
                        }
                    })
                    if(typeof(roomAdapterArr[0])==='object'){
                        let highestEloPlayer = roomAdapterArr[0];
                        roomAdapter.delete(highestEloPlayer);
                        highestEloPlayer.host = true;
                        roomAdapter.add(highestEloPlayer);
                    }
                }

                //자기가 들어갔던 방에 나간다는 말을 한다.
                socket.broadcast.to(socket.room).emit("roomLeavedC",{message:`${socket.who.name}님이 나가셨습니다. `,fromWhom:'announce',name:'announce'})
                //자신을 포함한 다른사람의 정보를 보냄.
                socket.broadcast.to(socket.room).emit("roomPlayersG",[...roomAdapter]);
                //방의 인원을 한명 줄인다.
                //GameSettingSection에도 보낸다.
                socket.broadcast.to(socket.room).emit("roomPlayersGS",[...roomAdapter]);
                await Room.increment({people:-1},{where:{room_id:socket.room}});
                //방에서 나간다.
                socket.leave(socket.room);
                let newPlayerArr = players[socket.room].filter(function(data){
                    return Object.keys(data)[0] !== socket.who.user_id;
                });
                console.log('삭제뒤의 newPlayerArr');
                console.log(newPlayerArr);
                players[socket.room] = newPlayerArr;
                //저장해두었던 roomId변수를 없앤다.
                amIHost = false;//나갈때 false값으로 바꿔줘야됌 안그러면 다시 들어갈때 또 방장이 되어버림
                readyState = false;//나갈때 false값으로 바꿔줘야됌 안그러면 방장이 다시들어가면 레디된상태가 되어버림
                socket.room = undefined;
            }
        })
        //준비
        //준비하고 방인원에게 broadcast함
        socket.on('ready',()=>{
            const roomAdapter = socket.adapter.rooms.get(socket.room);
            const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
            //방정보에서 자신의 객체를 지우고 ready를 true로 만든다음에 다시넣는다.
            Myobject.ready = true
            roomAdapter.add(Myobject);
            //자신을 포함한 다른사람의 정보를 보냄.
            socket.broadcast.to(socket.room).emit("roomPlayersG",[...roomAdapter]);
            //자신을 포함한 다른사람의 정보를 보냄.
            socket.emit("roomPlayersG",[...roomAdapter]);
            //자신의 정보를 자신에게 보냄
            socket.emit("roomMeG", {"me":Myobject});//자신의 정보를 보냄
        })

        //준비풀기
        //준비풀고 방인원에게 broadcast함
        socket.on('unready',()=>{
            const roomAdapter = socket.adapter.rooms.get(socket.room);
            const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
            //방정보에서 자신의 객체를 지우고 ready를 true로 만든다음에 다시넣는다.
            Myobject.ready = false
            roomAdapter.add(Myobject);
            //자신을 포함한 다른사람의 정보를 보냄.
            socket.broadcast.to(socket.room).emit("roomPlayersG",[...roomAdapter]);
            //자신을 포함한 다른사람의 정보를 보냄.
            socket.emit("roomPlayersG",[...roomAdapter]);
            //자신의 정보를 자신에게 보냄
            socket.emit("roomMeG", {"me":Myobject});//자신의 정보를 보냄
        })
        
        //게임시작:게임시작 요청이 오면 방의 인원 모두에게 문제정보를 broadcast한다. (방인원의 준비상태 체크必)
        //여기서 문제 시간 타이머를 작동시킨다.
        //티어에따라 적절한 문제를 보내는것이 중요(하...그냥 랜덤으로 할까?)
        socket.on('startGame',async ()=>{
            const roomAdapter = socket.adapter.rooms.get(socket.room);
            const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
            const roomAdapterArr = [...roomAdapter];
            let readyFlag = true;
            let players=0;
            if(Myobject.host){//호스트인지 확인한다.
                for(let i=0;i<roomAdapterArr.length;i++){
                    if(typeof(roomAdapterArr[i])==='object'){//준비안한 플레이어 있는지 확인
                        players++;
                        if(roomAdapterArr[i].ready===false){
                            readyFlag = false;
                            break;
                        }
                    }
                }
                if(players<=1){
                    return socket.emit('startGameErr',{message:'게임인원은 적어도 두명이여야 합니다.'})
                }if(!readyFlag){
                    return socket.emit('startGameErr',{message:'아직 모든인원이 준비하지 않았습니다.'})
                }
                if(readyFlag && players>1 ){//모두 준비가 되어있어야하고 인원이 적어도 1명보다는 많아야함.
                    await Room.update({is_running:true},{where:{room_id:socket.room}});
                    let problems = await Problem.findAll({attributes:['problem_id'],order:['problem_id',db.Sequelize.fn('RAND')]} )
                    let problemLength = problems.length;
                    let randomProblemNumber = Math.floor(Math.random() * problemLength);
                    socket.broadcast.to(socket.room).emit('gameStarting',{problem_id:problems[randomProblemNumber]})
                    socket.emit('gameStarting',{problem_id:problems[randomProblemNumber]})
                    socket.broadcast.to(socket.room).emit('gameStartingGS')
                    socket.emit('gameStartingGS')
                    Timer[socket.room] = setTimeout(GameTimeOut,1000*60*20,socket);//게임 타이머
                    TimerFlag[socket.room] = true;//타이머 켜짐
                    roomRoundStatus[socket.room] = 1;//라운드 진행
                    winnerArr[socket.room] = {'1':null, '2':null, '3':null,'4':null,'5':null,'6':null,'7':null,'8':null}//승자 초기화
                    elo[socket.room] = {'1':null, '2':null, '3':null,'4':null,'5':null,'6':null,'7':null,'8':null}//elo 초기화
                }
            }
        })

        //코드 보내기:여기서 누군가 코드를 보냈음을 방 인원전부에게 알린다.(채점중)
        //그리고 플레이어들이 보낸코드를 돌리고, 결과를 방의 인원에 broadcast.
        socket.on('sendCode',(data)=>{
            console.log("데이터"+JSON.stringify(data))
            function getByte(str) {
                return str
                  .split('') 
                  .map(s => s.charCodeAt(0))
                  .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
            }

            function callback({correct:executeResult, log:executeLog, message:message, problem_id:problemId}){
                //누군가 맞으면 정답자 처리를 하고, 정답을 맞췄다는것을 알린다.
                console.log("게임타이머: "+TimerFlag[socket.room])
                if(executeResult && TimerFlag[socket.room]){
                    if(!winnerArr[socket.room][roomRoundStatus[socket.room]]){//이번 라운드에 정답을 처음 제출했으면
                        socket.broadcast.to(socket.room).emit("roomMessage",{message:`${socket.who.name}님 정답!! 1등!`,fromWhom:'announce',name:'announce'})
                        socket.emit("roomMessage",{message:`${socket.who.name}님 정답!! 1등!`,fromWhom:'announce',name:'announce'});
                        socket.emit("WrongAnswer",{message:'정답!',log:''});//원래는 정답이 틀렸을때만 쓸려고 했는데 맞을때도 모달을 띄우는게 맞다고 생각
                        winnerArr[socket.room][roomRoundStatus[socket.room]] = [{'1':socket.who.user_id}]

                        console.log(`내가 들어와있는 방의 승자한계: ${winnerLimit[players[socket.room].length]}`);

                        if(winnerLimit[players[socket.room].length]>1){//두명이상 정답자를 허용하는 방이라면
                            clearTimeout(Timer[socket.room]);
                            Timer[socket.room] = setTimeout(GameTimeOut,1000*60,socket);//게임 타이머
                            TimerFlag[socket.room] = true;//타이머 작동중 표시
                            socket.broadcast.to(socket.room).emit("roomMessage",{message:`남은시간 1분`,fromWhom:'announce',name:'announce'})
                            socket.emit("roomMessage",{message:`남은시간 1분`,fromWhom:'announce',name:'announce'});
                        }else{//정답자는 한명만 받는 방이라면
                            socket.broadcast.to(socket.room).emit("allPass");
                            socket.emit('allPass')
                            clearTimeout(Timer[socket.room]);//타이머끄고
                            TimerFlag[socket.room] = false;//타이머 작동안함으로 표시한다.
                        }

                        
                    }else{
                        console.log('누군가 맞힌뒤에 정답')
                        let playerRank = winnerArr[socket.room][roomRoundStatus[socket.room]].length + 1;//자신의 순위
                        socket.broadcast.to(socket.room).emit("roomMessage",{message:`${socket.who.name}님 정답!!`,fromWhom:'announce',name:'announce'})
                        socket.emit("roomMessage",{message:`${socket.who.name}님 정답!!`,fromWhom:'announce',name:'announce'});
                        socket.emit("WrongAnswer",{message:'정답!',log:''});//원래는 정답이 틀렸을때만 쓸려고 했는데 맞을때도 모달을 띄우는게 맞다고 생각
                        winnerArr[socket.room][roomRoundStatus[socket.room]] = [...winnerArr[socket.room][roomRoundStatus[socket.room]],{[playerRank]:socket.who.user_id}]          //.winner = Object.assign(winnerArr[socket.room][roomRoundStatus[socket.room]].winner,{[playerRank]:socket.who.user_id});

                        if(winnerLimit[players[socket.room].length] <= playerRank){//만약 승자 한계까지 정답을 맞추면 
                            socket.broadcast.to(socket.room).emit("allPass");
                            socket.emit('allPass')
                            clearTimeout(Timer[socket.room]);
                            TimerFlag[socket.room] = false;
                        }

                    }
                }else{//틀리면 틀린 이유를 보내줌
                    if(TimerFlag[socket.room]){
                        socket.emit("WrongAnswer",{message:message,log:executeLog});
                    }else{
                        socket.emit("WrongAnswer",{message:'타임아웃',log:''});
                    }
                }
            }

            socket.broadcast.to(socket.room).emit("roomMessage",{message:`${socket.who.name}님이 코드제출! ${getByte(data.code.toString())}byte!`,fromWhom:'announce',name:'announce'})
            socket.emit("roomMessage",{message:`${socket.who.name}님이 코드제출! ${getByte(data.code.toString())}byte!`,fromWhom:'announce',name:'announce'});

            //컴파일하는 코드
            executeCode(socket.who.user_id,data.languageParam,'../problem',data.code,data.problem_idParam,4,false,callback,null)//language랑 problem_id를 받아오면됨
        })

        //라운드끝:누군가의 코드가 정답일시 방의 호스트가 게임이 끝났음을 서버에 알린다.
        //이때 elo레이팅의 계산을 하고, 각각의 플레이어들에게 채팅(또는팝업)으로 elo계산결과를 알린다.
        //마지막 라운드라면 다시 방에들어갔을때의 초기상태로 돌린다.(방인원 준비를 모두풂)
        //
        socket.on('roundEnded',async (problemId)=>{
            const roomAdapter = socket.adapter.rooms.get(socket.room);
            const Myobject = getObjectbyValueInArray([...roomAdapter],socket.id);
            if(Myobject.host){//호스트인지 확인한다. 호스트만 이 작업을 실시한다.
                let resultElo = eloRating(winnerArr[socket.room][roomRoundStatus[socket.room]],players[socket.room])
                elo[socket.room][roomRoundStatus[socket.room]] = resultElo

                if(roomRoundStatus[socket.room] >= roomObject.rounds){//게임이 다 끝났을때(여기서 계산된 elo를 반영하고, 플레이어들의 준비를 푼뒤에, gameEnded를 보내고, 플레이어 객체배열을 보내준다.)
                    socket.broadcast.to(socket.room).emit("WrongAnswer",{message:'게임이 끝났습니다 수고하셨습니다. 메인페이지로 가셔서 elo를 확인해보실수 있습니다.',log:''});
                    socket.emit("WrongAnswer",{message:'게임이 끝났습니다 수고하셨습니다. 메인페이지로 가셔서 elo를 확인해보실수 있습니다.',log:''});
                    for(let i=1;i<=[roomRoundStatus[socket.room]];i++){//라운드 수만큼

                        for(let j=0;j<elo[socket.room][i].length;j++){//사람수만큼
                            await User.update({elo:Sequelize.literal(`elo + ${Object.values(elo[socket.room][i][j])[0]}`)},{where:{user_id:Object.keys(elo[socket.room][i][j])[0] }});
                        }
                        for(let j=0;j<elo[socket.room][i].length;j++){//사람수만큼
                            await User.update({point:Sequelize.literal(`point + 1000`)},{where:{user_id:Object.keys(players[socket.room][0]) }});
                        }

                    }
                    socket.broadcast.to(socket.room).emit("gameEnded");
                    socket.emit("gameEnded");
                    await Room.update({is_running:false},{where:{room_id:socket.room}});
                    
                }else{//게임이 아직다 안끝났을때(여기서 각 라운드의 elo 계산을 해주고, 푼 플레이어들에게 포인트 지급, 새로운 문제를 보내준다.)
                    socket.broadcast.to(socket.room).emit("roomMessage",{message:`라운드가 끝났습니다, 5초 뒤 다음라운드가 시작됩니다..`,fromWhom:'announce',name:'announce'})
                    socket.emit("roomMessage",{message:`라운드가 끝났습니다, 5초 뒤 다음라운드가 시작됩니다..`,fromWhom:'announce',name:'announce'});
                    
                    let problems = await Problem.findAll({attributes:['problem_id'],order:['problem_id',db.Sequelize.fn('RAND')]} )
                    let generatedRandomProblemNumber = getRandomProblemExceptThat(problems,problemId);
                    setTimeout(()=>{
                    socket.broadcast.to(socket.room).emit('gameStarting',{problem_id:problems[generatedRandomProblemNumber]})
                    socket.emit('gameStarting',{problem_id:problems[generatedRandomProblemNumber]})
                    socket.broadcast.to(socket.room).emit('gameStartingGS')
                    socket.emit('gameStartingGS')
                    Timer[socket.room] = setTimeout(GameTimeOut,1000*60*20,socket);//게임 타이머
                    TimerFlag[socket.room] = true;//타이머 켜짐
                    roomRoundStatus[socket.room] = roomRoundStatus[socket.room]+1;//라운드 진행
                    },5000)
                }
            }
        })

    })
}