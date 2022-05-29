#include <stdio.h>

#define A 1000000000

unsigned int cache[201][201];

int main(){
	int n, k;
	scanf("%d %d", &n, &k);

	for(int i = 0; i <= n; i ++){
		cache[i][1] = 1;
		//cache[i][2] = i + 1;
	}
	
	
	for(int c = 2; c <= k; c ++){
		for(int t = 0; t <= n; t ++){
			for(int s = 0; s <= t; s ++){
				cache[t][c] = (cache[t][c] + cache[t-s][c-1]) % A;
			}
		}
	}

	printf("%d\n", cache[n][k]);


	return 0;
}
