#include <iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

Node *reverseList(Node *head)
{
    if (head == nullptr || head->next == nullptr)
        return head;
    Node *temp = head, *prev = nullptr, *front = nullptr;
    while (temp != nullptr)
    {
        front = temp->next;
        temp->next = prev;
        prev = temp;
        temp = front;
    }
    return prev;
}

bool isPalindrome(Node *head)
{
    if (head == nullptr || head->next == nullptr)
        return true;
    Node *slow_ptr = head, *fast_ptr = head;
    while (fast_ptr->next != nullptr && fast_ptr->next->next != nullptr)
    {
        slow_ptr = slow_ptr->next;
        fast_ptr = fast_ptr->next->next;
    }
    Node *newHead = reverseList(slow_ptr->next);
    Node *first = head, *second = newHead;
    while (second != nullptr)
    {
        if (first->data != second->data)
        {
            reverseList(newHead);
            return false;
        }
        first = first->next, second = second->next;
    }
    reverseList(newHead);
    return true;
}

void deleteList(Node *head)
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

int main()
{
    Node *head = nullptr, *tail = nullptr, *newNode = nullptr;

    for (int i = 1; i <= 11; ++i)
    {
        if (i & 1)
        {
            newNode = new Node(1);
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
        else
        {
            newNode = new Node(0);
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
    }

    cout << "First List: ";
    displayList(head);
    cout << "Palindrome: " << (isPalindrome(head) ? "YES\n" : "NO\n");

    Node *head2 = nullptr, *tail2 = nullptr;
    for (int i = 1; i <= 10; ++i)
    {
        newNode = new Node(i);
        if (head2 == nullptr)
        {
            head2 = newNode;
            tail2 = newNode;
        }
        else
        {
            tail2->next = newNode;
            tail2 = newNode;
        }
    }
    cout << "\nSecond List: ";
    displayList(head2);
    cout << "Palindrome: " << (isPalindrome(head2) ? "YES\n" : "NO\n");

    deleteList(head);
    deleteList(head2);
    return 0;
}