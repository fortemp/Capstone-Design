const fs = require('fs');
const path = require('path');
const {spawn, spawnSync} = require('child_process');

const RandomStringGenerator = (num) => {
    const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str= ' ';
    const charactersLength = chars.length;
    for ( let i = 0; i < num; i++ ) {
        str += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return str;
}

exports.MakeInputOutput = function(problemId, inputArr, outputArr){
    const dirPath = path.join(__dirname,`../../grading/problem/${problemId}`);
    try{
        let isExits = fs.existsSync(dirPath)
        if(isExits){
            if(problemId!==9999)
                throw new Error('이미 문제가 존재함')
        }else{
            fs.mkdirSync(dirPath)
            fs.mkdirSync(`${dirPath}/in`)
            fs.mkdirSync(`${dirPath}/result`)
        }

        for(let i=1;i<=4;i++)
            fs.writeFileSync(`${dirPath}/in/${i}.in`,inputArr[i-1]);
        for(let i=1;i<=4;i++)
            fs.writeFileSync(`${dirPath}/result/${i}.result`,outputArr[i-1].trim());
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.executeCode = function(user_id,language,problemSetPath,CodeString,problemId,testLength){

    var executeResult;//실행결과: 맞으면 1 그 이외는 0
    var executeLog;//실행결과에대한 로그, 맞음과 틀림에 상관없이 리턴한다.
    var message=''
    function on_child_stdout(data) {//한줄한줄 분리해주는 함수
        let correctNum = 0;
        var str = data.toString();
        let lines = str.split(/\n/g);
        for (var i in lines) {
            if (lines[i]) {
                console.log(lines[i]);
                if(lines[i]==='std::exception'){
                    executeResult = false;
                    message = '오류';
                    return;
                }
                if(lines[i]==='0'){//틀리거나 오류이면 false
                    executeResult = false;
                    return;
                }
                if(lines[i]==='correct')
                    correctNum++;
            }
            if(correctNum===testLength){//테스트케이스개수와 맞은개수가 일치하면 true
                executeResult = true;
                return;
            }
        }
        executeResult = false;//여기까지 왔다는건 그냥 답이 틀린거임
        message = "테스트케이스 불통과"
    };

    const dirPath = path.join(__dirname,`../../grading/usercode/${user_id}`);
    const binFilePath = path.join(dirPath,'../../src');
    let isExits = fs.existsSync(dirPath);
    let codeId_random = RandomStringGenerator(10);
    codeId_random = codeId_random.trim();
    if(!isExits)//없으면 만듬
        fs.mkdirSync(dirPath);
    try{
        fs.writeFileSync(`${dirPath}/${codeId_random}.${language}`,CodeString);
        
        const gpp = spawnSync('./a.out', [
            '--user',user_id,
            '--code-id',codeId_random,
            '--problem-path',problemSetPath,
            '--problem-id',problemId,
            '--length',testLength,
            '--language',language]
            ,{cwd:binFilePath});
        executeLog = fs.readFileSync(`${dirPath}/${codeId_random}.log`,'utf-8')
        on_child_stdout(gpp.stdout.toString())
        
        return {correct:executeResult, log:executeLog.toString(),message:message}
    }catch(err){
        console.log(err);
    }
}