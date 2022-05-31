#include <stdio.h>
#define NMAX 500000

int main(){
	char premap[8][4] = {
		"0\0", "1\0", "10\0", "11\0", "100\0", "101\0", "110\0", "111\0"
	};

	char map[8][4] = {
		"000\0", "001\0", "010\0", "011\0", "100\0", "101\0", "110\0", "111\0"
	};


	char number[NMAX] = { 0, };
	char result[3*NMAX] = { 0, };

	int length = 0;
	while(scanf("%c", &number[length++]) != EOF);
	
	number[length-2] = -1;

	int idx = 0;
	
	while(number[idx] != -1){
		int n = number[idx] - '0';
		
		if(idx == 0) printf("%s", premap[n]);
		else printf("%s", map[n]);

		idx ++;
	}
	printf("\n");
	return 0;
}
