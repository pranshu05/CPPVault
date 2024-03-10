#include <iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next;
    Node(int val) : data(val) {}
};

bool containsCycle(Node *head)
{
    if (head == nullptr)
        return false;

    Node *secPtr = head, *priPtr = head;

    while (priPtr && priPtr->next)
    {
        secPtr = secPtr->next;
        priPtr = priPtr->next->next;
        if (secPtr == priPtr)
            return true;
    }

    return false;
}

int main()
{
    Node *head = nullptr, *tail = nullptr, *newNode = nullptr;

    for (int i = 1; i <= 10; ++i)
    {
        newNode = new Node(i);
        if (head == nullptr)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            tail->next = newNode;
            newNode->next = head;
            tail = newNode;
        }
    }

    if (containsCycle(head))
        cout << "List contains a cycle.";
    else
        cout << "List doesn't contain cycle.";
    return 0;
}
