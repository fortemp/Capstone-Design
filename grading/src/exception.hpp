#pragma once
#include <exception>

namespace Grading{
    class CantOpenFileException: public std::exception{
        public:
            CantOpenFileException(const std::string& file_name)
            :std::exception(), file_name_(file_name){
            }

            const char* what() const noexcept override{
                std::string message = "exception: Cant Open \"" + file_name_ + "\" file"; 
                std::cout << message << std::endl;
                return message.c_str();
            }
        private:
            const std::string file_name_;
    };

    class NoFileException: public std::exception{
        public:
            const char* what() const noexcept override{
                return "exception: no file error";
            }
    };

    class CompileException: public std::exception{
        public:
            const char* what() const noexcept override{
                return "exception: compile error";
            }
    };

    class RuntimeException: public std::exception{
        public:
            const char* what() const noexcept override{
                return "exception: runtime error";
            }
    };
}