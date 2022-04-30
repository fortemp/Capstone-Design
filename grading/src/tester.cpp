#include "util.hpp"
#include <chrono>
#include "compiler.hpp"

int main(){
    std::string UUID = "12345678-1234-1234-012345678912";
    std::string option      = "-O2 -Wall -lm -static -std=gnu++17"; 

    //normal compile
    try{
        std::string target_path = Grading::build_path("..", "testcode", UUID, "0123456780.cpp");
        std::string result_path = Grading::build_path("..", "testcode", UUID, "0123456780.out");

        std::string data_path = Grading::build_path("..", "problem", "1000", "in", "1.in");
        std::string run_result_path = Grading::build_path("..", "testcode", UUID, "0123456780.result");

        std::string log_path    = Grading::build_path("..", "testcode", UUID, "0123456780.log");

        Grading::CppCompiler compiler{option, target_path, result_path, log_path};
        auto executer = compiler.compile();
        int RESULT_SIG = executer->run(data_path, run_result_path, log_path, std::chrono::seconds(1));
        std::cout << RESULT_SIG << std::endl;
    }
    catch(std::exception e){
        std::cout << e.what() << std::endl;
    }

    //compile error
    try{
        std::string target_path = Grading::build_path("..", "testcode", UUID, "0123456781.cpp");
        std::string result_path = Grading::build_path("..", "testcode", UUID, "0123456781.out");

        std::string data_path = Grading::build_path("..", "problem", "1000", "in", "1.in");
        std::string run_result_path = Grading::build_path("..", "testcode", UUID, "0123456781.result");

        std::string log_path    = Grading::build_path("..", "testcode", UUID, "0123456781.log");

        Grading::CppCompiler compiler{option, target_path, result_path, log_path};
        auto executer = compiler.compile();
        int RESULT_SIG = executer->run(data_path, run_result_path, log_path, std::chrono::seconds(1));
        std::cout << RESULT_SIG << std::endl;
    }
    catch(std::exception e){
        std::cout << e.what() << std::endl;
    }

    //runtime error
    try{
        std::string target_path = Grading::build_path("..", "testcode", UUID, "0123456782.cpp");
        std::string result_path = Grading::build_path("..", "testcode", UUID, "0123456782.out");

        std::string data_path = Grading::build_path("..", "problem", "1000", "in", "1.in");
        std::string run_result_path = Grading::build_path("..", "testcode", UUID, "0123456782.result");

        std::string log_path    = Grading::build_path("..", "testcode", UUID, "0123456782.log");

        Grading::CppCompiler compiler{option, target_path, result_path, log_path};
        auto executer = compiler.compile();
        int RESULT_SIG = executer->run(data_path, run_result_path, log_path, std::chrono::seconds(1));
        std::cout << RESULT_SIG << std::endl;
    }
    catch(std::exception e){
        std::cout << e.what() << std::endl;
    }

    //infinite loop
    try{
        std::string target_path = Grading::build_path("..", "testcode", UUID, "0123456783.cpp");
        std::string result_path = Grading::build_path("..", "testcode", UUID, "0123456783.out");

        std::string data_path = Grading::build_path("..", "problem", "1000", "in", "1.in");
        std::string run_result_path = Grading::build_path("..", "testcode", UUID, "0123456783.result");

        std::string log_path    = Grading::build_path("..", "testcode", UUID, "0123456783.log");

        Grading::CppCompiler compiler{option, target_path, result_path, log_path};
        auto executer = compiler.compile();
        int RESULT_SIG = executer->run(data_path, run_result_path, log_path, std::chrono::seconds(1));
        std::cout << RESULT_SIG << std::endl;
    }
    catch(std::exception e){
        std::cout << e.what() << std::endl;
    }

    return 0;
}