#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *prev;
    Node *next;

    Node(int value)
    {
        data = value;
        prev = nullptr;
        next = nullptr;
    }
};

class List
{
private:
    Node *head;
    Node *tail;

public:
    List()
    {
        head = nullptr;
        tail = nullptr;
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
        if (head == nullptr)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
    }

    void insertAtEnd(int value)
    {
        Node *newNode = new Node(value);
        if (tail == nullptr)
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

    void insertAtPosition(int value, int position)
    {
        if (position <= 0)
        {
            cout << "Invalid position!" << endl;
            return;
        }

        Node *newNode = new Node(value);
        if (position == 1)
        {
            insertAtBeginning(value);
            return;
        }

        Node *current = head;
        for (int i = 1; i < position - 1 && current != nullptr; ++i)
        {
            current = current->next;
        }

        if (current == nullptr)
        {
            cout << "Position out of range!" << endl;
            return;
        }

        newNode->next = current->next;
        newNode->prev = current;
        if (current->next != nullptr)
            current->next->prev = newNode;
        current->next = newNode;

        if (newNode->next == nullptr)
            tail = newNode;
    }

    void deleteNode(int key)
    {
        Node *current = head;

        if (current != nullptr && current->data == key)
        {
            head = current->next;
            if (head != nullptr)
                head->prev = nullptr;
            delete current;
            return;
        }

        while (current != nullptr && current->data != key)
        {
            current = current->next;
        }

        if (current == nullptr)
        {
            cout << "Node with key " << key << " not found." << endl;
            return;
        }

        if (current->next != nullptr)
            current->next->prev = current->prev;
        if (current->prev != nullptr)
            current->prev->next = current->next;

        if (current == tail)
            tail = current->prev;

        delete current;
    }

    void displayForward()
    {
        Node *current = head;
        while (current != nullptr)
        {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }

    void displayBackward()
    {
        Node *current = tail;
        while (current != nullptr)
        {
            cout << current->data << " ";
            current = current->prev;
        }
        cout << endl;
    }
};

int main()
{
    List l;

    for (int i = 1; i <= 9; ++i)
        l.insertAtEnd(i);

    int value;
    cout << "Enter a value to insert at the beginning: ";
    cin >> value;
    l.insertAtBeginning(value);

    cout << "Enter a value to insert at the end: ";
    cin >> value;
    l.insertAtEnd(value);

    int position;
    cout << "Enter a value to insert: ";
    cin >> value;
    cout << "Enter the position to insert: ";
    cin >> position;
    l.insertAtPosition(value, position);

    int key;
    cout << "Enter the key of the node to delete: ";
    cin >> key;
    l.deleteNode(key);

    cout << "Doubly linked list in forward direction: ";
    l.displayForward();
    cout << "Doubly linked list in backward direction: ";
    l.displayBackward();

    return 0;
}