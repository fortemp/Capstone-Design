#include <stdio.h>
#include <stdlib.h>

int factor[50];

int compare(const void* x, const void* y){
	return *(int*)x > *(int*)y;
}

int main(){
	int n;
	scanf("%d", &n);
	
	for(int i = 0; i < n; i ++){
		scanf("%d", factor+i);
	}

	qsort(factor, n, sizeof(int), compare);
	int x = factor[0]; int y = factor[n-1];

	printf("%d\n", x*y);

	return 0;
}
