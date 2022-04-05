#include <iostream>
#include <fstream>
#include <algorithm>
#include "inout.hpp"
#include "compiler.hpp"

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

namespace Grading{
    class Grading{
        public:
            Grading(std::string problem, uint length, std::string lang,
                    std::string UUID, std::string codeID,
                    ProblemAnswerIterator pa, CppCompiler gcc)
                :targetProblem_(problem), targetLength_(length), targetLang_(lang),
                 targetUUID_(UUID), targetCodeID_(codeID), pa_(pa), gcc_(gcc){
                    targetGrade_ = 0;
                    is_finish_ = false;
                 }; 

            uint gradeCode(){
                //유저코드 소스
                std::string filepath = string_format("../usercode/%s/%s", targetUUID_.c_str(), targetCodeID_.c_str());

                //유저코드 로그

                //유저코드 결과
                std::string resultPath = string_format("../usercode/%s/%s.result", targetUUID_.c_str(), targetCodeID_.c_str());

                //유저코드 빌드
                auto excutor = gcc_ << filepath;

                pa_.set_problem(targetProblem_, targetLength_);

                for(auto& path: pa_){
                    int is_correct = 1;

                    std::string problemPath = path.first;
                    std::string answerPath = path.second;

                    //유저코드 실행
                    excutor << problemPath;

                    //런타임 에러 핸들 필요

                    //런타임 에러가 없을때

                    std::fstream answerFile{answerPath}; std::fstream resultFile{resultPath};
                    std::string answerString; std::string resultString;

                    std::vector<std::string> answers; std::vector<std::string> results;

                    while(std::getline(answerFile, answerString)){
                        answers.push_back(answerString);
                    }

                    while(std::getline(resultFile, resultString)){
                        results.push_back(resultString);
                    }

                    //만약 answers와 results의 길이가 다를 경우
                    if(answers.size() != results.size()) is_correct = 0;

                    //all[(answers[i] == results[i])]
                    for(uint i = 0; i < std::min(answers.size(), results.size()); i ++){
                        is_correct |= (answers[i] == results[i]);   
                    }

                    targetGrade_ += is_correct;

                    answerFile.close(); 
                    resultFile.close();
                }
                pa_.release_problem();

                is_finish_ = true;

                return 0;
            }

            std::string getResult(){
                if(is_finish_ == false) return std::string("");
                return string_format(
                    "problem number: %s\ntarget UUID: %s\ntarget code: %s\ntarget lang: %s\ntotal problem: %d\nanswer problem: %d\n", 
                     targetProblem_.c_str(), 
                     targetUUID_.c_str(), 
                     targetCodeID_.c_str(),
                     targetLang_.c_str(),
                     targetLength_,
                     targetGrade_
                );
            }


        private:
            std::string targetProblem_;     //채점 대상 문제
            uint targetLength_;             //채점할 문제 개수
            uint targetGrade_;              //맞은 갯수
            std::string targetLang_;        //타켓 언어
            std::string targetUUID_;        //채점하는 유저아이디
            std::string targetCodeID_;      //채점할 유저코드 아이디

            bool is_finish_;                //채점끝났는지

            ProblemAnswerIterator pa_;      //(문제, 정답) 경로 이터레이터
            CppCompiler gcc_;               //컴파일러  추상화 할 것
    };
}

int main(int argc, const char* argv[]){
    //테스트 정보
    std::string testProblem = "1000";
    uint testLength = 4;
    std::string testLang = "cpp";
    std::string testUUID = "12345678-1234-1234-012345678912";
    std::string testCodeID = "0123456789";


    Grading::ProblemAnswerIterator pa{"../problem/%s/in/%d.in", "../problem/%s/result/%d.result"};
    Grading::CppCompiler gcc{ "-O2 -Wall -lm -static -std=gnu++17" };


    Grading::Grading gr(
        testProblem, testLength, testLang, 
        testUUID, testCodeID, pa, gcc
    );

    //유저 이름 받고 코드 경로받고
    gr.gradeCode();
    std::cout << gr.getResult();
    
    return 0;
}