
//파라미터: 플레이어의 uuid배열, 
//이긴플레이어의 uuid:elo배열,
//모든플레이어의 uuid:elo배열
//반환값: 각 플레이어의 {플레이어uuid:resultElo} 배열
//playerWonId: {1:id}
//playerID: {ID:elo}
/*exports.elo = function(playerWonId,playerID){*/
const Elorating = require('elo-rating')

exports.eloRating  = function(winplayer,playerObjs){
    
    winplayer = winplayer.sort(function(a,b){ //순서가 1,2,3,순위로 안들어갔을수도 있으니까 정렬함
        if(Object.keys(a)[0] > Object.keys(b)[0])
            return 1;
        if(Object.keys(b)[0] > Object.keys(a)[0])
            return -1;
    })

    function getEloById(userId){
        for(let i=0;i<playerObjs.length;i++){
            if(Object.keys(playerObjs[i])[0] === userId)
                return Object.values(playerObjs[i])[0]
        }
    }
    

    let defeatPlayer = [];
    let result = [];
    //1번 2번 4번플레이어가 이겼고 나머지는 졌음
    let winnerAvg = 0;
    let defeatAvg = 0;

    for(let i=0;i<playerObjs.length; i++){
        let won = false;
        for(let j=0;j<winplayer.length;j++){
            if( Object.keys(playerObjs[i])[0] === Object.values(winplayer[j])[0] )
            {
                winnerAvg += Object.values(playerObjs[i])[0]
                won = true;
                break;
            }
        }
        if(!won){//해당플레이어가 winner배열에 포함되어있지 않다면 진거임.
            defeatAvg+=Object.values(playerObjs[i])[0];
            defeatPlayer.push(playerObjs[i])
        }
    }
    //평균계산
    winnerAvg = winnerAvg/winplayer.length;
    defeatAvg = defeatAvg/(playerObjs.length-winplayer.length)

    //이긴사람들 계산
    for(let i=0,j=1; i<winplayer.length; i++,j = j*0.6){
        let NewRating = Elorating.calculate(getEloById(Object.values(winplayer[i])[0]),defeatAvg,true).playerRating;
        let difference =   parseFloat(NewRating) - parseFloat(getEloById(Object.values(winplayer[i])[0]))
        let adjustedDifference = Math.floor(difference*j)
        result.push({[Object.values(winplayer[i])[0]]:adjustedDifference})
    }
    //진사람들 계산
    for(let i=0; i<defeatPlayer.length; i++){
        let NewRating = Elorating.calculate(Object.values(defeatPlayer[i])[0],winnerAvg,false).playerRating;
        let difference =   parseFloat(NewRating) - parseFloat(Object.values(defeatPlayer[i])[0])
        result.push({[Object.keys(defeatPlayer[i])[0]]:difference})
    }
    
    return result;
}