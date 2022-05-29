#include <stdio.h>

int state[10][2] = {
	{5, 1},
	{2, -1},
	{3, -1},
	{3, 4},
	{5, 7},
	{-1, 6},
	{5, 1},
	{8, 7},
	{3, 6},
	{-1, -1}
};

int main(){
	int T;
	scanf("%d", &T);
	
	for(int i = 0; i < T; i ++){
		int s = 0;
		char str[201];
		scanf("%s", str);
		
		char* p = str;
		while(*p){
			s = state[s][(*p)-'0'];
			if(s == -1) break;
			p ++;
		}
		if(s == 4 || s == 6 || s == 7){
			printf("YES\n");
		}
		else{
			printf("NO\n");
		}
	}

	return 0;
}
