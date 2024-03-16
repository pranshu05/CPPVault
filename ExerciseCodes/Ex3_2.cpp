#include <iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next, *prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class List
{
private:
    Node *head, *tail;

public:
    List() : head(nullptr), tail(nullptr) {}
    void newElement(int val);
    void reverseList();
    void displayList();
    ~List()
    {
        Node *temp = nullptr;
        while (head != nullptr)
        {
            temp = head;
            head = head->next;
            delete temp;
        }
        temp = nullptr;
    }
};

void List::newElement(int val)
{
    Node *temp = head;
    Node *newNode = new Node(val);

    if (head == nullptr)
    {
        head = newNode;
        tail = newNode;
    }
    else
    {
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
}

void List::reverseList()
{
    Node *temp = head, *back = nullptr;

    if (head == nullptr || head == tail)
        return;

    while (temp != nullptr)
    {
        back = temp->prev;
        temp->prev = temp->next;
        temp->next = back;
        temp = temp->prev;
    }

    Node *t = head;
    head = tail;
    tail = t;
}

void List::displayList()
{
    if (head == nullptr)
        return;

    Node *temp = head;

    while (temp != nullptr)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << endl;
}

int main()
{
    List dl;

    for (int i = 1; i <= 10; ++i)
    {
        dl.newElement(i);
    }

    cout << "List: ";
    dl.displayList();
    cout << "Reversed List: ";
    dl.reverseList();
    dl.displayList();

    return 0;
}