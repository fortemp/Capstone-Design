#pragma once
#include "util.hpp"
#include <unistd.h>

namespace Grading{
    enum class ErrorType{
        None,
        NoFileError,
        CompileError,
        RuntimeError
    }

    class Executer{
        protected:
            std::string output_;   //실행파일 경로
            std::string result_;   //결과파일 경로
            std::string log_;      //로그 파일 경로

        public:
            Executer(const std::string& output, const std::string& result, const std::string& log)
            :output_(output), result_(result), log_(log){};

            std::pair<ErrorType, std::string> execute(std::string path, std::string file_name){
                /*
                *   실제로 실행하고 출력값이 위치한 경로를 리턴한다.
                *   Args:
                *       path:       data 값이 있는 곳 
                *       file_name:  data 값의 이름 (확장자 제외)
                *   Returns:
                *       std::pair<ErrorType, std::string>
                *       ErrorPath   : ErrorType과 path를 동시에 전달
                *       std::string : 실행이 완료되면 결과값이 있는 파일의 경로를 전송, 실행중 오류가 날 경우 로그의 경로
                */

                const std::string data = build_path(path, file_name + ".in");

                //무한 루프 감지

                int reuslt = execute("./%s < %s > %s 2> %s", 
                                      output_.c_str(), data.c_str(), result_.c_str(), log_.c_str());

                //런타임 오류가 난 경우
                if(result){
                    return std::make_pair(ErrorType::RuntimeError, log_);
                }

				return std::make_pair(ErrorType::None, result_);
            }
    };

    class Compiler{
        protected:
            std::string option_;              //컴파일 옵션
            std::string code_extension_;      //코드 확장자 ex) cpp, py
            std::string output_extension_;    //실행 파일 확장자 ex) out

        public:
            Compiler(const std::string& option, const std::string& code_extension, const std::string& output_extension)
            :option_(option), code_extension_(code_extension), output_extension_(output_extension){};

            virtual std::unique_ptr<Executer> compile(std::string path, std::string file_name) = 0;
            virtual ~Compiler(){};
    };

    class CppCompiler: public Compiler{
        public:
            CppCompiler(const std::string& option)
            :Compiler(option, "cpp", "out"){};

            virtual std::pair<ErrorType, std::unique_ptr<Executer>> compile(std::string path, std::string file_name) noexcept {
                /*
                *   compile 해서 실행 파일을 가지고 있는 Executer를 리턴한다.
                *   Args:
                *       path:       파일이 위치한 경로
                *       file_name:  파일의 이름 (확장자 제외)
                *   Returns:
                *       std::pair<ErrorType, std::unique_ptr<Executer>>
                *       ErrorType: 에러 타입
                *       Executer or nullptr: 파일이 없거나 컴파일 오류가 난경우 nullptr을 반환 
                */
                const std::string code    = build_path(path, file_name + "." + code_extension_); 
                const std::string output  = build_path(path, file_name + "." + output_extension_);
                const std::string result  = build_path(path, file_naem + ".result");                  //결과 파일 위치
                const std::string log     = build_path(path, file_name + ".log");                     //컴파일, 런타임 오류 로거

                //파일이 없는 경우
                if(access(code.c_str(), F_OK)){
                    return std::make_pair(ErrorType::NoFileError, nullptr);
                }

                int result = execute("g++ %s -o %s %s 2> %s", 
                        code.c_str(), output.c_str(), option_.c_str(), log.c_str()); 

                //컴파일 오류가 난 경우
                if(result){             
                    return std::make_pair(ErrorType::CompileError, nullptr);
                }

                return std::make_pair(ErrorType::None, std::make_unique<Executer>(output, result, log));
            }

            virtual ~CppCompiler(){};
    };
}