#pragma once
#include <exception>

namespace Grading{
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