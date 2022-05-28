#include <stdio.h>

int main(){
	int N, F, result;
	scanf("%d %d", &N, &F);
	for(result = 0; ((N/100)*100+result) % F != 0; result ++);
	printf("%02d\n", result);
	return 0;
}
