export const questions = [
  // --- B.Sc. Comp Science: Data Structures (csc_2_3) ---
  {
    id: "ds_q1",
    subjectId: "csc_2_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Trees",
    subtopic: "AVL Trees",
    marks: 15,
    text: "Explain the concept of AVL Trees. Show the step-by-step insertion of the following keys into an initially empty AVL tree: 10, 20, 30, 40, 50, 25. Clearly indicate the type of rotation (LL, RR, LR, RL) performed at each step to maintain the balance factor.",
    solution: "An AVL Tree is a self-balancing binary search tree where the height difference between the left and right subtrees (balance factor) of any node is at most 1. The balance factor is calculated as: BF = height(left) - height(right).\n\nStep-by-step insertion:\n1. Insert 10: Root node. (BF = 0)\n2. Insert 20: Right child of 10. (BF of 10 = -1)\n3. Insert 30: Right child of 20. Node 10 becomes unbalanced (BF = -2). Perform RR rotation (Left rotation at 10).\n   - Resulting tree: 20 is root, 10 is left child, 30 is right child.\n4. Insert 40: Right child of 30.\n5. Insert 50: Right child of 40. Node 30 becomes unbalanced (BF = -2). Perform RR rotation at 30.\n   - Resulting tree: 20 is root, left child is 10, right child is 40 (with children 30 and 50).\n6. Insert 25: Left child of 30. Unbalance occurs at root 20 (BF = -2). Perform RL rotation at root."
  },
  {
    id: "ds_q2",
    subjectId: "csc_2_3",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Linked Lists",
    subtopic: "Singly Linked List",
    marks: 5,
    text: "Write a C++ function to reverse a singly linked list in-place using iterative approach. What is its time and space complexity?",
    solution: "An iterative reversing function requires three pointers: prev, curr, and next.\n\n```cpp\nvoid reverseList(Node*& head) {\n    Node* prev = nullptr;\n    Node* curr = head;\n    Node* next = nullptr;\n    while (curr != nullptr) {\n        next = curr->next; // save next node\n        curr->next = prev; // reverse pointer\n        prev = curr;       // move prev forward\n        curr = next;       // move curr forward\n    }\n    head = prev;\n}\n```\n- Time Complexity: O(N) since we traverse the list of N elements exactly once.\n- Space Complexity: O(1) as we only use a few temporary pointers."
  },
  {
    id: "ds_q3",
    subjectId: "csc_2_3",
    year: 2023,
    type: "Long",
    difficulty: "Hard",
    topic: "Graphs",
    subtopic: "Minimum Spanning Tree",
    marks: 10,
    text: "Given a weighted undirected graph, state and explain Kruskal's algorithm to find the Minimum Spanning Tree (MST). Illustrate it with an example of 5 vertices and 7 edges, showing how the Disjoint Set Union (DSU) data structure prevents cycle formation.",
    solution: "Kruskal's Algorithm is a greedy algorithm that finds an MST by sorting all edges by weight and adding them one by one if they don't form a cycle. DSU tracks connected components via find and union operations.\n\nExample implementation:\nSort edges: (A,B,1), (B,C,2), (A,C,3), (C,D,4), (B,D,5), (D,E,6), (C,E,7).\n1. Select (A,B,1): Add to MST. DSU parent: A and B are grouped.\n2. Select (B,C,2): Add to MST. DSU parent: A, B, C are grouped.\n3. Select (A,C,3): A and C have the same representative root in DSU. Adding this edge would form a cycle. Reject edge.\n4. Select (C,D,4): Add to MST. Group is A,B,C,D.\n5. Select (D,E,6): Add to MST. Group is A,B,C,D,E. All vertices connected. Return MST."
  },

  // --- BMS/BBA(FIA): Financial Accounting & Analysis (bms_1_2 / fia_1_1) ---
  {
    id: "fa_q1_bms",
    subjectId: "bms_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Depreciation",
    subtopic: "Written Down Value",
    marks: 15,
    text: "On 1st April 2021, a firm purchased machinery for ₹2,00,000. On 1st October 2022, additional machinery was purchased for ₹1,00,000. On 1st July 2023, the machinery purchased on 1st April 2021 was sold for ₹1,20,000. Depreciation is charged @ 10% p.a. on the Written Down Value (WDV) method. Prepare the Machinery Account for three years (2021-22 to 2023-24).",
    solution: "Let's perform the ledger calculations:\n\nYear 1 (2021-22):\n- Opening: ₹2,00,000 (1st Apr 2021)\n- Depreciation (10% of 2L for 1 yr): ₹20,000\n- Closing Balance on 31st Mar 2022: ₹1,80,000\n\nYear 2 (2022-23):\n- Opening: Mach-1 = ₹1,80,000\n- Purchase: Mach-2 = ₹1,00,000 (1st Oct 2022)\n- Depreciation:\n  - Mach-1: ₹18,000 (10% of 1.8L for 1 yr)\n  - Mach-2: ₹5,000 (10% of 1L for 6 months)\n  - Total Depreciation: ₹23,000\n- Closing Balances on 31st Mar 2023: Mach-1 = ₹1,62,000, Mach-2 = ₹95,000. Total = ₹2,57,000\n\nYear 3 (2023-24):\n- Sale of Mach-1 on 1st July 2023:\n  - Depreciation on Mach-1 for 3 months (Apr-Jun): ₹1,62,000 * 10% * 3/12 = ₹4,050\n  - Book value on sale date: ₹1,62,000 - ₹4,050 = ₹1,57,950\n  - Sale value: ₹1,20,000\n  - Loss on sale: ₹1,57,950 - ₹1,20,000 = ₹37,950\n- Closing Mach-2: Depreciation = ₹95,000 * 10% = ₹9,500. Closing balance = ₹85,500."
  },
  {
    id: "fa_q1_fia",
    subjectId: "fia_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Depreciation",
    subtopic: "Written Down Value",
    marks: 15,
    text: "On 1st April 2021, a firm purchased machinery for ₹2,00,000. On 1st October 2022, additional machinery was purchased for ₹1,00,000. On 1st July 2023, the machinery purchased on 1st April 2021 was sold for ₹1,20,000. Depreciation is charged @ 10% p.a. on the Written Down Value (WDV) method. Prepare the Machinery Account for three years (2021-22 to 2023-24).",
    solution: "Refer to identical WDV deprecation schedules (BMS & BBA/FIA share common foundational concepts). Machinery cost base is amortized at 10% on declining balances. Loss realized on 1st July 2023 is ₹37,950."
  },
  {
    id: "fa_q2_bms",
    subjectId: "bms_1_2",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Accounting Principles",
    subtopic: "Going Concern Concept",
    marks: 5,
    text: "Explain the 'Going Concern Concept' and discuss how it affects the valuation of fixed assets in financial reporting.",
    solution: "The Going Concern Concept assumes that a business entity will continue its operations for the foreseeable future. Assets are recorded at historical cost less accumulated depreciation rather than liquidation values, since there is no intention of immediate sale."
  },

  // --- BMS/BBA(FIA): Microeconomics (bms_1_1 / fia_1_2) ---
  {
    id: "me_q1_bms",
    subjectId: "bms_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Consumer Theory",
    subtopic: "Indifference Curves",
    marks: 10,
    text: "What is an Indifference Curve (IC)? Prove that two indifference curves cannot intersect each other. Use appropriate diagrammatic illustrations and explain the assumption of transitivity.",
    solution: "An Indifference Curve shows combinations of two goods that give the consumer equal satisfaction. If two ICs intersected, it would violate the transitivity axiom of consumer preference, leading to the contradiction that a larger basket is indifferent to a smaller basket."
  },
  {
    id: "me_q1_fia",
    subjectId: "fia_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Consumer Theory",
    subtopic: "Indifference Curves",
    marks: 10,
    text: "What is an Indifference Curve (IC)? Prove that two indifference curves cannot intersect each other. Use appropriate diagrammatic illustrations and explain the assumption of transitivity.",
    solution: "See identical consumer theory proof. Intersection violates transitivity axioms."
  }
];
