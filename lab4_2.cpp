#include <bits/stdc++.h>
using namespace std;

class Polar
{
    float r, a;
    float x, y;

public:
    Polar(float radius, float angle) : r(radius), a(angle){};
    void to_rectangular()
    {
        x = r * cos(a * 0.0174533);
        y = r * sin(a * 0.0174533);
    }
    friend void operator+(Polar, Polar);
};

void operator+(Polar p1, Polar p2)
{
    float res_x, res_y;
    float a, th;
    res_x = p1.x + p2.x;
    res_y = p1.y + p2.y;
    a = sqrt(pow(res_x, 2) + pow(res_y, 2));
    th = atan(res_y / res_x) * 57.2958;
    cout << "Radius : " << a << "\nAngle : " << th << " deg" << endl;
}

int main()
{
    float a, b, c, d;
    cout << "Enter the parameters for point 1 in polar form: " << endl;
    cin >> a >> b;
    Polar p1(a, b);
    p1.to_rectangular();
    cout << "Enter the parameters for point 2 in polar form: " << endl;
    cin >> c >> d;
    Polar p2(1, 90);
    p2.to_rectangular();
    cout << "Polar Addition result :- " << endl;
    p1 + p2;
    return 0;
}