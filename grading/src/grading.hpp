#pragma once
#include <iostream>
#include <fstream>
#include <algorithm>
#include "inout.hpp"
#include "compiler.hpp"

namespace Grading{
    using PathPair = std::pair<const std::string, const std::string>;

    class Problem{
        public:
            Problem(std::string problem_path, std::string problem_id, uint length)
            :problem_path_(problem_path), problem_id_(problem_id), length_(length){};

            PathPair get_problem(uint t){
                std::string problem_ext = ".in";
                std::string result_ext = ".result";

                return std::make_pair( Grading::build_path(problem_path_, problem_id_, "in", std::to_string(t) + problem_ext),
                                       Grading::build_path(problem_path_, problem_id_, "result", std::to_string(t) + result_ext));
            }

            uint get_length(){
                return length_;
            }

        private:
            const std::string problem_path_;        //문제가 위치한 경로 (파일 제외)
            const std::string problem_id_;          //문제 아이디
            const uint length_;                     //테스트케이스 개수
    };

    class Grading{
        public:
            Grading(Problem problem, std::string UUID, std::string code_id)
            :problem_(problem), UUID_(UUID), code_id_(code_id){
                compiler_ = nullptr;
            }

            void set_compiler(const std::string& language){
                
                if(language == "cpp"){
                    compiler_ = new CppCompiler{
                            "-O2 -Wall -lm -static -std=gnu++17",
                            build_path("..", "usercode", UUID_, code_id_ + "." + language),
                            build_path("..", "usercode", UUID_, code_id_ + ".out"),
                            build_path("..", "usercode", UUID_, code_id_ + ".log")
                    };
                }
            }

            uint grade_code(){
                if(compiler_ == nullptr) return -1;

                int correct = 0;

                try{
                    auto executer = compiler_->compile();

                    for(uint idx = 1; idx <= problem_.get_length(); idx ++){
                        //paths.first   = 문제 파일 경로 
                        //paths.second = 답안 파일 경로
                        auto paths = problem_.get_problem(idx);

                        std::string result_path = build_path("..", "usercode", UUID_, std::to_string(idx) + ".result");
                        std::string log_path = build_path("..", "usercode", UUID_, code_id_ + ".log");

                        int result = executer->run(
                            paths.first,
                            result_path, 
                            log_path,
                            std::chrono::seconds(1)
                        );

                        std::this_thread::sleep_for(std::chrono::seconds(2));

                        //실제 채점이 이뤄질 부분
                        try{
                            int check = execute("cmp -s %s %s", result_path.c_str(), paths.second.c_str());
                            std::cout << "correct\n";
                             correct ++;
                        }
                        catch(std::exception e){};
                    }
                    

                }
                catch(std::exception e){
                    std::cout << e.what() << std::endl;
                }

               // execute("rm %s", build_path("..", "testcode", UUID_, "*.result").c_str());
                return  correct;
            }

        private:
            Problem problem_;  //채점할 문제의 객체

            std::string UUID_;          //유저의 UID
            std::string code_id_;       //유저가 제출한 코드 id

            Compiler* compiler_;  //컴파일러
    };
}
