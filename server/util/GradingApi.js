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
            fs.writeFileSync(`${dirPath}/result/${i}.result`,outputArr[i-1]);
        return problemId
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.executeCode = function(user_id,language,problemSetPath,CodeString,problemId,testLength,test,callback,res){

    var executeResult;//실행결과: 맞으면 1 그 이외는 0
    var executeLog;//실행결과에대한 로그, 맞음과 틀림에 상관없이 리턴한다.
    var message=''
    const dirPath = path.join(__dirname,`../../grading/usercode/${user_id}`);
    const binFilePath = path.join(dirPath,'../../src');

    function on_child_stdout(data) {//한줄한줄 분리해주는 함수
        let correctNum = 0;
        var str = data.toString();
        let lines = str.split(/\n/g);
        for (var i in lines) {
            if (lines[i]) {
                console.log(lines[i]);
                if(lines[i]==='std::exception' || lines[i]==='0'){
                    executeResult = false;
                    message = '오류';
                    return false;
                }
                if(lines[i]==='incorrect'){//틀림
                    executeResult = false;
                    message = '오답';
                    return false;
                }
                if(lines[i]==='correct')
                    correctNum++;
            }
            if(correctNum===testLength){//테스트케이스개수와 맞은개수가 일치하면 true
                executeResult = true;
                return true;
            }
        }
    };


    fs.exists(dirPath,(exResult)=>{
        let codeId_random = RandomStringGenerator(10);
        codeId_random = codeId_random.trim();
        if(!exResult){//없으면 만듬
            fs.mkdir(dirPath,(e)=>{
                fs.writeFile(`${dirPath}/${codeId_random}.${language}`,CodeString,(err)=>{
                    const gpp = spawn('./a.out', [
                        '--user',user_id,
                        '--code-id',codeId_random,
                        '--problem-path',problemSetPath,
                        '--problem-id',problemId,
                        '--length',testLength,
                        '--language',language]
                        ,{cwd:binFilePath});

                     gpp.stdout.on('data', (data) => {
                        fs.readFile(`${dirPath}/${codeId_random}.log`,'utf-8',(err,datal)=>{
                            executeResult =  on_child_stdout(data.toString())
                            executeLog = datal
                            if(!executeResult){//테스트이면서 틀렸으면 그냥 문제 삭제해버리고 다시함
                                if(test){
                                    fs.rmSync(path.join(__dirname,`../../grading/problem/${problemId}`),{recursive:true, force:true})
                                }
                                callback({correct:executeResult, log:executeLog.toString(),message:message,problem_id:problemId,test:test,res:res})
                            }else{
                                callback({correct:executeResult, log:executeLog.toString(),message:message,problem_id:problemId,res:res})
                            }
                            
                        })
                    });
                        
                    gpp.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                    });
                    
                    gpp.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                    });

                    
                });
                
            });
            
        }else{//있으면 그냥 코드씀
            fs.writeFile(`${dirPath}/${codeId_random}.${language}`,CodeString,(err)=>{
                console.log('코드씀')
                const gpp = spawn('./a.out', [
                    '--user',user_id,
                    '--code-id',codeId_random,
                    '--problem-path',problemSetPath,
                    '--problem-id',problemId,
                    '--length',testLength,
                    '--language',language]
                    ,{cwd:binFilePath});

                gpp.stdout.on('data', (data) => {
                    executeResult =  on_child_stdout(data.toString())
                    fs.readFile(`${dirPath}/${codeId_random}.log`,'utf-8',(err,datal)=>{
                        executeResult =  on_child_stdout(data.toString())
                        executeLog = datal
                        if(!executeResult){//테스트이면서 틀렸으면 그냥 문제 삭제해버리고 다시함
                            if(test){
                                fs.rmSync(path.join(__dirname,`../../grading/problem/${problemId}`),{recursive:true, force:true})   
                            }
                            callback({correct:executeResult, log:executeLog.toString(),message:message,problem_id:problemId,test:test,res:res})
                        }else{
                            callback({correct:executeResult, log:executeLog.toString(),message:message,problem_id:problemId,res:res})
                        }
                    })
                });
                    
                gpp.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
                });
                
                gpp.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                });

            });
        }
    });
}