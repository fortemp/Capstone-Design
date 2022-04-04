#pragma once
#include <iostream>
#include <stdexcept>
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
	    return system(string_format(fmt, args...).c_str());
    }

}