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
    void middleElement();
    int size();
    void displayList();
    ~List()
    {
        Node *temp;
        while (head != nullptr)
        {
            temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int List::size()
{
    Node *temp = head;
    int size = 1;

    while (temp->next != nullptr)
    {
        temp = temp->next;
        ++size;
    }

    return size;
}

void List::displayList()
{
    Node *temp = head;

    while (temp)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << endl;
}

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
        tail = newNode;
    }
}

void List::middleElement()
{
    Node *slowPtr = head, *fastPtr = head;

    if (this->size() & 1)
    {
        while (fastPtr->next != nullptr)
        {
            fastPtr = fastPtr->next->next;
            slowPtr = slowPtr->next;
        }
        cout << "Middle Element: " << slowPtr->data << endl;
        return;
    }

    while (fastPtr != nullptr)
    {
        fastPtr = fastPtr->next->next;
        slowPtr = slowPtr->next;
    }

    cout << "Middle Element: " << slowPtr->data << endl;
    return;
}

int main()
{
    List list;

    for (int i = 1; i <= 9; ++i)
    {
        list.newElement(i);
    }

    cout << "Linked List: ";

    list.displayList();
    list.middleElement();

    return 0;
}