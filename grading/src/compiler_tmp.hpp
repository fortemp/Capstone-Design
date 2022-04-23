#pragma once
#include "util.hpp"
#include "exception.hpp"
#include <unistd.h>
#include <memory>
#include <thread>
#include <chrono>
#include <fcntl.h>

namespace Grading{
    class Executer{
        protected:
            std::string target_path_;           //실행 대상 경로

        public:
            Executer(const std::string& target_path)
                     :target_path_(target_path){};

            template<typename T>
            int run(const std::string& data_path, const std::string& result_path, const std::string& log_path, T time_limit){
                /*
                *   target_path를 실행하고 그 결과를 result_path와 log_path에 기록한다.
                *   args:
                *       data_path:   실행을 위한 
                *       result_path: 실행 결과가 기록될 파일의 경로
                *       log_path:    실행 도중 생기는 warning이나 error를 기록할 로그의 경로
                *       time_limit:  시간 제한
                *   return:
                *       정상 실행이 종료된 경우 0을 반환한다.
                *   
                *   except:
                *       RuntimeExecption: 실행 도중 오류가 난 경우 반환
                */
                int pid = fork();
                int input_file_descriptor = open(data_path.c_str(), O_RDONLY);
                int output_file_descriptor = open(result_path.c_str(), O_WRONLY);
                int log_file_descriptor = open(log_path.c_str(), O_WRONLY);

                if(pid < 0){
                    //fork가 정상적으로 시행이 안되었을 때
                }
                else if(pid == 0){
                    //자식 프로세스 내부
                    
                    //입력 파이프라인
                    dup2(input_file_descriptor, STDIN_FILENO);
                    dup2(output_file_descriptor, STDOUT_FILENO); //STDOUT이 잘 해결되지 않고 있음
                    dup2(log_file_descriptor, STDERR_FILENO);

                    //파일 실행
                    execl(target_path_.c_str(), target_path_.c_str(), NULL);
                }
                else{
                    //부모 프로세스 내부

                    //시간 제한 내로 태스크를 해결하지 못하면 강제 종료
                    std::this_thread::sleep_for(time_limit);
                    execute("kill -9 %d", pid);
                    //강제 종료인지, 자식 프로세스가 잘 해결되어서 리턴된 것인지 구분할 필요가 있을 듯

                }
                close(input_file_descriptor);
                close(output_file_descriptor);
                close(log_file_descriptor);
            }

            return 0;
    }

    class Compiler{
        protected:
            std::string format_;                 //컴파일 명령어
            std::string option_;                 //컴파일러 옵션

            std::string target_path_;            //컴파일 대상 경로
            std::string result_path_;            //컴파일 결과물 경로
            std::string log_path_;               //컴파일 로그 파일 경로

        public:
            Compiler(const std::string& format,
                     const std::string& option, 
                     const std::string& target_path,
                     const std::string& result_path,
                     const std::string& log_path)
                     : format_(format),
                       option_(option),
                       target_path_(target_path),
                       result_path_(result_path),
                       log_path_(log_path){}

            virtual std::unique_ptr<Executor> compile() = 0;
            virtual ~Compiler(){};
    }

    class CppCompiler{
        public:
            CppCompiler(const std::string& option, 
                        const std::string& target_path,
                        const std::string& result_path,
                        const std::string& log_path)
                        : Compiler("g++ %s -o %s %s 2> %s",
                            option, target_path, result_path, log_path){};

            virtual std::unique_ptr<Executer> compile() const override{
                /*
                *   compile을 실행하고 무사히 실행한 경우 Executer의 unique_ptr을 반환한다.
                *   
                *   return:
                *       unique_ptr<Executer> 실행할 수 있는 파일의 경로를 가지고 있는 Executer 포인터
                *
                *   except:
                *       NoFileException: 컴파일 할 수 있는 파일을 확인하지 못했을 경우 
                *       CompileException: 컴파일 도중 out파일이 제대로 생성되지 못한 경우 반환
                */

                // 파일이 존재하지 않는 경우 예외 발생
                if(access(target_path_.c_str(), F_OK)) throw NoFileException();

                int result = execute(format_, 
                target_path_.c_str(), result_path_.c_str(), option_.c_str(), log_path_.c_str());

                // 정상적으로 컴파일 되지 않은 경우
                if(result != 0) throw CompileException();

                return std::make_unique<Executer>();
            }
            
            virtual ~CppCompiler(){};
    }
}