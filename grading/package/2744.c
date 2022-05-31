#include <stdio.h>

#define IS_BCASE(X) (('A' <= (X) && (X) <= 'Z'))
#define IS_SCASE(X) (('a' <= (X) && (X) <= 'z'))

int main(){
	char string[101] = { 0, };

	scanf("%[^\n]s", string);

	char* p = string;

	while(*p){
		if(IS_BCASE(*p)){
			*p = (*p)-'A'+'a';
		}
		else if(IS_SCASE(*p)){
			*p = (*p)-'a'+'A';
		}

		p ++;
	}
	
	printf("%s\n", string);

	return 0;
}
