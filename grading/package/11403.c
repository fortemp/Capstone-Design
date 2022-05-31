#include <stdio.h>

int n;
int cache[101][101];

int main(){
	scanf("%d", &n);
	
	for(int i = 0; i < n; i ++){
		for(int j = 0; j < n; j ++) scanf("%d", cache[i] + j);
	}
	
	for(int m = 0; m < n; m ++){
		for(int x = 0; x < n; x ++){
			for(int y = 0; y < n; y ++){
				if(cache[x][m] != 0 && cache[m][y] != 0) cache[x][y] = 1;
			}
		}
	}
	
	for(int i = 0; i < n; i ++){
		for(int j = 0; j < n; j ++) printf("%d ", cache[i][j]);
		printf("\n");
	}

	return 0;
}
