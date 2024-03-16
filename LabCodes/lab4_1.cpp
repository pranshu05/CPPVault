#include <bits/stdc++.h>
using namespace std;

#define ff(i, count) for (int i = 0; i < count; i++)
#define fb(i, count) for (int i = count; i > 0; i--)

class Matrix
{
    int m, n;
    int arr[100][100];

public:
    friend void operator+(Matrix, Matrix);
    friend void operator-(Matrix, Matrix);
    friend void operator*(Matrix, Matrix);
    Matrix(int row, int col) : m(row), n(col){};
    void input()
    {
        ff(i, m)
        {
            ff(j, n)
            {
                cin >> arr[i][j];
            }
        }
    }
    void display()
    {
        ff(i, m)
        {
            ff(j, n)
            {
                cout << arr[i][j] << " ";
            }
            cout << endl;
        }
    }
};
void operator+(Matrix m1, Matrix m2)
{
    if (m1.m == m2.m && m1.n == m2.n)
    {
        int res[m1.m][m1.n];
        ff(i, m1.m)
        {
            ff(j, m1.n)
            {
                res[i][j] = m1.arr[i][j] + m2.arr[i][j];
            }
        }
        ff(i, m1.m)
        {
            ff(j, m1.n)
            {
                cout << res[i][j] << " ";
            }
            cout << endl;
        }
    }
    else
        cout << "Cannot add the given matrices !" << endl;
}
void operator-(Matrix m1, Matrix m2)
{
    if (m1.m == m2.m && m1.n == m2.n)
    {
        int res[m1.m][m1.n];
        ff(i, m1.m)
        {
            ff(j, m1.n)
            {
                res[i][j] = m1.arr[i][j] - m2.arr[i][j];
            }
        }
        ff(i, m1.m)
        {
            ff(j, m1.n)
            {
                cout << res[i][j] << " ";
            }
            cout << endl;
        }
    }
    else
        cout << "Cannot subtract the given matrices !" << endl;
}
void operator*(Matrix m1, Matrix m2)
{
    if (m1.n == m2.m)
    {
        int x = m1.m, y = m2.m, z = m2.n;
        int res[x][z] = {0};
        ff(i, x)
        {
            ff(j, z)
            {
                res[i][j] = 0;
                ff(k, y)
                {
                    res[i][j] += m1.arr[i][k] * m2.arr[k][j];
                }
            }
        }
        ff(i, x)
        {
            ff(j, z)
            {
                cout << res[i][j] << " ";
            }
            cout << endl;
        }
    }
    else
        cout << "Cannot multiply the given matrices !" << endl;
}

int main()
{
    int m, n;
    cout << "Enter size of matrix 1 : " << endl;
    cin >> m >> n;
    cout << "Enter the elements of matrix 1:" << endl;
    Matrix m1(m, n);
    m1.input();
    cout << "Enter size of matrix 2 : " << endl;
    cin >> m >> n;
    cout << "Enter the elements of matrix 2:" << endl;
    Matrix m2(m, n);
    m2.input();
    cout << "Matrix 1 : " << endl;
    m1.display();
    cout << "Matrix 2 : " << endl;
    m2.display();
    cout << "Addition of given matrices is : " << endl;
    m1 + m2;
    cout << "Subtraction of given matrices is : " << endl;
    m1 - m2;
    cout << "Multiplication of given matrices is : " << endl;
    m1 *m2;
    return 0;
}