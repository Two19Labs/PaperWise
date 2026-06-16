export const questions = [
  // --- B.Sc CS Hons: Data Structures (bsc_2_3) ---
  {
    id: "ds_q1",
    subjectId: "bsc_2_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Trees",
    subtopic: "AVL Trees",
    marks: 15,
    text: "Explain the concept of AVL Trees. Show the step-by-step insertion of the following keys into an initially empty AVL tree: 10, 20, 30, 40, 50, 25. Clearly indicate the type of rotation (LL, RR, LR, RL) performed at each step to maintain the balance factor.",
    solution: "An AVL Tree is a self-balancing binary search tree where the height difference between the left and right subtrees (balance factor) of any node is at most 1. The balance factor is calculated as: \\(BF = \\text{height}(T_L) - \\text{height}(T_R)\\).\n\nStep-by-step insertion:\n1. Insert 10: Root node. (BF = 0)\n2. Insert 20: Right child of 10. (BF of 10 = -1)\n3. Insert 30: Right child of 20. Node 10 becomes unbalanced (BF = -2). Perform RR rotation (Left rotation at 10).\n   - Resulting tree: 20 is root, 10 is left child, 30 is right child.\n4. Insert 40: Right child of 30.\n5. Insert 50: Right child of 40. Node 30 becomes unbalanced (BF = -2). Perform RR rotation at 30.\n   - Resulting tree: 20 is root, left child is 10, right child is 40 (with children 30 and 50).\n6. Insert 25: Left child of 30. Unbalance occurs at root 20 (BF = -2). Perform RL rotation at root."
  },
  {
    id: "ds_q2",
    subjectId: "bsc_2_3",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Linked Lists",
    subtopic: "Singly Linked List",
    marks: 5,
    text: "Write a C++ function to reverse a singly linked list in-place using iterative approach. What is its time and space complexity?",
    solution: "An iterative reversing function requires three pointers: prev, curr, and next.\n\n```cpp\nvoid reverseList(Node*& head) {\n    Node* prev = nullptr;\n    Node* curr = head;\n    Node* next = nullptr;\n    while (curr != nullptr) {\n        next = curr->next; // save next node\n        curr->next = prev; // reverse pointer\n        prev = curr;       // move prev forward\n        curr = next;       // move curr forward\n    }\n    head = prev;\n}\n```\n- **Time Complexity:** O(N) since we traverse the list of N elements exactly once.\n- **Space Complexity:** O(1) as we only use a few temporary pointers."
  },
  {
    id: "ds_q3",
    subjectId: "bsc_2_3",
    year: 2023,
    type: "Long",
    difficulty: "Hard",
    topic: "Graphs",
    subtopic: "Minimum Spanning Tree",
    marks: 10,
    text: "Given a weighted undirected graph, state and explain Kruskal's algorithm to find the Minimum Spanning Tree (MST). Illustrate it with an example of 5 vertices and 7 edges, showing how the Disjoint Set Union (DSU) data structure prevents cycle formation.",
    solution: "Kruskal's Algorithm is a greedy algorithm that finds an MST by sorting all edges by weight and adding them one by one if they don't form a cycle. DSU tracks connected components via `find` and `union` operations.\n\nExample implementation:\nSort edges: (A,B,1), (B,C,2), (A,C,3), (C,D,4), (B,D,5), (D,E,6), (C,E,7).\n1. Select (A,B,1): Add to MST. DSU parent: A and B are grouped.\n2. Select (B,C,2): Add to MST. DSU parent: A, B, C are grouped.\n3. Select (A,C,3): A and C have the same representative root in DSU. Adding this edge would form a cycle (A-B-C-A). Reject edge.\n4. Select (C,D,4): Add to MST. Group is A,B,C,D.\n5. Select (D,E,6): Add to MST. Group is A,B,C,D,E. All vertices connected. Return MST."
  },
  {
    id: "ds_q4",
    subjectId: "bsc_2_3",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Stacks",
    subtopic: "Infix to Postfix",
    marks: 5,
    text: "Convert the infix expression \\( A + B * (C - D) / E \\) to its postfix equivalent using stack operations. Show the status of the stack and the output string after processing each character.",
    solution: "Operator precedence: Parentheses > Multi/Div > Add/Sub. Right-associative or left-associative rules apply.\n\nTable showing steps:\n- 'A': Output 'A', Stack empty\n- '+': Push '+', Stack [+], Output 'A'\n- 'B': Output 'AB', Stack [+]\n- '*': Precedence of * is higher than +. Push *. Stack [+, *], Output 'AB'\n- '(': Push '('. Stack [+, *, (], Output 'AB'\n- 'C': Output 'ABC', Stack [+, *, (]\n- '-': Push '-'. Stack [+, *, (, -], Output 'ABC'\n- 'D': Output 'ABCD', Stack [+, *, (, -]\n- ')': Pop until '('. Pop '-' and output. Pop '('. Stack [+, *], Output 'ABCD-'\n- '/': Pop '*'. Precedence of / is same as *. Pop * and output. Push /. Stack [+, /], Output 'ABCD-*'\n- 'E': Output 'ABCD-*E', Stack [+, /]\n- End: Pop remaining. Output 'ABCD-*E/+'"
  },
  {
    id: "ds_q5",
    subjectId: "bsc_2_3",
    year: 2022,
    type: "Numerical",
    difficulty: "Medium",
    topic: "Queues",
    subtopic: "Circular Queue",
    marks: 5,
    text: "Consider a circular queue of capacity 6 (represented as an array of size 6, indices 0 to 5). Perform the following operations: enqueue(10), enqueue(20), dequeue(), enqueue(30), enqueue(40), dequeue(), enqueue(50), enqueue(60), enqueue(70). What are the positions of the Front and Rear pointers after these operations?",
    solution: "Initially Front = -1, Rear = -1. Array capacity N = 6.\n1. Enqueue(10): F=0, R=0, Array=[10, _, _, _, _, _]\n2. Enqueue(20): F=0, R=1, Array=[10, 20, _, _, _, _]\n3. Dequeue(): F=1, R=1, Array=[_, 20, _, _, _, _] (10 is removed)\n4. Enqueue(30): F=1, R=2, Array=[_, 20, 30, _, _, _]\n5. Enqueue(40): F=1, R=3, Array=[_, 20, 30, 40, _, _]\n6. Dequeue(): F=2, R=3, Array=[_, _, 30, 40, _, _] (20 is removed)\n7. Enqueue(50): F=2, R=4, Array=[_, _, 30, 40, 50, _]\n8. Enqueue(60): F=2, R=5, Array=[_, _, 30, 40, 50, 60]\n9. Enqueue(70): Rear wraps around: R = (5 + 1) % 6 = 0. Since Array[0] is empty, insert 70. F=2, R=0, Array=[70, _, 30, 40, 50, 60].\n\nFinal positions: **Front = 2, Rear = 0**."
  },
  {
    id: "ds_q6",
    subjectId: "bsc_2_3",
    year: 2022,
    type: "Long",
    difficulty: "Medium",
    topic: "Sorting",
    subtopic: "Quick Sort",
    marks: 10,
    text: "Explain the partition strategy used in Quick Sort (Lomuto vs Hoare). Write pseudo-code for Hoare's partition scheme and trace it on the array [8, 4, 9, 2, 5, 3] using the first element as pivot.",
    solution: "Lomuto partition uses a single index to scan, whereas Hoare partition uses two pointers starting from both ends and moving towards each other, exchanging elements out of order with respect to the pivot. Hoare is generally more efficient with fewer swaps.\n\nPseudo-code:\n```cpp\nint partition(int arr[], int low, int high) {\n    int pivot = arr[low];\n    int i = low - 1, j = high + 1;\n    while (true) {\n        do { i++; } while (arr[i] < pivot);\n        do { j--; } while (arr[j] > pivot);\n        if (i >= j) return j;\n        swap(arr[i], arr[j]);\n    }\n}\n```\nTrace on [8, 4, 9, 2, 5, 3] (pivot = 8):\n- Pointers start at indices i=-1, j=6.\n- i stops at 8 (idx 0), j stops at 3 (idx 5). Swap: [3, 4, 9, 2, 5, 8].\n- i stops at 9 (idx 2), j stops at 5 (idx 4). Swap: [3, 4, 5, 2, 9, 8].\n- i stops at 9 (idx 4), j stops at 2 (idx 3). Since i >= j (4 >= 3), return j = 3.\n- Partition splits at index 3: [3, 4, 5, 2] and [9, 8]."
  },

  // --- B.Com Hons: Financial Accounting (bch_1_2) ---
  {
    id: "fa_q1",
    subjectId: "bch_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Depreciation",
    subtopic: "Written Down Value",
    marks: 15,
    text: "On 1st April 2021, a firm purchased machinery for ₹2,00,000. On 1st October 2022, additional machinery was purchased for ₹1,00,000. On 1st July 2023, the machinery purchased on 1st April 2021 was sold for ₹1,20,000. Depreciation is charged @ 10% p.a. on the Written Down Value (WDV) method. Accounts are closed on 31st March every year. Prepare the Machinery Account for three years (2021-22 to 2023-24).",
    solution: "Let's perform the ledger calculations:\n\n**Year 1 (2021-22):**\n- Opening: ₹2,00,000 (1st Apr 2021)\n- Depreciation (10% of 2L for 1 yr): ₹20,000\n- Closing Balance on 31st Mar 2022: ₹1,80,000\n\n**Year 2 (2022-23):**\n- Opening: Mach-1 = ₹1,80,000\n- Purchase: Mach-2 = ₹1,00,000 (1st Oct 2022)\n- Depreciation:\n  - Mach-1: ₹18,000 (10% of 1.8L for 1 yr)\n  - Mach-2: ₹5,000 (10% of 1L for 6 months)\n  - Total Depreciation: ₹23,000\n- Closing Balances on 31st Mar 2023: Mach-1 = ₹1,62,000, Mach-2 = ₹95,000. Total = ₹2,57,000\n\n**Year 3 (2023-24):**\n- Sale of Mach-1 on 1st July 2023:\n  - Depreciation on Mach-1 for 3 months (Apr-Jun): ₹1,62,000 * 10% * 3/12 = ₹4,050\n  - Book value on sale date: ₹1,62,000 - ₹4,050 = ₹1,57,950\n  - Sale value: ₹1,20,000\n  - Loss on sale: ₹1,57,950 - ₹1,20,000 = ₹37,950\n- Closing Mach-2: Depreciation = ₹95,000 * 10% = ₹9,500. Closing balance = ₹85,500."
  },
  {
    id: "fa_q2",
    subjectId: "bch_1_2",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Accounting Principles",
    subtopic: "Going Concern Concept",
    marks: 5,
    text: "Explain the 'Going Concern Concept' and discuss how it affects the valuation of fixed assets in financial reporting.",
    solution: "The Going Concern Concept assumes that a business entity will continue its operations for the foreseeable future and has neither the intention nor the necessity to liquidate. Because of this concept, fixed assets are recorded at historical cost less accumulated depreciation rather than their net realizable values (market liquidation values), as there is no plan to sell them immediately."
  },
  {
    id: "fa_q3",
    subjectId: "bch_1_2",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "Consignment",
    subtopic: "Valuation of Unsold Stock",
    marks: 10,
    text: "A of Delhi consigned 100 cases of goods costing ₹1,000 each to B of Mumbai, paying ₹5,000 for freight and insurance. B took delivery and spent ₹2,000 on clearing charges and octroi, and ₹1,500 on godown rent and advertisement. B sold 80 cases at ₹1,500 each. Prepare Consignment Account and calculate the value of unsold stock.",
    solution: "Valuation of Unsold Stock (20 cases):\n- Cost price of 20 cases: 20 * ₹1,000 = ₹20,000\n- Add: Proportional non-recurring expenses of Consignor: ₹5,000 * (20/100) = ₹1,000\n- Add: Proportional non-recurring expenses of Consignee (clearing & octroi): ₹2,000 * (20/100) = ₹400\n  *(Note: Godown rent and advertisement are recurring and excluded from stock valuation)*\n- Total value of unsold stock = ₹20,000 + ₹1,000 + ₹400 = **₹21,400**.\n\nConsignment Profit:\n- Sales (80 * 1500): ₹1,20,000\n- Unsold Stock: ₹21,400\n- Total Credits: ₹1,41,400\n- Debits: Cost (1L) + Consignor Exp (5K) + Consignee Exp (3.5K) = ₹1,08,500\n- Profit on Consignment: ₹1,41,400 - ₹1,08,500 = **₹32,900**."
  },
  {
    id: "fa_q4",
    subjectId: "bch_1_2",
    year: 2022,
    type: "Long",
    difficulty: "Hard",
    topic: "Partnership Accounts",
    subtopic: "Dissolution and Piecemeal",
    marks: 15,
    text: "X, Y and Z are partners sharing profits in the ratio 3:2:1. On dissolution of the firm, assets are realized in installments. Discuss the 'Maximum Loss Method' of piecemeal distribution. How does it differ from the 'Surplus Capital Method'?",
    solution: "Under the Maximum Loss Method, at each installment, it is assumed that no further assets will realize. The total book value of remaining unrealized assets is treated as a loss, which is distributed among partners in their profit-sharing ratio. If any partner's capital becomes negative, it is allocated to other partners using the rule in Garner vs. Murray. Under the Surplus Capital Method, payments are made based on priority of surplus capital calculated relative to profit sharing ratios. Maximum Loss is calculated at every stage dynamically."
  },

  // --- B.A. Hons Economics: Introductory Microeconomics (bae_1_1) ---
  {
    id: "me_q1",
    subjectId: "bae_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Consumer Theory",
    subtopic: "Indifference Curves",
    marks: 10,
    text: "What is an Indifference Curve (IC)? Prove that two indifference curves cannot intersect each other. Use appropriate diagrammatic illustrations and explain the assumption of transitivity.",
    solution: "An Indifference Curve shows combinations of two goods that give the consumer equal satisfaction. To prove they cannot intersect:\nAssume two ICs (IC1 and IC2) intersect at point A. Let point B be on IC1 and point C be on IC2.\n1. Since A and B are on IC1, consumer is indifferent: \\(A \\sim B\\).\n2. Since A and C are on IC2, consumer is indifferent: \\(A \\sim C\\).\n3. By transitivity, it must hold that \\(B \\sim C\\).\nHowever, looking at the graph, point C represents more of both goods compared to B. Thus, \\(C \\succ B\\), which contradicts \\(B \\sim C\\). Hence, ICs cannot intersect."
  },
  {
    id: "me_q2",
    subjectId: "bae_1_1",
    year: 2024,
    type: "Numerical",
    difficulty: "Hard",
    topic: "Market Structure",
    subtopic: "Monopoly Equilibrium",
    marks: 10,
    text: "A monopolist faces the market demand curve \\( P = 100 - 2Q \\). The cost function is \\( C(Q) = 20Q + Q^2 \\). Find the profit-maximizing level of output \\( Q^* \\), the market price \\( P^* \\), and the monopolist's total profit. Calculate the Deadweight Loss (DWL) compared to a perfectly competitive market.",
    solution: "For monopolist equilibrium: MR = MC.\n- Demand: \\( P = 100 - 2Q \\)\n- Total Revenue (TR): \\( P \\times Q = 100Q - 2Q^2 \\)\n- Marginal Revenue (MR): \\( \\frac{dTR}{dQ} = 100 - 4Q \\)\n- Cost: \\( C(Q) = 20Q + Q^2 \\)\n- Marginal Cost (MC): \\( \\frac{dC}{dQ} = 20 + 2Q \\)\n\nSetting MR = MC:\n\\( 100 - 4Q = 20 + 2Q \\implies 80 = 6Q \\implies Q^* = 13.33 \\)\nPrice: \\( P^* = 100 - 2(13.33) = ₹73.34 \\)\nProfit: \\( TR - C = (73.34 \\times 13.33) - [20(13.33) + (13.33)^2] = 977.6 - 444.4 = ₹533.2 \\)\n\nFor Perfect Competition: P = MC.\n\\( 100 - 2Q = 20 + 2Q \\implies 80 = 4Q \\implies Q_c = 20 \\), and \\( P_c = ₹60 \\).\nDeadweight Loss = \\( 0.5 \\times (P^* - MC(Q^*)) \\times (Q_c - Q^*) \\). Since \\( MC(13.33) = 20 + 26.66 = 46.66 \\).\n\\( DWL = 0.5 \\times (73.34 - 46.66) \\times (20 - 13.33) = 0.5 \\times 26.68 \\times 6.67 = ₹88.98 \\)."
  },
  {
    id: "me_q3",
    subjectId: "bae_1_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Elasticity",
    subtopic: "Price Elasticity of Demand",
    marks: 5,
    text: "Define Price Elasticity of Demand. Explain why the elasticity changes along a linear downward-sloping demand curve from infinity at the Y-intercept to zero at the X-intercept.",
    solution: "Price Elasticity of Demand measures the responsiveness of quantity demanded to a change in price: \\( \\epsilon = \\frac{dQ}{dP} \\times \\frac{P}{Q} \\). Along a linear demand curve \\( Q = a - bP \\), the slope \\( \\frac{dQ}{dP} = -b \\) is constant. However, the ratio \\( \\frac{P}{Q} \\) varies. At the Y-intercept, Q=0, so elasticity is infinite. At the X-intercept, P=0, so elasticity is 0. At the midpoint, elasticity is 1."
  }
];
