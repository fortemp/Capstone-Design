#include <stdio.h>
#define ABS(X) (((X) > 0)? (X): -(X))

int main(){
	int t = 0;
	scanf("%d", &t);

	for(int a = 0; a < t; a ++){
		long long x1, y1, r1;
		long long x2, y2, r2;
		scanf("%lld %lld %lld %lld %lld %lld", &x1, &y1, &r1, &x2, &y2, &r2);
		
		long long dx = ABS(x1-x2), dy = ABS(y1-y2);
		long long dc = dx*dx + dy*dy;

		long long ar = (r1+r2)*(r1+r2);
		long long sr = (r1-r2)*(r1-r2); 

		if(dc < ar && dc > sr) printf("2\n");
		else if(dc == ar || (dc == sr && dc != 0)) printf("1\n");
		else if(dc < sr || dc > ar) printf("0\n");
		else if(dc == 0 && r1 == r2) printf("-1\n");
		else printf("0\n");
	}
	return 0;
}
