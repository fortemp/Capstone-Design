#include <stdio.h>

#define MIN(X, Y) (((X) > (Y))? (Y): (X))
#define INF 10000001
int graph[502][502];

int main(){
	int n, m, result = 0;
	scanf("%d %d", &n, &m);

	for(int i = 1; i <= n; i ++)
		for(int j = 1; j <= n; j ++) graph[i][j] = INF;

	for(int i = 0; i < m; i ++){
		int x, y;
		scanf("%d %d", &x, &y);

		graph[x][y] = 1;
	}

	for(int m = 1; m <= n; m ++){
		for(int s = 1; s <= n; s ++){
			for(int f = 1; f <= n; f ++) graph[s][f] = MIN(graph[s][f], graph[s][m] + graph[m][f]);
		}
	}
	
	for(int i = 1; i <= n; i ++){
		for(int j = 1; j <= n; j ++){
			if(graph[i][j] < graph[j][i]) graph[j][i] = graph[i][j];
			else graph[i][j] = graph[j][i];
		}
	}
	
	for(int i = 1; i <= n; i ++){
		int c = 0;
		for(int j = 1; j <= n; j ++) if(graph[i][j] == INF) c ++;

		if(c <= 1) result ++;
	}
	
	printf("%d\n", result);

	return 0;
}
