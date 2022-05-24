#include <iostream>
#include <vector>
#include <random>
#include <functional>
#include <algorithm>
#include <cstring>

using std::random_device;

class BaseData{
    public:
        BaseData(std::string separator){ set_separator(separator); };

        virtual void set_separator(std::string separator){
            separator_ = separator;
            if(separator_ == "\\n") separator_ ="\n";
            if(separator_ == "\\t") separator_ = "\t";
        }

        virtual std::string get_separator(){ return separator_; }

        virtual void generate() = 0;
        virtual void* get_data() = 0;

        virtual std::ostream& print(std::ostream& os) = 0;
        
        virtual ~BaseData(){};

        friend std::ostream& operator<<(std::ostream& os, BaseData& data){
            return data.print(os);
        }

    protected:
        std::string separator_;
};

class EmptyData: public BaseData{
    public:
        EmptyData(std::string separator = " ")
        :BaseData(separator){};

        virtual void generate() override{ return; }
        virtual void* get_data() override{ return nullptr; };

        virtual std::ostream& print(std::ostream& os) override{
            os << separator_;
            return os;
        }
};

class IntRangeData: public BaseData{
    public:
        IntRangeData(int min_value, int max_value, std::random_device& rand, std::string separator = " ")
        :current_value_(0), rand_(rand), dist_(min_value, max_value),
        BaseData(separator){};

        virtual void generate() override{ current_value_ = dist_(rand_); };
        virtual void* get_data() override{ return (void*)&current_value_; };

        virtual std::ostream& print(std::ostream& os) override{
            os << current_value_ << separator_;
            return os;
        }

    private:
        int current_value_;

        std::random_device& rand_;
        std::uniform_int_distribution<int> dist_;
};

class DoubleRangeData: public BaseData{
    public:
        DoubleRangeData(double min_value, double max_value, std::random_device& rand, std::string separator = " ")
        :current_value_(0), rand_(rand), dist_(min_value, max_value),
        BaseData(separator){};

        virtual void generate() override{ current_value_ = dist_(rand_); }
        virtual void* get_data() override{ return (void*)&current_value_; };

        virtual std::ostream& print(std::ostream& os) override{
            os << current_value_ << separator_;
            return os;
        }



    private:
        double current_value_;

        std::random_device& rand_;
        std::uniform_real_distribution<double> dist_;
};

class StringData: public BaseData{
    public:
        StringData(std::vector<char> wordset, unsigned int min_length, unsigned int max_length, 
        std::random_device& rand, std::string separator = " ")
        :wordset_(wordset), min_length_(min_length), max_length_(max_length),
        dist_(nullptr), rand_(rand), BaseData(separator){
            dist_ = new std::uniform_int_distribution<int>{0, (int)wordset_.size() - 1};
        };

        virtual void generate() override{
            int current_length = std::abs((int)rand_()) % (max_length_ - min_length_ + 1) + min_length_;

            current_value_.clear();
            while(current_length--){
                current_value_ += wordset_[(*dist_)(rand_)];
            }
        }

        virtual void* get_data(){ return (void*)&current_value_; }

        virtual std::ostream& print(std::ostream& os) override{
            os << current_value_ << separator_;
            return os;
        }



        virtual ~StringData() override{
            if(dist_) delete dist_;
        }

    private:
        std::string current_value_;

        std::vector<char> wordset_;
        unsigned int min_length_;
        unsigned int max_length_;

        std::random_device& rand_;
        std::uniform_int_distribution<int>* dist_;
};


class BaseGenerator;

class BaseGenerator{
    public:
        BaseGenerator(BaseData* data = nullptr, BaseGenerator* next = nullptr)
        :data_(data), next_(next), rule_(nullptr), connect_(nullptr){}

        virtual void set_data(BaseData* data){ data_ = data; };
        virtual BaseData* get_data(){ return data_; };

        virtual void set_next(BaseGenerator* next){ next_ = next; };
        virtual BaseGenerator* get_next() { return next_; };

        virtual void set_rule(bool (*rule)(BaseGenerator*, BaseGenerator*)){ rule_ = rule; };
        virtual bool (*get_rule())(BaseGenerator*, BaseGenerator*){ return rule_; };

        virtual void set_connect(BaseGenerator* connect){ connect_ = connect; };

