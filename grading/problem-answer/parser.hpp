#include <cstdio>
#include <regex>
#include <fstream>
#include <map>

#include "generator.hpp"

enum class MODE{    //파싱 단계
    READY = 0x00,   //준비
    PARSING = 0x01, //파싱중
    END = 0x02,     //한문장 파싱 끝
    ACCEPT = 0x10,  //허가
    DENINE = 0x11   //거부
};

static BaseGenerator* first = nullptr;
static std::map<std::string, BaseData*> data_result;
static std::map<std::string, BaseGenerator*> gene_result;

template<typename T, typename U>
void map_print(std::map<T, U>* data){
    for(auto& i: (*data)){
        std::cout << i.first << ": [" << i.second << "]" << std::endl;
    }
    return;
}

bool parsing_(std::map<std::string, std::string>* arg, std::string cursor){
    //\t<...>: <...> 형식을 파싱
    std::regex type_content_re("[\\s]+(.+)[ ]?:[ ]?(.+),");
    std::smatch type_content_match;
    std::regex_match(cursor, type_content_match, type_content_re);

    if(type_content_match.size() == 0) return false;

    std::string type = type_content_match[1];
    std::string content = type_content_match[2];

    //구분자의 경우 좀 더 특수한 형태로 파싱
    if(type == "separator"){
        std::regex separator_re("\"(.+)\"");
        std::smatch separator_match ;

        std::regex_match(content, separator_match, separator_re);

        if(separator_match.size() == 0) return false;

        content = separator_match[1];
    }

    (*arg)[type] = content;

    return true;
}

bool is_none(std::string& temp){
    return temp == "~";
}

int parsing(std::string range_path){
    // ~ 은 내용이 없다는 특수문자
    std::map<std::string, std::string> argument{
        {"type", "~"},          //int, double, string등 데이터 타입
        {"gene", "~"},          //single, tuple등 생성타입
        {"name", "~"},          //변수의 이름

        {"min", "~"},           //데이터: 랜덤의 최솟값
        {"max", "~"},           //데이터: 랜덤의 최댓값
        {"wordset", "~"},       //데이터: string 타입을 위한 wordset
        {"separator", "~"},      //데이터: 구분자

        {"prev", "~"},          //제네레이터: 생성 이전에 생성해야할 변수이름
        {"count", "~"},         //제네레이터: 튜플갯수

        {"rule", "~"},          //제네레이터: 제네레이터 사용시 지켜야할 규칙
        {"connect", "~"}        //제네레이터: 규칙에서 사용하는 이전에 정의된 변수
    };

    std::ifstream range_file(range_path);

    MODE mode = MODE::READY;    //파싱 단계
    std::string cursor;         //파싱 중인 문장

    while(!range_file.eof()){
        if(mode != MODE::END) getline(range_file, cursor);

        //std::cout << "[" << cursor << "] " << (int)mode << std::endl;
        switch(mode){
            case MODE::READY:{
                if(cursor == "") mode = MODE::READY;
                else if(cursor == "{") mode = MODE::PARSING;
                else mode = MODE::DENINE;
                break;
            }

            case MODE::PARSING:{
                if(cursor == "}") mode = MODE::END;
                //else if(cursor == "\n" || cursor == "" || cursor == "\t") break;
                else if(!parsing_(&argument, cursor)) mode = MODE::DENINE;
                break;
            }

            case MODE::END:{
                //std::cout << "---END---\n";
                //map_print(&argument);
                //std::cout << "---END---\n";

                std::string name = argument["name"];

                std::string type = argument["type"];
                std::string gene = argument["gene"];

                std::string prev = argument["prev"];
                std::string count = argument["count"];

                std::string rule = argument["rule"];
                std::string connect = argument["connect"];

                data_result[name] = data_creator[type](argument);
                gene_result[name] = gene_creator[gene]();

                //제네레이터 설정 시작
                BaseGenerator* target = gene_result[name];
                target->set_data(data_result[name]);
                
                //룰과 커넥터 연결
                if(!is_none(rule)) target->set_rule(generator_rules[rule]);
                if(!is_none(connect)) target->set_connect(gene_result[connect]);
                
                //제네레이터 연결
                if(!is_none(prev)) gene_result[prev]->set_next(target);

                //튜플인 경우만
                if(type == "tuple" && !is_none(count)) 
                    static_cast<TupleDataGenerator*>(target)->set_idx(stoi(count));

                if(!first) first = gene_result[name];

                mode = MODE::READY;
                break;
            }

            case MODE::DENINE:
                return -1;

            default:
                return -1;
        }
    }

    return 1;
}
