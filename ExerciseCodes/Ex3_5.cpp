#include <iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

void display(Node *head)
{
    Node *temp = head;
    while (temp)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

Node *removeDuplicate(Node *head)
{
    Node *cur = head, *temp = nullptr, *prev = nullptr;

    while (cur)
    {
        temp = cur->next;
        prev = cur;

        while (temp)
        {
            if (cur->data == temp->data)
            {
                Node *nodeToDelete = temp;
                prev->next = temp->next;
                temp = temp->next;
                delete nodeToDelete;
            }
            else
            {
                prev = temp;
                temp = temp->next;
            }
        }
        cur = cur->next;
    }
    return head;
}

int main()
{
    Node *head = nullptr;

    head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(2);
    head->next->next->next = new Node(3);
    head->next->next->next->next = new Node(4);
    head->next->next->next->next->next = new Node(5);
    head->next->next->next->next->next->next = new Node(5);
    head->next->next->next->next->next->next->next = new Node(1);

    cout << "List: ";
    display(head);

    head = removeDuplicate(head);
    cout << "List without duplicates: ";
    display(head);

    return 0;
}
