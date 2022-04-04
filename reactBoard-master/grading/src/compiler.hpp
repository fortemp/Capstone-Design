#pragma once
#include "util.hpp"

namespace Grading{
    class Executer{
        protected:
            std::string path_;

        public:
            Executer(const std::string& path)
            :path_(path){};

            Executer& operator<<(std::string dataPath){
                /*
                *
                *   실제 코드가 실행되는 부분
                *
                */
				execute("./%s.out < %s > %s.result", path_.c_str(), dataPath.c_str(), path_.c_str());

				return *this; 
            }
    };

    template <typename TYPE>
    class Compiler{
        protected:
            std::string option_;

            Compiler(const std::string& option)
            :option_(option){}
        
        public:
            Executer operator<<(std::string fname){
                return (static_cast<TYPE*>(this))->compile_(fname);
            }

            Executer compile_(std::string fname){
                throw std::runtime_error("Not implement this Compiler!\n");
            }
    };

    class CppCompiler: public Compiler<CppCompiler>{
        public:
            CppCompiler(const std::string& option)
            :Compiler(option){};
            
            Executer compile_(std::string path){
                execute("g++ %s -o %s " + option_, 
                        (path+".cpp").c_str(), 
                        (path+".out").c_str());
            
                return Executer(path);
            }
    };
}