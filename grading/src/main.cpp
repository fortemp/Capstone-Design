#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <getopt.h>
#include <map>
#include "grading.hpp"

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
static int help_arg = 0;

static struct option long_options[] = {
    //{"help", no_argument, &help_arg, 1},
    {"user", required_argument, 0, 0},
    {"code-id", required_argument, 0, 0},
    {"problem-path", required_argument, 0, 0},
    {"problem-id", required_argument, 0, 0},
    {"length", required_argument, 0, 0},
    {"language", required_argument, 0, 0},
    {0, 0, 0, 0}
};

//필요 변수
std::string user = "";
std::string code_id = "";
std::string problem_path = "";
std::string problem_id = "0";
std::string length = "0";
std::string language = "";

static std::map<std::string, std::string*> options{
    {"user", &user},
    {"code-id", &code_id},
    {"problem-path", &problem_path},
    {"problem-id", &problem_id},
    {"length", &length},
    {"language", &language}
};


int main(int argc, char** argv){
    //옵션 파싱
    int option_index = 0;
    for(int c = 0; c != -1; c = getopt_long(argc, argv, "u:c:p:l", long_options, &option_index)){
        if(c != 0) continue;
        (*options[std::string(long_options[option_index].name)]) = optarg? optarg: "0";
    }

    //문제개체 구성
    Grading::Problem p{problem_path, problem_id, (unsigned int)std::stoi(length)};

    //채점 구성
    Grading::Grading g{p, user, code_id};

    //컴파일러 세팅및 채점
    g.set_compiler(language);
    std::cout << g.grade_code() << std::endl;
    
    //테스트 정보
    //std::string problem_id = "1000";
    //uint test_length = 4;
    //std::string test_lang = "cpp";

    //문제 개체 구성
    //Grading::Problem p{"../problem", problem_id, test_length};

    //유저정보
    //std::string UUID    = "12345678-1234-1234-012345678912";
    //std::string code_id = "0123456780";
    
    //문제 구성
    //Grading::Grading g{p, UUID, code_id};

    //컴파일러 세팅
    //g.set_compiler(test_lang);
    //std::cout << g.grade_code() << std::endl;
    
    return 0;
}