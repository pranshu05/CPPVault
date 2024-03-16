# Linked List

![Linked List](images/linkedlist.png)

Linked List is a list of nodes. Node has two parts, one part containing the data and the other part containing the address of the next node of the list.

```cpp
struct Node{
    int data; //4 bytes
    Node* next; //4 bytes
}
```

The first node is called the head node. The only information we keep for the list is the address of the head node. The address of the head node gives us access to the complete list. The address of the last node is NULL/0.

## Types of Linked List

-   Single Linked List: Navigation is forward only.
-   Doubly Linked List: Both Forward and Backward navigation is possible.
-   Circular Linked List: The last node is linked to the first node.

## Time Complexity

-   Access to nodes
    -   Proportional to the number of nodes.
    -   O(n)
-   Insert/ Delete
    -   O(n)

## Array vs Linked List

| Parameters                       | Array                                                     | Linked List                                           |
| -------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| **1. Cost of accessing a node:** | Constant Time. O(1)                                       | Proportional to number of nodes. O(n)                |
| **2. Memory requirements:**      | Fixed Size                                                | No unused memory. Extra memory for pointer variables |
|                                  | Sometimes memory may not be available as one larger block | Memory may be available as multiple small blocks     |
| **3. Cost of inserting a node:** |
| a. At the beginning              | O(n)                                                      | O(1)                                                 |
| b. At the end                    | O(1) if array is not full, else O(n)                      | O(n)                                                 |
| c. At ith position               | O(n)                                                      | O(n)                                                 |
| **4. Ease of use:**              | Easy                                                      | Not easy                                             |

## Implementation (Singly Linked List)

### Creating a Node

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {
    Node* head = nullptr;
    head = new Node();

    head->data = 1;
    head->next = nullptr;

    // Printing the node data
    cout << "Node data: " << head->data << endl;

    delete head; // Don't forget to free memory

    return 0;
}
```

Output:

```sh
Node data: 1
```

### Creating a Linked List

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {
    Node* head = nullptr;
    head = new Node();
    head->data = 1;
    head->next = nullptr;

    Node* second = new Node();
    second->data = 2;
    second->next = nullptr;
    head->next = second;

    Node* third = new Node();
    third->data = 3;
    third->next = nullptr;
    second->next = third;

    // Printing the linked list
    cout << "Linked List: ";
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;

    // Freeing memory
    delete head;
    delete second;
    delete third;

    return 0;
}
```

You can also achieve the same thing by:

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {
    Node* head = new Node{1, nullptr}; // Create first node and initialize its data
    Node* second = new Node{2, nullptr}; // Create second node and initialize its data
    Node* third = new Node{3, nullptr}; // Create third node and initialize its data

    // Link nodes
    head->next = second;
    second->next = third;

    // Printing the linked list
    cout << "Linked List: ";
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;

    // Freeing memory
    delete head;
    delete second;
    delete third;

    return 0;
}
```

output:

```sh
Linked List: 1 2 3
```

This method creates unnecessary pointers which creates memory that is not useful. Below is the most optimized method to create a Linked List.

```cpp
#include <iostream>
using namespace std;

struct Node{
    int data;
    Node* link;
};

int main(){
    Node* head = new Node();
    head->data = 1;
    head->link = nullptr;

    Node* current = new Node();
    current->data = 2;
    current->link = nullptr;
    head->link = current;

    current = new Node();
    current->data = 3;
    current->link = nullptr;

    head->link->link = current;

    return 0;
}
```

In this code, we are accessing the address of all the nodes of the list using the sequential link arrow function, so we need not create any extra pointers and move the head pointer.

### Traversing a single Linked List

It is a method to go through each node of a LinkedLit from the beginning until the end node is reached.

#### Count number of nodes in a Linked List

```cpp
#include<iostream>
using namespace std;

struct Node{
    int data;
    Node* link;
};

void countNodes(Node *head){
    int count = 0;
    if (head == nullptr)
        cout << "Linked List is empty!";
    Node* ptr = nullptr;
    ptr = head;
    while(ptr != nullptr){
        count++;
        ptr = ptr -> link;
    }
    cout << count;
}

int main(){
    countNodes(head); //assuming that a Linked List exist

    return 0;
}
```

#### Print the data of the list

```cpp
#include<iostream>
using namespace std;

struct Node{
    int data;
    Node* link;
}

void printData(Node* head){
    if(head == nullptr)
        cout << "List is empty!";
    Node* ptr = nullptr;
    ptr = head;

    while(ptr != nullptr){
        cout << ptr->data;
        ptr = ptr->link;
    }
}

int main(){
    printData(head);//assuming that a Linked List exist

    return 0;
}
```

### How to insert a node at the end of the list?

Let's say that there is a list containing 3 nodes, and there's a node that we want to insert. We will assign a temp pointer to the node which we want to insert at the end.

```cpp
#include<iostream>
using namespace std;

struct Node{
    int data;
    Node* link;
};

void insertAtEnd(Node* head, int data){
    Node* ptr, *temp;
    ptr = head;
    temp = new Node();

    temp -> data = data;
    temp -> link = nullptr;

    while(ptr -> link != nullptr){
        ptr = ptr -> link;
    }
    ptr->link = temp;
}

int main(){
    insertAtEnd(head, 123);

    return 0;
}
```

### Optimal code to create a Linked List using insertAtEnd function

```cpp
#include<iostream>
using namespace std;

struct Node{
    int data;
    Node* link;
};

Node* insertAtEnd(Node* ptr, int data){
    Node* temp = new Node();
    temp->data = data;
    temp->link = nullptr;

    ptr->link = temp;
    return temp;
}

int main(){
    Node* head = new Node();
    head->data = 1;
    head->link = nullptr;

    Node* ptr = head;
    ptr = insertAtEnd(ptr, 2);
    ptr = insertAtEnd(ptr, 3);
    ptr = insertAtEnd(ptr, 4);

    ptr = head;//move the pointer back to the head node after adding all the elements

    while(ptr != nullptr){
        cout << ptr->data;
        ptr = ptr->link;
    }

    return 0;
}
```

### How to insert a node at the beginning of the list?

Abstract code:

```cpp
ptr -> link = head;

head = ptr;
```

Here head is the first node of the list and ptr points to the node that we want to insert at the beginning.
