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
        if (head == nullptr)
            return;

        Node *current = head->next;
        while (current != head)
        {
            Node *temp = current;
            current = current->next;
            delete temp;
        }
        delete head;
    }

    void insertAtBeginning(int value)
    {
        Node *newNode = new Node(value);
        if (head == nullptr)
        {
            head = newNode;
            head->next = head;
        }
        else
        {
            newNode->next = head->next;
            head->next = newNode;
        }
    }

    void insertAtEnd(int value)
    {
        Node *newNode = new Node(value);
        if (head == nullptr)
        {
            head = newNode;
            head->next = head;
        }
        else
        {
            Node *current = head;
            while (current->next != head)
            {
                current = current->next;
            }
            current->next = newNode;
            newNode->next = head;
        }
    }

    void deleteNode(int key)
    {
        if (head == nullptr)
        {
            cout << "List is empty. Cannot delete." << endl;
            return;
        }

        Node *temp = head;
        Node *prev = nullptr;

        while (temp->data != key)
        {
            if (temp->next == head)
            {
                cout << "Node with key " << key << " not found." << endl;
                return;
            }
            prev = temp;
            temp = temp->next;
        }

        if (temp == head)
        {
            if (temp->next == head)
            {
                delete head;
                head = nullptr;
            }
            else
            {
                prev = head;
                while (prev->next != head)
                    prev = prev->next;
                prev->next = head->next;
                delete head;
                head = prev->next;
            }
        }
        else
        {
            prev->next = temp->next;
            delete temp;
        }
    }

    void display()
    {
        if (head == nullptr)
        {
            cout << "List is empty." << endl;
            return;
        }

        Node *current = head;
        do
        {
            cout << current->data << " ";
            current = current->next;
        } while (current != head);
        cout << endl;
    }
};

int main()
{
    List l;

    for (int i = 1; i <= 9; ++i)
        l.insertAtEnd(i);

    cout << "Predefined circular linked list: ";
    l.display();

    int value, key;

    cout << "Enter a value to insert at the beginning: ";
    cin >> value;
    l.insertAtBeginning(value);

    cout << "Enter a value to insert at the end: ";
    cin >> value;
    l.insertAtEnd(value);

    cout << "Enter the key of the node to delete: ";
    cin >> key;
    l.deleteNode(key);

    cout << "Circular linked list after operations: ";
    l.display();

    return 0;
}