#include <iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

Node *mergeLists(Node *head1, Node *head2)
{
    Node *t1 = head1, *t2 = head2;
    Node *dummy = new Node(-1);
    Node *temp = dummy;

    while (t1 && t2)
    {
        if (t1->data < t2->data)
        {
            temp->next = t1;
            temp = t1;
            t1 = t1->next;
        }
        else
        {
            temp->next = t2;
            temp = t2;
            t2 = t2->next;
        }
    }

    if (t1)
    {
        temp->next = t1;
    }

    else
    {
        temp->next = t2;
    }

    return dummy->next;
}

void displayList(Node *head)
{
    Node *temp = head;
    while (temp)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

void deleteList(Node *head)
{
    Node *temp;
    while (head)
    {
        temp = head;
        head = head->next;
        delete temp;
    }
}

int main()
{
    Node *head1 = nullptr, *head2 = nullptr;

    head1 = new Node(1);
    head1->next = new Node(3);
    head1->next->next = new Node(5);
    head1->next->next->next = new Node(7);
    head1->next->next->next->next = new Node(9);
    cout << "List1: ";
    displayList(head1);

    head2 = new Node(2);
    head2->next = new Node(4);
    head2->next->next = new Node(8);
    head2->next->next->next = new Node(10);
    cout << "List2: ";
    displayList(head2);

    Node *h = mergeLists(head1, head2);

    cout << "Merged List : ";
    displayList(h);

    deleteList(h);
    return 0;
}