#pragma once
#include <iostream>
#include <exception>
#include <memory>

namespace Grading{
    using uint = unsigned int;

    template<typename... Args>
    std::string string_format(const std::string& fmt, Args ... args){
        /*
        *   std::string 문자열 포맷팅 하는 함수
        */

        uint size = std::snprintf(nullptr, 0, fmt.c_str(), args ... ) + 1;

        if(size <= 0)
            throw std::runtime_error("ERROR: DURING FORMATTING");

        std::unique_ptr<char[]> buffer(new char[size]);
        std::snprintf(buffer.get(), size, fmt.c_str(), args ... );

        //without '\0'
        return std::string(buffer.get(), buffer.get() + size - 1);
    }

    template<typename... Args>
    int execute(const std::string& fmt, Args ... args){
        std::string command = string_format(fmt, args...);
        int result = system(command.c_str());

        if(result != 0)
            throw std::runtime_error(command);
	    return result;
    }

    //경로 만드는 함수
    template<typename T>
    std::string build_path(T head) noexcept {
        return std::string{head};
    }

    template<typename T, typename... Args>
    std::string build_path(T head, Args ... args) noexcept {
        return std::string{ head } + "/" + build_path(args...);
    }

}