        virtual std::ostream& print(std::ostream& os) = 0;

        friend std::ostream& operator<<(std::ostream& os, BaseGenerator& gene){
            return gene.print(os);
        }

        virtual ~BaseGenerator(){};

    protected:
        BaseData*      data_;                           //데이터를 생성하는 규칙
        BaseGenerator* next_;                           //생성후 다음 호출할 변수

        bool (*rule_)(BaseGenerator*, BaseGenerator*);   //데이터생성에 관한 규칙
        BaseGenerator* connect_;                        //연관 데이터의 관한 변수
};

class SingleDataGenerator: public BaseGenerator{
    //단일 변수 생성 제네레이터
    public:
        SingleDataGenerator(BaseData* data = nullptr, BaseGenerator* next = nullptr)
        :BaseGenerator(data, next){};

        virtual std::ostream& print(std::ostream& os){
            do{
                data_->generate();
            }while(rule_ && !(*rule_)(this, connect_)); //rule이 있어서 그게 true 가 될 때 까지

            os << *data_;

            if(next_) next_->print(os);
            return os;
        }
};

class TupleDataGenerator: public BaseGenerator{
    //다중 변수 생성 제네레이터
    public:
        TupleDataGenerator(BaseData* data = nullptr, BaseGenerator* next = nullptr, unsigned int idx = -1)
        :BaseGenerator(data, next), idx_(idx){};

        void set_idx(unsigned int idx){ idx_ = idx; };

        virtual std::ostream& print(std::ostream& os){
            if(rule_) (*rule_)(this, connect_); //만약 규칙이 있을 경우 생성은 규칙의 갯수를 따른다.
            int count = idx_;

            for(int i = 0; i < count; i ++){
                data_->generate();
                os << *data_;
            }

            if(next_) next_->print(os);
            return os;
        }
    private:
        unsigned int idx_;
};

class TestCaseGenerator: public BaseGenerator{
    public:
        TestCaseGenerator(IntRangeData* data = nullptr, BaseGenerator* next = nullptr)
        :BaseGenerator(data, next){};

        virtual std::ostream& print(std::ostream& os){
            data_->generate();
            int t = *(int*)data_->get_data();

            os << *data_;
            for(int i = 0; i < t && next_; i ++) next_->print(os); 
            os << "\n";
            return os;
        }

    private:
};

//랜덤 디바이스
random_device tmprand;

//데이터 생성자에 관한 내용
using DataCreateFunction = BaseData*(*)(std::map<std::string, std::string>&);

BaseData* create_empty(std::map<std::string, std::string>& data){
    return new EmptyData{data["separator"]};
}

BaseData* create_int(std::map<std::string, std::string>& data){
    return new IntRangeData{stoi(data["min"]), stoi(data["max"]), tmprand, data["separator"]};
}

BaseData* create_double(std::map<std::string, std::string>& data){
    return new DoubleRangeData{stod(data["min"]), stod(data["max"]), tmprand, data["separator"]};
}

BaseData* create_string(std::map<std::string, std::string>& data){
    //new StringData{wordset, stoi(data["min"]), stoi(data["max"]), tmprand, data["separator"]};
    return nullptr;
}

static std::map<std::string, DataCreateFunction> data_creator{
    {"empty", &create_empty},
    {"int", &create_int},
    {"double", &create_double},
    {"string", &create_string}
};

//제네레이터의 관련된 내용

using GeneCreateFunction = std::function<BaseGenerator*()>;

static std::map<std::string, GeneCreateFunction> gene_creator{
    {"single", [](){ return new SingleDataGenerator(); }},
    {"tuple", [](){ return new TupleDataGenerator(); }},
    {"test", [](){ return new TestCaseGenerator(); }}
};

//규칙에 관한 내용
bool always_true(BaseGenerator* self, BaseGenerator* base){
    return true;
}

bool tuple_count(BaseGenerator* self, BaseGenerator* base){
    if(!base) return false;
    BaseData* bd = base->get_data();
    static_cast<TupleDataGenerator*>(self)->set_idx(*(int*)(bd->get_data()));
    return true;
}

static std::map<std::string, bool (*)(BaseGenerator*, BaseGenerator*)> generator_rules{
    {"always true", &always_true},
    {"tuple count", &tuple_count}
};