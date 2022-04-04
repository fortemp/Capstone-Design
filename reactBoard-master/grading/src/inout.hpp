#pragma once
#include "util.hpp"
#include <fstream>
#include <vector>

namespace Grading{
    using PathPair = std::pair<const std::string, const std::string>;

    class ProblemAnswerIterator: public std::vector<PathPair>{
        public:
            ProblemAnswerIterator(const std::string& infmt, const std::string& outfmt)
                :infmt_(infmt), outfmt_(outfmt){};

            ProblemAnswerIterator(ProblemAnswerIterator& pa)
                :infmt_(pa.infmt_), outfmt_(pa.outfmt_){};

            ProblemAnswerIterator(ProblemAnswerIterator&& pa)
                :infmt_(pa.infmt_), outfmt_(pa.outfmt_){};

            void set_problem(const char* problemID, uint length){
                if(isProblem_ == true) return;

                for(int i = 1; i <= length; i ++){
                    this->push_back(std::make_pair<const std::string, const std::string>(
                        string_format(this->infmt_, problemID, i), 
                        string_format(this->outfmt_, problemID, i)
                        )
                    );
                }

                isProblem_ = true;
            }

            void release_problem(){
                isProblem_ = false;
                length_ = 0;
            }

        private:
            const std::string infmt_;       //문제 파일 경로 포맷
            const std::string outfmt_;      //문제 결과 파일 경로 포맷

            bool isProblem_;                //문제가 진행중인가
            std::string problemID_;         //문제 이름
            uint length_;                   //문제 개수
    };
}
