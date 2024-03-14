#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *next;

    Node(int value)
    {
        data = value;
        next = nullptr;
    }
};

class List
{
private:
    Node *head;

public:
    List()
    {
        head = nullptr;
    }

    ~List()
    {
        Node *current = head;
        while (current != nullptr)
        {
            Node *next = current->next;
            delete current;
            current = next;
        }
    }

    void insertAtBeginning(int value)
    {
        Node *newNode = new Node(value);
        newNode->next = head;
        head = newNode;
    }

    void insertAtEnd(int value)
    {
        Node *newNode = new Node(value);
        if (head == nullptr)
        {
            head = newNode;
            return;
        }
        Node *current = head;
        while (current->next != nullptr)
        {
            current = current->next;
        }
        current->next = newNode;
    }

    void deleteNode(int key)
    {
        Node *temp = head;
        Node *prev = nullptr;

        if (temp != nullptr && temp->data == key)
        {
            head = temp->next;
            delete temp;
            return;
        }

        while (temp != nullptr && temp->data != key)
        {
            prev = temp;
            temp = temp->next;
        }

        if (temp == nullptr)
            return;

        prev->next = temp->next;
        delete temp;
    }

    void display()
    {
        Node *current = head;
        while (current != nullptr)
        {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }
};

int main()
{
    List l;

    for (int i = 1; i <= 9; ++i)
        l.insertAtEnd(i);

    cout << "Predefined linked list: ";
    l.display();

    int value, key;

    cout << "Enter a value to insert at the beginning: ";
    cin >> value;
    l.insertAtBeginning(value);
    cout << "After inserting at the beginning: ";
    l.display();

    cout << "Enter a value to insert at the end: ";
    cin >> value;
    l.insertAtEnd(value);
    cout << "After inserting at the end: ";
    l.display();

    cout << "Enter the key of the node to delete: ";
    cin >> key;
    l.deleteNode(key);
    cout << "After deleting node with key " << key << ": ";
    l.display();

    return 0;
}
