#include <iostream>
#include "inout.hpp"
#include "compiler.hpp"

namespace Grading{
    class Grading{
        public:
            Grading(ProblemAnswerIterator pa, CppCompiler gcc)
                :pa_(pa), gcc_(gcc){};

            uint grade_code(const char* problemID, uint length){
                
                //테스트용 정보
                const char* test_problem = "1000";
                uint test_length = 4;
                const char* test_lang = "cpp";

                const char* test_uuid = "12345678-1234-1234-012345678912";
                const char* test_codeid = "0123456789";


                //유저 코드 링크 빌드
                std::string filepath = "../usercode/";
                filepath += test_uuid;
                filepath += "/";
                filepath += test_codeid;

                //유저코드 빌드
                auto excutor = gcc_ << filepath;

                pa_.set_problem(test_problem, test_length);

                for(auto& path: pa_){
                    std::string problemPath = path.first;
                    std::string answerPath = path.second;

                    //유저코드 실행
                    excutor << problemPath;
                }

                pa_.release_problem();

                return 1;
            }


        private:
            ProblemAnswerIterator pa_;
            CppCompiler gcc_;
    };
}

int main(){

    Grading::Grading gr(
        Grading::ProblemAnswerIterator("../problem/%s/in/%d.in", "../problem/%s/out/%d.out"),
        Grading::CppCompiler("-O2 -Wall -lm -static -std=gnu++17")
    );
    

    //usercode/<uuid>/<id>.<ext>

    //code file path example
    //usercode/12345678-1234-1234-012345678912/0123456789.cpp

    //out file path example
    //usercode/12345678-1234-1234-012345678912/0123456789.out

    //result file path example
    //usercode/12345678-1234-1234-012345678912/0123456789.result

    //log file path example
    //usercode/12345678-1234-1234-012345678912/0123456789.log


    //
    
    //유저 이름 받고 코드 경로받고
    gr.grade_code("1000", 4);

    
    return 0;
}