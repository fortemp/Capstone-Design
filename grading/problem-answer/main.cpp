#include <getopt.h>

#include "parser.hpp"
#include "util.hpp"

static int help_arg = 0;
static struct option long_options[] = {
    //{"help", no_argument, &help_arg, 1},
    {"range-format", required_argument, 0, 0},
    {"problem-id", required_argument, 0, 0},
    {"language", required_argument, 0, 0},
    {0, 0, 0, 0}
};

static std::map<std::string, std::string> options{
    {"package-path", "./package"},
    {"range-format", ""},
    {"problem-id", ""},
    {"language", ""}
};


int main(int argc, char* argv[]){
    /*
    options
        --range-format string/ path
        --problem-id   string/ 
    */

    //옵션 파싱
    int option_index = 0;
    for(int c = 0; c != -1; c = getopt_long(argc, argv, "u:c:p:l", long_options, &option_index)){
        if(c != 0) continue;
        options[std::string(long_options[option_index].name)] = optarg? optarg: "";
    }
    
    parsing( Grading::build_path(options["package-path"], options["range-format"]) );

    std::cout << *first << std::endl;


    return 0;
}

/*
int main(){
    parsing("./package/2166.range");

    std::cout << *gene_result["N"] << std::endl;

    IntRangeData N{1, 10, tmprand, " "};
    IntRangeData M{1, 20, tmprand, "\n"};
    IntRangeData H{1, 10, tmprand, " "};
    EmptyData NEWLINE{"\n"};

    SingleDataGenerator newline{&NEWLINE};
    TupleDataGenerator height{&H, &newline};
    SingleDataGenerator m{&M, &height};
    SingleDataGenerator n{&N, &m};

    height.set_rule(&tuple_count);
    height.set_connect(&n);

    std::cout << n;


    //IntRangeData N{3, 3, tmprand, " "};

    IntRangeData M{4, 4, tmprand, "\n"};
    IntRangeData H{1, 10, tmprand, " "};
    EmptyData NEWLINE{"\n"};

    SingleDataGenerator newline{&NEWLINE};
    TupleDataGenerator tuple{&H, &newline, 2};
    TestCaseGenerator test{&M, &tuple};

    tuple.set_rule(&tuple_count);
    tuple.set_connect(&test);

    std::cout << test;


    return 0;
}
*/