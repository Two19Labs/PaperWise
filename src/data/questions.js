export const questions = [
  // ==========================================
  // B.Sc. HONS COMPUTER SCIENCE (csc_*)
  // ==========================================
  // csc_1_1: Programming using Python
  {
    id: "csc_1_1_q1",
    subjectId: "csc_1_1",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "List Comprehensions",
    subtopic: "Syntax and Efficiency",
    marks: 5,
    text: "Explain the syntax and performance benefits of List Comprehensions in Python. Write a list comprehension to generate the squares of all even numbers from $1$ to $N$.",
    solution: "List comprehensions offer a concise syntax for creating lists. The general formula is: \n`[expression for item in iterable if condition]`\n\nFor squares of even numbers:\n```python\neven_squares = [x**2 for x in range(1, N + 1) if x % 2 == 0]\n```\nIt is faster than a standard `for` loop because the looping is performed at C-speed inside the Python interpreter, reducing bytecode overhead."
  },
  {
    id: "csc_1_1_q2",
    subjectId: "csc_1_1",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "Recursion",
    subtopic: "Fibonacci Sequence",
    marks: 10,
    text: "Write a recursive Python function to compute the $n$-th Fibonacci number defined by $F_n = F_{n-1} + F_{n-2}$ with base cases $F_0 = 0$ and $F_1 = 1$. What is its time complexity, and how can we optimize it to $O(n)$ using dynamic programming?",
    solution: "The naive recursive function is:\n```python\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n```\nIts time complexity is $O(2^n)$ because it generates a binary recursion tree. \n\nWe can optimize it to $O(n)$ time and $O(n)$ space using memoization:\n```python\ndef fib_memo(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\n```"
  },
  // csc_1_2: Computer System Architecture
  {
    id: "csc_1_2_q1",
    subjectId: "csc_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Computer Arithmetic",
    subtopic: "Two's Complement",
    marks: 10,
    text: "Perform the subtraction of $(9)_{10}$ from $(4)_{10}$ using 8-bit registers in two's complement representation. Show all binary arithmetic steps.",
    solution: "Convert numbers to 8-bit binary:\n$(4)_{10} = 00000100_2$\n$(9)_{10} = 00001001_2$\n\nFind two's complement of $+9$:\n1. One's complement of $+9$: $11110110_2$\n2. Add $1$: $11110111_2$ (which represents $-9$)\n\nPerform addition: $4 + (-9)$:\n$$\\begin{array}{r@{\\quad}l}\n  00000100 & (+4) \\\\\n+ 11110111 & (-9) \\\\\n\\hline\n  11111011 & (-5)_{10}\n\\end{array}$$\n\nTo verify $11111011_2$ is $-5$:\nOne's complement: $00000100_2$, add $1 \\implies 00000101_2 = (5)_{10}$. Hence, result is correct."
  },
  {
    id: "csc_1_2_q2",
    subjectId: "csc_1_2",
    year: 2022,
    type: "Short",
    difficulty: "Hard",
    topic: "Cache Memory",
    subtopic: "Average Access Time",
    marks: 5,
    text: "A system has cache access time $T_c = 2\\text{ ns}$ and main memory access time $T_m = 80\\text{ ns}$. If the cache hit ratio is $H = 0.95$, calculate the average memory access time $T_{\\text{avg}}$.",
    solution: "The formula for average memory access time is:\n$$T_{\\text{avg}} = H \\cdot T_c + (1-H) \\cdot T_m$$\n\nSubstitute the given values:\n$$T_{\\text{avg}} = 0.95 \\cdot 2\\text{ ns} + (1 - 0.95) \\cdot 80\\text{ ns}$$\n$$T_{\\text{avg}} = 1.9\\text{ ns} + 0.05 \\cdot 80\\text{ ns}$$\n$$T_{\\text{avg}} = 1.9\\text{ ns} + 4.0\\text{ ns} = 5.9\\text{ ns}$$\n\nThe average memory access time is $5.9\\text{ ns}$."
  },
  // csc_1_3: Mathematics for Computing
  {
    id: "csc_1_3_q1",
    subjectId: "csc_1_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Graph Theory",
    subtopic: "Handshaking Lemma",
    marks: 10,
    text: "State and prove the Handshaking Lemma for an undirected graph $G = (V, E)$. Show that every graph has an even number of vertices of odd degree.",
    solution: "The Handshaking Lemma states that for any graph $G = (V, E)$:\n$$\\sum_{v \\in V} \\deg(v) = 2|E|$$\n\n**Proof:** Every edge $e = \\{u, v\\} \\in E$ contributes exactly $1$ to $\\deg(u)$ and $1$ to $\\deg(v)$. Hence, summing the degrees counts each edge exactly twice.\n\nNow partition $V$ into $V_{\\text{even}}$ and $V_{\\text{odd}}$:\n$$\\sum_{v \\in V_{\\text{even}}} \\deg(v) + \\sum_{v \\in V_{\\text{odd}}} \\deg(v) = 2|E|$$\n\nSince $\\sum_{v \\in V_{\\text{even}}} \\deg(v)$ is even and $2|E|$ is even, the sum $\\sum_{v \\in V_{\\text{odd}}} \\deg(v)$ must be even. A sum of odd numbers is even if and only if the number of terms is even. Thus, $|V_{\\text{odd}}|$ must be even."
  },
  {
    id: "csc_1_3_q2",
    subjectId: "csc_1_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Probability",
    subtopic: "Bayes Theorem",
    marks: 5,
    text: "State Bayes' Theorem. If $P(A) = 0.4$, $P(B|A) = 0.9$, and $P(B|A') = 0.2$, calculate the posterior probability $P(A|B)$.",
    solution: "Bayes' Theorem states:\n$$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$\n\nFirst, calculate $P(B)$ using the Law of Total Probability:\n$$P(B) = P(B|A)P(A) + P(B|A')P(A')$$\n$$P(B) = (0.9)(0.4) + (0.2)(1 - 0.4) = 0.36 + 0.12 = 0.48$$\n\nNow apply Bayes' Theorem:\n$$P(A|B) = \\frac{0.36}{0.48} = 0.75$$"
  },
  // csc_2_1: Object Oriented Programming in C++
  {
    id: "csc_2_1_q1",
    subjectId: "csc_2_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    marks: 10,
    text: "Explain runtime polymorphism in C++ using virtual functions. Illustrate with a code example showing how base class pointers invoke derived class overrides.",
    solution: "Runtime polymorphism is achieved via virtual functions. The base class declares a function as `virtual`, and C++ resolves calls dynamically using a VTable at runtime.\n\n```cpp\nclass Base {\npublic:\n    virtual void display() { cout << \"Base display\"; }\n};\nclass Derived : public Base {\npublic:\n    void display() override { cout << \"Derived display\"; }\n};\n\nint main() {\n    Base* ptr = new Derived();\n    ptr->display(); // Output: Derived display\n    delete ptr;\n}\n```"
  },
  {
    id: "csc_2_1_q2",
    subjectId: "csc_2_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Operator Overloading",
    subtopic: "Binary Operators",
    marks: 5,
    text: "Write a C++ signature and code snippet to overload the binary addition operator $+$ for a user-defined class `Complex` to add two complex numbers representing $a + ib$.",
    solution: "Inside class declaration:\n```cpp\nclass Complex {\nprivate:\n    double real, imag;\npublic:\n    Complex(double r=0, double i=0) : real(r), imag(i) {}\n    Complex operator + (const Complex& obj) const {\n        return Complex(real + obj.real, imag + obj.imag);\n    }\n};\n```"
  },
  // csc_2_2: Discrete Mathematical Structures
  {
    id: "csc_2_2_q1",
    subjectId: "csc_2_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Induction",
    subtopic: "Mathematical Induction",
    marks: 15,
    text: "Prove by mathematical induction that for all integers $n \\ge 1$:\n$$\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$$",
    solution: "**Base Case ($n=1$):**\nLHS: $1^2 = 1$\nRHS: $\\frac{1(1+1)(2(1)+1)}{6} = \\frac{6}{6} = 1$. True.\n\n**Inductive Hypothesis:** Assume true for $n=k$:\n$$\\sum_{i=1}^k i^2 = \\frac{k(k+1)(2k+1)}{6}$$\n\n**Inductive Step:** Show true for $n=k+1$:\n$$\\sum_{i=1}^{k+1} i^2 = \\left( \\sum_{i=1}^k i^2 \\right) + (k+1)^2 = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2$$\nFactor out $(k+1)$:\n$$= (k+1) \\left[ \\frac{k(2k+1)}{6} + (k+1) \\right] = (k+1) \\left[ \\frac{2k^2 + k + 6k + 6}{6} \\right]$$\n$$= \\frac{(k+1)(2k^2 + 7k + 6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$$\n\nThis matches the RHS formula for $n=k+1$. Hence, the proof is complete."
  },
  {
    id: "csc_2_2_q2",
    subjectId: "csc_2_2",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Combinatorics",
    subtopic: "Inclusion Exclusion Principle",
    marks: 5,
    text: "Find the number of integers between $1$ and $100$ (inclusive) that are divisible by either $3$ or $5$ using the Principle of Inclusion-Exclusion.",
    solution: "Let $A$ be the set of integers divisible by $3$, and $B$ be those divisible by $5$.\n$$|A| = \\lfloor 100 / 3 \\rfloor = 33$$\n$$|B| = \\lfloor 100 / 5 \\rfloor = 20$$\n\n$A \\cap B$ are integers divisible by $\\text{lcm}(3, 5) = 15$:\n$$|A \\cap B| = \\lfloor 100 / 15 \\rfloor = 6$$\n\nBy Inclusion-Exclusion Principle:\n$$|A \\cup B| = |A| + |B| - |A \\cap B| = 33 + 20 - 6 = 47$$"
  },
  // csc_2_3: Data Structures
  {
    id: "csc_2_3_q1",
    subjectId: "csc_2_3",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Trees",
    subtopic: "AVL Trees",
    marks: 12,
    text: "Insert keys $10, 20, 30, 15$ in an empty AVL tree. Sketch balance factors and show details of the rotation needed to rebalance the tree.",
    solution: "1. Insert 10: BF=0.\n2. Insert 20: 10 has BF=-1.\n3. Insert 30: 10 has BF=-2. Perform RR (Left) rotation around 10.\n   - Root becomes 20, with children 10 (left) and 30 (right).\n4. Insert 15: Left child of 20, right child of 10. BF of 20 is $+1$, BF of 10 is $-1$. Tree remains balanced (BF within $[-1, 1]$)."
  },
  {
    id: "csc_2_3_q2",
    subjectId: "csc_2_3",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Linked Lists",
    subtopic: "Reverse List",
    marks: 5,
    text: "Provide the iterative function to reverse a singly linked list in C++. State its time and space complexity.",
    solution: "```cpp\nNode* reverse(Node* head) {\n    Node* prev = nullptr; Node* curr = head; Node* next = nullptr;\n    while (curr) {\n        next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}\n```\n- Time Complexity: $O(n)$ where $n$ is list size.\n- Space Complexity: $O(1)$ auxiliary space."
  },
  // csc_3_1: Database Management Systems
  {
    id: "csc_3_1_q1",
    subjectId: "csc_3_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Normalisation",
    subtopic: "BCNF decomposition",
    marks: 15,
    text: "Given a schema $R(A, B, C, D, E)$ with functional dependencies $F = \\{ A \\rightarrow B, B \\rightarrow C, C \\rightarrow D, D \\rightarrow E \\}$. Determine the primary key and decompose into BCNF.",
    solution: "The candidate key is $A$ since its closure is $A^+ = \\{A, B, C, D, E\\}$.\n\nThe FDs violate BCNF because the LHS of $B \\rightarrow C$, $C \\rightarrow D$, and $D \\rightarrow E$ are not superkeys.\n\nDecomposition:\n1. Decompose using $A \\rightarrow B$: $R_1(A, B)$ and $R_2(A, C, D, E)$.\n2. Decompose $R_2$ using $B \\rightarrow C$ (since $B$ was key of $R_1$, wait, FD is $C \\rightarrow D$): $R_3(C, D)$ and $R_4(A, C, E)$.\n3. Continue until all FDs hold as superkeys: $R_1(A,B), R_2(B,C), R_3(C,D), R_4(D,E)$ which are all in BCNF."
  },
  {
    id: "csc_3_1_q2",
    subjectId: "csc_3_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Relational Algebra",
    subtopic: "Selections",
    marks: 5,
    text: "Write a relational algebra expression to select all rows from relations $R$ and $S$ where $R.A = S.A$ and $R.B > 20$.",
    solution: "$$\\sigma_{R.B > 20} (R \\bowtie_{R.A = S.A} S)$$"
  },
  // csc_3_2: Operating Systems
  {
    id: "csc_3_2_q1",
    subjectId: "csc_3_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Deadlocks",
    subtopic: "Banker's Algorithm",
    marks: 10,
    text: "Consider a system with 3 processes and 3 resource types. State the Banker's deadlock safety algorithm condition for safe sequence calculation.",
    solution: "Safety algorithm: Let $\\text{Work} = \\text{Available}$ and $\\text{Finish}[i] = \\text{false}$ for all processes. Find a process $P_i$ such that:\n1. $\\text{Finish}[i] == \\text{false}$\n2. $\\text{Need}_i \\le \\text{Work}$\nIf found, update $\\text{Work} = \\text{Work} + \\text{Allocation}_i$, set $\\text{Finish}[i] = \\text{true}$. Repeat. If all processes are finished, the system is in a safe state."
  },
  {
    id: "csc_3_2_q2",
    subjectId: "csc_3_2",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Scheduling",
    subtopic: "Average Waiting Time",
    marks: 5,
    text: "Three processes arrive at $t=0$ with burst times $10, 5, 8\\text{ ms}$. Under FCFS, what is the average waiting time?",
    solution: "Waiting times:\n$P_1 = 0\\text{ ms}$\n$P_2 = 10\\text{ ms}$\n$P_3 = 10 + 5 = 15\\text{ ms}$\n\n$$\\text{Average Waiting Time} = \\frac{0 + 10 + 15}{3} = \\frac{25}{3} = 8.33\\text{ ms}$$"
  },
  // csc_3_3: Computer Networks
  {
    id: "csc_3_3_q1",
    subjectId: "csc_3_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Flow Control",
    subtopic: "Sliding Window Efficiency",
    marks: 10,
    text: "Derive sliding window protocol efficiency $\\eta$. Let propagation delay be $T_p$, transmission delay be $T_t$, and window size be $W$.",
    solution: "Total cycle time is $T_t + 2 T_p$.\nDuring this cycle, we transmit $W$ frames.\n$$\\eta = \\frac{W \\cdot T_t}{T_t + 2 T_p} = \\frac{W}{1 + 2 a}$$\nwhere $a = T_p / T_t$. For maximum utilization, $W \\ge 1 + 2a$ yields $\\eta = 1.0$."
  },
  {
    id: "csc_3_3_q2",
    subjectId: "csc_3_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "IP Addressing",
    subtopic: "Subnetting",
    marks: 5,
    text: "Find the subnet mask and host range for the CIDR address $192.168.1.10 / 26$.",
    solution: "A $/26$ mask has $26$ ones: $11111111.11111111.11111111.11000000_2 = 255.255.255.192$.\nSubnet size: $2^{32-26} = 64$ addresses. \nHost Range: $192.168.1.1$ to $192.168.1.62$ ($192.168.1.0$ is net ID, $192.168.1.63$ is broadcast)."
  },

  // ==========================================
  // BMS: BACHELOR OF MANAGEMENT STUDIES (bms_*)
  // ==========================================
  // bms_1_1: Microeconomics
  {
    id: "bms_1_1_q1",
    subjectId: "bms_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Elasticity",
    subtopic: "Price Elasticity Formula",
    marks: 10,
    text: "Derive the formula for Point Price Elasticity of Demand: $\\epsilon_p = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}$. Calculate elasticity if demand function is $Q = 100 - 2P$ at $P = 20$.",
    solution: "Point elasticity definition:\n$$\\epsilon_p = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\lim_{\\Delta P \\to 0} \\frac{\\Delta Q / Q}{\\Delta P / P} = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}$$\n\nFor $Q = 100 - 2P$:\n$$\\frac{dQ}{dP} = -2$$\nAt $P=20$: $Q = 100 - 2(20) = 60$.\n\n$$\\epsilon_p = -2 \\cdot \\frac{20}{60} = -0.67$$\n(Typically reported as $|\\epsilon_p| = 0.67$, which is inelastic)."
  },
  {
    id: "bms_1_1_q2",
    subjectId: "bms_1_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Consumer Theory",
    subtopic: "Marginal Rate of Substitution",
    marks: 5,
    text: "State the equilibrium condition for consumer choice using MRS. Define $\\text{MRS}_{xy} = P_x / P_y$.",
    solution: "The consumer maximizes utility where the slope of the indifference curve (Marginal Rate of Substitution $\\text{MRS}_{xy}$) equals the slope of the budget line ($P_x / P_y$):\n$$\\text{MRS}_{xy} = \\frac{\\text{MU}_x}{\\text{MU}_y} = \\frac{P_x}{P_y}$$\nIf $\\text{MRS}_{xy} > P_x / P_y$, the consumer will buy more of good $X$."
  },
  // bms_1_2: Financial Accounting & Analysis
  {
    id: "bms_1_2_q1",
    subjectId: "bms_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Depreciation",
    subtopic: "WDV Method",
    marks: 12,
    text: "An asset cost $C = \\text{₹}2,00,000$. If scrap value after 3 years is $S = \\text{₹}1,45,800$, calculate the rate of depreciation $r$ under WDV method.",
    solution: "Under WDV:\n$$S = C (1 - r)^t$$\n$$1,45,800 = 2,00,000 (1 - r)^3$$\n$$(1 - r)^3 = \\frac{1,45,800}{2,00,000} = 0.729$$\n$$1 - r = (0.729)^{1/3} = 0.9$$\n$$r = 0.1 \\text{ or } 10\\%$$\n\nThus, the depreciation rate is $10\\%$ per annum."
  },
  {
    id: "bms_1_2_q2",
    subjectId: "bms_1_2",
    year: 2022,
    type: "Short",
    difficulty: "Easy",
    topic: "Principles",
    subtopic: "Accounting Equation",
    marks: 5,
    text: "State the fundamental accounting equation and show the effect of buying office supplies on credit for $\\text{₹}5,000$.",
    solution: "$$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$$\nBuying supplies on credit increases Assets (Office Supplies) by $+\\text{₹}5,000$ and increases Liabilities (Accounts Payable) by $+\\text{₹}5,000$. The equation remains balanced."
  },
  // bms_1_3: Statistics for Business Decisions
  {
    id: "bms_1_3_q1",
    subjectId: "bms_1_3",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Dispersion",
    subtopic: "Standard Deviation",
    marks: 10,
    text: "Calculate the standard deviation $\\sigma$ for the set of values: $10, 15, 20, 25, 30$.",
    solution: "1. Mean $\\bar{X} = \\frac{10+15+20+25+30}{5} = 20$\n2. Deviations from mean $(X - \\bar{X})$: $-10, -5, 0, 5, 10$\n3. Squares $(X - \\bar{X})^2$: $100, 25, 0, 25, 100$\n4. Sum of squares $\\sum (X - \\bar{X})^2 = 250$\n\n$$\\sigma = \\sqrt{\\frac{\\sum (X - \\bar{X})^2}{N}} = \\sqrt{\\frac{250}{5}} = \\sqrt{50} \\approx 7.07$$"
  },
  {
    id: "bms_1_3_q2",
    subjectId: "bms_1_3",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Regression",
    subtopic: "Slope calculation",
    marks: 5,
    text: "Given covariance $\\text{Cov}(X,Y) = 15$ and variance $\\text{Var}(X) = 25$, calculate the regression slope coefficient $b_{yx}$.",
    solution: "The slope coefficient $b_{yx}$ is calculated as:\n$$b_{yx} = \\frac{\\text{Cov}(X,Y)}{\\text{Var}(X)} = \\frac{15}{25} = 0.6$$"
  },
  // bms_2_1: Macroeconomics
  {
    id: "bms_2_1_q1",
    subjectId: "bms_2_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Keynesian Economics",
    subtopic: "Multiplier",
    marks: 10,
    text: "Derive the multiplier formula in a simple closed economy: $m = \\frac{1}{1 - c(1-t)}$ where $c$ is MPC and $t$ is tax rate.",
    solution: "Aggregate Demand:\n$$Y = C + I + G$$\n$$C = C_0 + c(Y - T) = C_0 + c(Y - tY) = C_0 + c(1-t)Y$$\n\nSubstitute C:\n$$Y = C_0 + c(1-t)Y + I + G$$\n$$Y[1 - c(1-t)] = C_0 + I + G$$\n$$Y = \\left[ \\frac{1}{1 - c(1-t)} \\right] (C_0 + I + G)$$\n\nThus, $m = \\frac{1}{1 - c(1-t)}$ represents the autonomous spending multiplier."
  },
  {
    id: "bms_2_1_q2",
    subjectId: "bms_2_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Monetary Policy",
    subtopic: "Money Multiplier",
    marks: 5,
    text: "Calculate the money multiplier if the required reserve ratio is $r = 10\\%$.",
    solution: "The money multiplier $m_m$ is:\n$$m_m = \\frac{1}{r} = \\frac{1}{0.10} = 10$$"
  },
  // bms_2_2: Corporate Finance
  {
    id: "bms_2_2_q1",
    subjectId: "bms_2_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Cost of Capital",
    subtopic: "WACC Formula",
    marks: 10,
    text: "Calculate WACC given: Equity $=\\text{₹}60\\text{L}$ with cost $R_e = 15\\%$, Debt $=\\text{₹}40\\text{L}$ with rate $R_d = 8\\%$. Corporate tax rate is $30\\%$.",
    solution: "Total Value $V = 60 + 40 = 100\\text{L}$.\nWeights: $w_e = 0.6$, $w_d = 0.4$.\n\n$$\\text{WACC} = w_e R_e + w_d R_d (1 - T_c)$$\n$$\\text{WACC} = (0.6)(0.15) + (0.4)(0.08)(1 - 0.3)$$\n$$\\text{WACC} = 0.09 + (0.032)(0.7) = 0.09 + 0.0224 = 0.1124 \\text{ or } 11.24\\%$$"
  },
  {
    id: "bms_2_2_q2",
    subjectId: "bms_2_2",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "NPV",
    subtopic: "Discounting",
    marks: 5,
    text: "A project requires initial investment $\\text{₹}1,00,000$ and yields $\\text{₹}1,21,000$ in year 2. Calculate NPV at discount rate of $10\\%$.",
    solution: "$$\\text{NPV} = \\frac{1,21,000}{(1 + 0.10)^2} - 1,00,000 = \\frac{1,21,000}{1.21} - 1,00,000 = 1,00,000 - 1,00,000 = 0$$"
  },
  // bms_2_3: Organizational Behavior
  {
    id: "bms_2_3_q1",
    subjectId: "bms_2_3",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Motivation",
    subtopic: "Maslow Hierarchy",
    marks: 5,
    text: "State the five levels of Maslow's Hierarchy of Needs starting from basic to high-order.",
    solution: "The five levels are:\n1. Physiological Needs (food, shelter)\n2. Safety Needs (job security)\n3. Social Needs (belongingness)\n4. Esteem Needs (recognition)\n5. Self-Actualization Needs (realizing full potential)"
  },
  {
    id: "bms_2_3_q2",
    subjectId: "bms_2_3",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "Leadership",
    subtopic: "Transformational vs Transactional",
    marks: 10,
    text: "Compare and contrast transactional and transformational leadership styles in organizational contexts.",
    solution: "- **Transactional**: Focuses on supervision, organization, and performance goals. Operates on reward/punishment systems.\n- **Transformational**: Inspires and motivates followers to achieve exceptional outcomes by changing values, beliefs, and attitudes."
  },
  // bms_3_1: Business Analytics
  {
    id: "bms_3_1_q1",
    subjectId: "bms_3_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Regression Models",
    subtopic: "Multiple Regression",
    marks: 10,
    text: "Explain the matrix form of Multiple Linear Regression equation: $\\mathbf{Y} = \\mathbf{X}\\mathbf{\\beta} + \\mathbf{\\epsilon}$ and the Ordinary Least Squares (OLS) estimator.",
    solution: "The model is $\\mathbf{Y} = \\mathbf{X}\\mathbf{\\beta} + \\mathbf{\\epsilon}$.\nTo find the OLS estimator $\\hat{\\mathbf{\\beta}}$ that minimizes sum of squared residuals:\n$$\\hat{\\mathbf{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{Y}$$\nThis requires the matrix $\\mathbf{X}^T\\mathbf{X}$ to be non-singular (no perfect multicollinearity)."
  },
  {
    id: "bms_3_1_q2",
    subjectId: "bms_3_1",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Classification",
    subtopic: "Logistic regression",
    marks: 5,
    text: "Define the logit transformation function for probability $p$: $\\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right)$.",
    solution: "The odds ratio is $p / (1-p)$. The log of odds (logit) maps probability $p \\in [0,1]$ to a real value range $(-\\infty, \\infty)$:\n$$\\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 X_1 + \\dots + \\beta_k X_k$$"
  },
  // bms_3_2: Marketing Management
  {
    id: "bms_3_2_q1",
    subjectId: "bms_3_2",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Marketing Mix",
    subtopic: "4 Ps",
    marks: 5,
    text: "Identify the 4 Ps of marketing mix and explain 'Positioning'.",
    solution: "The 4 Ps are: Product, Price, Place, Promotion.\n**Positioning** refers to designing the company's offering and image to occupy a distinctive place in the mind of the target market."
  },
  {
    id: "bms_3_2_q2",
    subjectId: "bms_3_2",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "PLC",
    subtopic: "Product Life Cycle",
    marks: 10,
    text: "Discuss marketing strategies for the Maturity and Decline stages of the Product Life Cycle (PLC).",
    solution: "- **Maturity Stage**: Peak sales, high competition. Strategy involves market modification, product refinement, and pricing changes.\n- **Decline Stage**: Sales drop. Strategy involves harvesting, divesting, or niche consolidation."
  },
  // bms_3_3: Human Resource Management
  {
    id: "bms_3_3_q1",
    subjectId: "bms_3_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Job Design",
    subtopic: "Job Analysis",
    marks: 10,
    text: "Explain the two components of Job Analysis: Job Description and Job Specification.",
    solution: "1. **Job Description**: Focuses on tasks, duties, and responsibilities of the role.\n2. **Job Specification**: Focuses on human qualities, skills, education, and experience required."
  },
  {
    id: "bms_3_3_q2",
    subjectId: "bms_3_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Performance",
    subtopic: "360 Feedback",
    marks: 5,
    text: "What is 360-degree performance appraisal and who are the key evaluators?",
    solution: "It is a holistic appraisal method gathering feedback from all directions:\nSuperiors, Peers, Subordinates, Customers, and Self-evaluation."
  },

  // ==========================================
  // BBA (FIA) (fia_*)
  // ==========================================
  // fia_1_1: Financial Accounting & Analysis
  {
    id: "fia_1_1_q1",
    subjectId: "fia_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Reporting",
    subtopic: "Balance Sheet",
    marks: 15,
    text: "Discuss the horizontal vs vertical layout of Balance Sheets as per Schedule III of Companies Act 2013.",
    solution: "Schedule III prescribes a mandatory vertical format. Main heads:\n1. Equity and Liabilities (Shareholders' funds, Non-current liabilities, Current liabilities)\n2. Assets (Non-current assets, Current assets)."
  },
  {
    id: "fia_1_1_q2",
    subjectId: "fia_1_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Inventory",
    subtopic: "FIFO vs LIFO",
    marks: 5,
    text: "In rising prices inflation, which inventory method (FIFO or LIFO) results in higher net income? Explain why.",
    solution: "FIFO results in higher net income. Older, cheaper inventory cost is assigned to Cost of Goods Sold (COGS), resulting in lower COGS and higher gross/net profits."
  },
  // fia_1_2: Microeconomics
  {
    id: "fia_1_2_q1",
    subjectId: "fia_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Production",
    subtopic: "Law of Variable Proportions",
    marks: 10,
    text: "State the Law of Variable Proportions and draw the three stages of production using marginal and average product curves.",
    solution: "The law states that adding variable inputs to a fixed input eventually decreases marginal returns.\nStage 1: AP rises.\nStage 2: AP falls, MP falls but is positive (optimal stage).\nStage 3: MP becomes negative."
  },
  {
    id: "fia_1_2_q2",
    subjectId: "fia_1_2",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Monopoly",
    subtopic: "Deadweight Loss",
    marks: 5,
    text: "Write the algebraic relation between Marginal Revenue ($MR$), Price ($P$), and Elasticity ($E_d$).",
    solution: "The Lerner relation:\n$$MR = P \\left(1 - \\frac{1}{|E_d|}\\right)$$\nFor $MR > 0$, demand must be elastic ($|E_d| > 1$)."
  },
  // fia_1_3: Statistics for Business Decisions
  {
    id: "fia_1_3_q1",
    subjectId: "fia_1_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Correlation",
    subtopic: "Pearson Coefficient",
    marks: 10,
    text: "State the formula for Pearson's Correlation Coefficient $r$ and calculate $r$ if $\\text{Cov}(X,Y) = 12$, $\\text{Var}(X) = 16$, and $\\text{Var}(Y) = 25$.",
    solution: "Formula:\n$$r = \\frac{\\text{Cov}(X,Y)}{\\sigma_x \\sigma_y}$$\n$$\\sigma_x = \\sqrt{16} = 4, \\quad \\sigma_y = \\sqrt{25} = 5$$\n$$r = \\frac{12}{4 \\cdot 5} = \\frac{12}{20} = 0.6$$"
  },
  {
    id: "fia_1_3_q2",
    subjectId: "fia_1_3",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Distributions",
    subtopic: "Poisson Probability",
    marks: 5,
    text: "Calculate the probability $P(X=0)$ in a Poisson distribution with mean $\\lambda = 2$.",
    solution: "Poisson PMF: $P(X=k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$\nFor $k=0$:\n$$P(X=0) = \\frac{e^{-2} 2^0}{0!} = e^{-2} \\approx 0.1353$$"
  },
  // fia_2_1: Macroeconomics
  {
    id: "fia_2_1_q1",
    subjectId: "fia_2_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Keynesian Economics",
    subtopic: "AD-AS model",
    marks: 10,
    text: "Draw and explain the short-run vs long-run effects of expansionary fiscal policy in AD-AS framework.",
    solution: "Short-run: AD shifts right, increasing output and prices. Long-run: Nominal wages adjust, shifting SRAS left. Output returns to natural rate, but price level is permanently higher."
  },
  {
    id: "fia_2_1_q2",
    subjectId: "fia_2_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Inflation",
    subtopic: "Phillips Curve",
    marks: 5,
    text: "State the equation for the expectations-augmented Phillips Curve.",
    solution: "$$\\pi = \\pi^e - \\beta(u - u_n) + v$$\nwhere $\\pi$ is inflation, $\\pi^e$ expected inflation, $u$ unemployment, $u_n$ natural rate, and $v$ supply shocks."
  },
  // fia_2_2: Corporate Finance
  {
    id: "fia_2_2_q1",
    subjectId: "fia_2_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Asset Pricing",
    subtopic: "CAPM",
    marks: 10,
    text: "Compute expected return $E(R_i)$ using CAPM: $R_f = 6\\%$, $\\beta_i = 1.2$, market return $E(R_m) = 12\\%$.",
    solution: "CAPM Formula:\n$$E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$$\n$$E(R_i) = 6\\% + 1.2 [12\\% - 6\\%]$$\n$$E(R_i) = 6\\% + 1.2 [6\\%] = 6\\% + 7.2\\% = 13.2\\%$$"
  },
  {
    id: "fia_2_2_q2",
    subjectId: "fia_2_2",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Capital Structure",
    subtopic: "MM Proposition I",
    marks: 5,
    text: "State Modigliani-Miller Proposition I without taxes.",
    solution: "The value of a firm is independent of its capital structure:\n$$V_L = V_U$$\nwhere $V_L$ is leverage value and $V_U$ is unleveraged value."
  },
  // fia_2_3: Legal Aspects of Business
  {
    id: "fia_2_3_q1",
    subjectId: "fia_2_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Contracts",
    subtopic: "Essential Elements",
    marks: 10,
    text: "What are the essentials of a valid contract under Section 10 of Indian Contract Act 1872?",
    solution: "Essentials: Offer and Acceptance, Intention to create legal relationship, Lawful Consideration, Capacity of parties, Free Consent, Lawful Object."
  },
  {
    id: "fia_2_3_q2",
    subjectId: "fia_2_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Companies Act",
    subtopic: "Independent Directors",
    marks: 5,
    text: "State the minimum number of independent directors required for listed public companies.",
    solution: "As per Sec 149(4) of Companies Act 2013, at least one-third of the total number of directors must be independent."
  },
  // fia_3_1: Income Tax Law & Practice
  {
    id: "fia_3_1_q1",
    subjectId: "fia_3_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Salaries",
    subtopic: "HRA Exemption",
    marks: 15,
    text: "Calculate the taxable House Rent Allowance (HRA) for an employee using the three statutory limits of the Income Tax Act.",
    solution: "Exempt amount is minimum of:\n1. Actual HRA received\n2. Rent paid minus $10\\%$ of salary\n3. $50\\%$ of salary (metros) or $40\\%$ (non-metros)."
  },
  {
    id: "fia_3_1_q2",
    subjectId: "fia_3_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Tax Concepts",
    subtopic: "Planning vs Evasion",
    marks: 5,
    text: "Explain the difference between Tax Evasion and Tax Planning.",
    solution: "- **Tax Planning**: Reducing tax liability using legal provisions and exemptions within the spirit of the law.\n- **Tax Evasion**: Illegal reduction of tax via fraud, concealing income, or false statements."
  },
  // fia_3_2: Financial Markets & Institutions
  {
    id: "fia_3_2_q1",
    subjectId: "fia_3_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Money Market",
    subtopic: "Instruments",
    marks: 10,
    text: "Explain the issuance properties of Commercial Papers (CP) and Treasury Bills (T-Bills) in India.",
    solution: "T-Bills: Issued by RBI on behalf of Govt for 91, 182, 364 days. CP: Short-term unsecured promissory notes issued by corporates with high credit ratings, maturity 7 days to 1 year."
  },
  {
    id: "fia_3_2_q2",
    subjectId: "fia_3_2",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Regulation",
    subtopic: "SEBI Role",
    marks: 5,
    text: "State two primary objectives of the Securities and Exchange Board of India (SEBI).",
    solution: "1. Protect the interests of investors in securities.\n2. Promote the development and regulation of the securities market."
  },
  // fia_3_3: Quantitative Techniques
  {
    id: "fia_3_3_q1",
    subjectId: "fia_3_3",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Linear Programming",
    subtopic: "Graphical Method",
    marks: 12,
    text: "Maximize $Z = 3x + 5y$ subject to: $x + 2y \\le 8$, $3x + 2y \\le 12$, and $x,y \\ge 0$ using graphical method.",
    solution: "Identify corner points of feasible region:\n1. Solve boundary lines intersection: $x + 2y = 8 \\implies (0,4)$ and $(8,0)$.\n2. $3x + 2y = 12 \\implies (0,6)$ and $(4,0)$.\n3. Intersection point: Subtracting gives $2x = 4 \\implies x=2, y=3$.\nFeasible region corners: $(0,0), (4,0), (2,3), (0,4)$.\nCalculate $Z$:\n- $(4,0) \\implies Z=12$\n- $(2,3) \\implies Z=3(2)+5(3)=21$ (Max)\n- $(0,4) \\implies Z=20$\nOptimal solution: $x=2, y=3$, Max $Z=21$."
  },
  {
    id: "fia_3_3_q2",
    subjectId: "fia_3_3",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Transportation",
    subtopic: "VAM",
    marks: 5,
    text: "State the objective of calculating penalties in Vogel's Approximation Method (VAM).",
    solution: "VAM calculates penalties for each row/column (difference between two lowest unit costs) to target allocations to cells that prevent paying high opportunity costs if missed."
  },

  // ==========================================
  // SRCC: B.Com. (Hons.) (com_*)
  // ==========================================
  // com_1_1: Financial Accounting
  {
    id: "com_1_1_q1",
    subjectId: "com_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Partnership",
    subtopic: "Goodwill Admission",
    marks: 10,
    text: "Upon admission of a partner, how is the Sacrifice Ratio calculated? Write the equation.",
    solution: "$$\\text{Sacrificing Ratio} = \\text{Old Ratio} - \\text{New Ratio}$$\nIt is used to distribute the premium for goodwill brought in by the incoming partner among sacrificing partners."
  },
  {
    id: "com_1_1_q2",
    subjectId: "com_1_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Reconciliation",
    subtopic: "BRS Rules",
    marks: 5,
    text: "Why does a Bank Reconciliation Statement (BRS) reconcile the Pass Book with the Cash Book balance?",
    solution: "BRS corrects timing differences (e.g., checks issued but not presented, bank charges, interest credited) to ensure record accuracy between the firm and the bank."
  },
  // com_1_2: Business Laws
  {
    id: "com_1_2_q1",
    subjectId: "com_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Contract Law",
    subtopic: "Consideration Exceptions",
    marks: 10,
    text: "Explain the rule 'No Consideration, No Contract'. Discuss exceptions under Section 25 of Indian Contract Act.",
    solution: "Exceptions: 1. Natural love and affection, 2. Agreement to pay time-barred debt, 3. Completed gifts, 4. Voluntary compensation."
  },
  {
    id: "com_1_2_q2",
    subjectId: "com_1_2",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Remedies",
    subtopic: "Damages",
    marks: 5,
    text: "Explain Hadley v Baxendale rule for ordinary vs special damages.",
    solution: "Ordinary damages flow naturally from the breach. Special damages can only be claimed if the special circumstances were communicated to the breaching party beforehand."
  },
  // com_1_3: Management Principles and Applications
  {
    id: "com_1_3_q1",
    subjectId: "com_1_3",
    year: 2024,
    type: "Long",
    difficulty: "Easy",
    topic: "Principles",
    subtopic: "Fayol Principles",
    marks: 10,
    text: "Discuss Fayol's principles of Unity of Command vs Unity of Direction.",
    solution: "- **Unity of Command**: An employee receives orders from only one superior.\n- **Unity of Direction**: One head and one plan for activities having the same objective."
  },
  {
    id: "com_1_3_q2",
    subjectId: "com_1_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Planning",
    subtopic: "Barriers",
    marks: 5,
    text: "Identify three main barriers to effective corporate planning.",
    solution: "1. Rapid environmental changes, 2. Internal resistance to change, 3. Inadequate information."
  },
  // com_2_1: Corporate Accounting
  {
    id: "com_2_1_q1",
    subjectId: "com_2_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Redemption",
    subtopic: "CRR Calculation",
    marks: 12,
    text: "Determine the transfer amount to Capital Redemption Reserve (CRR) if nominal value of redeemed preference shares is $\\text{₹}5,00,000$, and fresh issue of equity shares at par is $\\text{₹}2,00,000$.",
    solution: "CRR formula:\n$$\\text{Transfer to CRR} = \\text{Nominal value of shares redeemed} - \\text{Nominal value of fresh issues}$$\n$$\\text{Transfer to CRR} = 5,00,000 - 2,00,000 = 3,00,000$$"
  },
  {
    id: "com_2_1_q2",
    subjectId: "com_2_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Amalgamation",
    subtopic: "AS 14",
    marks: 5,
    text: "Explain purchase method vs pooling of interest method of amalgamation accounting under AS-14.",
    solution: "- **Pooling of interest**: Assets/liabilities recorded at book value. Reserves are merged.\n- **Purchase method**: Assets/liabilities recorded at fair values. Only statutory reserves are retained."
  },
  // com_2_2: Company Law
  {
    id: "com_2_2_q1",
    subjectId: "com_2_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Charters",
    subtopic: "MoA vs AoA",
    marks: 10,
    text: "Distinguish between Memorandum of Association (MoA) and Articles of Association (AoA) on the basis of scope, definition, and alteration.",
    solution: "MoA defines the constitution and external limits of the company. AoA defines the internal regulations and bylaws. MoA is subordinate to the Act; AoA is subordinate to MoA."
  },
  {
    id: "com_2_2_q2",
    subjectId: "com_2_2",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Meetings",
    subtopic: "AGM Rules",
    marks: 5,
    text: "State the maximum time gap allowed between two consecutive Annual General Meetings (AGMs).",
    solution: "As per Sec 96 of Companies Act 2013, the gap must not exceed 15 months."
  },
  // com_2_3: Human Resource Management
  {
    id: "com_2_3_q1",
    subjectId: "com_2_3",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Acquisition",
    subtopic: "Recruitment vs Selection",
    marks: 5,
    text: "Why is recruitment considered a positive process while selection is considered a negative process?",
    solution: "Recruitment attracts more candidates (positive), while selection rejects unsuitable applicants to find the best fit (negative)."
  },
  {
    id: "com_2_3_q2",
    subjectId: "com_2_3",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "Development",
    subtopic: "Training Methods",
    marks: 10,
    text: "Compare On-the-job training (OJT) with Off-the-job training methods.",
    solution: "- **OJT**: Done at actual workplace (apprenticeship, job rotation).\n- **Off-the-job**: Done away from workplace (vestibule, case studies, lectures)."
  },
  // com_3_1: Business Mathematics
  {
    id: "com_3_1_q1",
    subjectId: "com_3_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Interest",
    subtopic: "Continuous Compounding",
    marks: 10,
    text: "Find the accumulated value of $\\text{₹}1,00,000$ after $5$ years at a rate of $8\\%$ compounded continuously. Use the formula $A(t) = P e^{rt}$ and given $e^{0.4} \\approx 1.4918$.",
    solution: "Formula:\n$$A(t) = P e^{rt}$$\n$$A(5) = 1,00,000 \\cdot e^{(0.08)(5)} = 1,00,000 \\cdot e^{0.4}$$\n$$A(5) \\approx 1,00,000 \\cdot 1.4918 = 1,49,180$$\n\nThe accumulated value is $\\text{₹}1,49,180$."
  },
  {
    id: "com_3_1_q2",
    subjectId: "com_3_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Calculus",
    subtopic: "Optimization",
    marks: 5,
    text: "If cost function is $C(x) = 500 + 10x$ and revenue is $R(x) = 50x - x^2$. Find the value of $x$ that maximizes profit $\\Pi(x)$.",
    solution: "Profit $\\Pi(x) = R(x) - C(x)$:\n$$\\Pi(x) = (50x - x^2) - (500 + 10x) = -x^2 + 40x - 500$$\n\nTake derivative and set to zero:\n$$\\frac{d\\Pi}{dx} = -2x + 40 = 0 \\implies x = 20$$\nSince $\\frac{d^2\\Pi}{dx^2} = -2 < 0$, $x=20$ is a maximum."
  },
  // com_3_2: Financial Management
  {
    id: "com_3_2_q1",
    subjectId: "com_3_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Leverages",
    subtopic: "Degree of Leverage",
    marks: 10,
    text: "Define and write the formulas for Operating Leverage (DOL) and Financial Leverage (DFL).",
    solution: "$$\\text{DOL} = \\frac{\\text{Contribution}}{\\text{EBIT}} = \\frac{\\% \\Delta \\text{EBIT}}{\\% \\Delta \\text{Sales}}$$\n$$\\text{DFL} = \\frac{\\text{EBIT}}{\\text{EBT}} = \\frac{\\% \\Delta \\text{EPS}}{\\% \\Delta \\text{EBIT}}$$"
  },
  {
    id: "com_3_2_q2",
    subjectId: "com_3_2",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Dividends",
    subtopic: "Gordon Model",
    marks: 5,
    text: "Calculate stock price $P_0$ using Gordon model: Dividend $D_1 = \\text{₹}10$, Cost of equity $k_e = 12\\%$, growth rate $g = 7\\%$.",
    solution: "Gordon growth model:\n$$P_0 = \\frac{D_1}{k_e - g}$$\n$$P_0 = \\frac{10}{0.12 - 0.07} = \\frac{10}{0.05} = 200$$\n\nStock price is $\\text{₹}200$."
  },
  // com_3_3: Principles of Marketing
  {
    id: "com_3_3_q1",
    subjectId: "com_3_3",
    year: 2024,
    type: "Short",
    difficulty: "Easy",
    topic: "Segmentation",
    subtopic: "STP Strategy",
    marks: 5,
    text: "Briefly explain the three steps of the STP marketing framework.",
    solution: "1. **Segmentation**: Grouping buyers by characteristics.\n2. **Targeting**: Selecting which segment(s) to enter.\n3. **Positioning**: Differentiating products in consumers' minds."
  },
  {
    id: "com_3_3_q2",
    subjectId: "com_3_3",
    year: 2023,
    type: "Long",
    difficulty: "Medium",
    topic: "Consumer Behavior",
    subtopic: "Decision Stages",
    marks: 10,
    text: "Discuss the five stages of the Consumer Buying Decision Process.",
    solution: "1. Need recognition, 2. Information search, 3. Evaluation of alternatives, 4. Purchase decision, 5. Post-purchase behavior."
  },

  // ==========================================
  // SRCC: B.A. (Hons.) ECONOMICS (eco_*)
  // ==========================================
  // eco_1_1: Introductory Microeconomics
  {
    id: "eco_1_1_q1",
    subjectId: "eco_1_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Consumer Choice",
    subtopic: "Constrained Maximisation",
    marks: 15,
    text: "Solve utility maximization: $\\max U(x,y) = x^{0.5} y^{0.5}$ subject to budget $2x + 4y = 80$. Find optimal bundles $x^*$ and $y^*$.",
    solution: "We know for Cobb-Douglas utility $U(x,y) = x^\\alpha y^\\beta$ subject to $P_x x + P_y y = I$:\n$$x^* = \\frac{\\alpha}{\\alpha + \\beta} \\frac{I}{P_x}, \\quad y^* = \\frac{\\beta}{\\alpha + \\beta} \\frac{I}{P_y}$$\n\nHere $\\alpha = 0.5$, $\\beta = 0.5$, $P_x = 2$, $P_y = 4$, $I = 80$:\n$$x^* = \\frac{0.5}{1.0} \\frac{80}{2} = 20$$\n$$y^* = \\frac{0.5}{1.0} \\frac{80}{4} = 10$$\n\nOptimal bundle: $(20, 10)$."
  },
  {
    id: "eco_1_1_q2",
    subjectId: "eco_1_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Slutsky",
    subtopic: "Decomposition",
    marks: 5,
    text: "State the Slutsky equation decomposition of total price effect.",
    solution: "$$\\frac{\\partial x_i}{\\partial p_j} = \\frac{\\partial h_i}{\\partial p_j} - x_j \\frac{\\partial x_i}{\\partial I}$$\nTotal Effect = Substitution Effect (Hicksian) + Income Effect."
  },
  // eco_1_2: Introductory Mathematical Methods for Economics
  {
    id: "eco_1_2_q1",
    subjectId: "eco_1_2",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Differentiation",
    subtopic: "Cobb Douglas",
    marks: 10,
    text: "Find the partial derivatives $\\frac{\\partial Y}{\\partial K}$ and $\\frac{\\partial Y}{\\partial L}$ of Cobb-Douglas production function $Y = A K^{0.3} L^{0.7}$.",
    solution: "$$\\frac{\\partial Y}{\\partial K} = 0.3 A K^{-0.7} L^{0.7} = 0.3 \\frac{Y}{K}$$\n$$\\frac{\\partial Y}{\\partial L} = 0.7 A K^{0.3} L^{-0.3} = 0.7 \\frac{Y}{L}$$\n\nThese represent Marginal Product of Capital (MPK) and Marginal Product of Labor (MPL)."
  },
  {
    id: "eco_1_2_q2",
    subjectId: "eco_1_2",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Linear Algebra",
    subtopic: "Cramer's Rule",
    marks: 5,
    text: "Use Cramer's rule to solve for $x$ in: $3x + 2y = 8$, $2x + y = 5$.",
    solution: "System matrix determinant:\n$$\\det(A) = \\begin{vmatrix} 3 & 2 \\\\ 2 & 1 \\end{vmatrix} = 3(1) - 2(2) = -1$$\n\nSubstitute constants into column 1 for $A_x$:\n$$\\det(A_x) = \\begin{vmatrix} 8 & 2 \\\\ 5 & 1 \\end{vmatrix} = 8(1) - 5(2) = -2$$\n\n$$x = \\frac{\\det(A_x)}{\\det(A)} = \\frac{-2}{-1} = 2$$"
  },
  // eco_1_3: Introductory Statistics for Economics
  {
    id: "eco_1_3_q1",
    subjectId: "eco_1_3",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Continuous Math",
    subtopic: "Normal Distribution",
    marks: 10,
    text: "State the probability density function (PDF) $f(x)$ of the Normal Distribution with mean $\\mu$ and variance $\\sigma^2$. Identify the value at its inflection points.",
    solution: "The PDF is:\n$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2} \\left(\\frac{x - \\mu}{\\sigma}\\right)^2}$$\n\nThe inflection points occur at first derivative extrema, which are located at $x = \\mu - \\sigma$ and $x = \\mu + \\sigma$."
  },
  {
    id: "eco_1_3_q2",
    subjectId: "eco_1_3",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Central Tendency",
    subtopic: "Grouped Median",
    marks: 5,
    text: "State the formula for calculating median of grouped data.",
    solution: "$$\\text{Median} = L + \\left( \\frac{\\frac{N}{2} - CF}{f} \\right) \\cdot h$$\nwhere $L$ is lower limit of median class, $CF$ cumulative frequency before class, $f$ frequency of class, and $h$ class width."
  },
  // eco_2_1: Introductory Macroeconomics
  {
    id: "eco_2_1_q1",
    subjectId: "eco_2_1",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Keynesian Economics",
    subtopic: "Keynesian Cross",
    marks: 10,
    text: "In Keynesian cross, find equilibrium income $Y^*$ where consumption $C = 50 + 0.8 Y_d$, taxes $T = 50$, investment $I = 100$, government purchases $G = 100$.",
    solution: "Equilibrium condition:\n$$Y = C + I + G$$\n$$Y = 50 + 0.8(Y - 50) + 100 + 100$$\n$$Y = 250 + 0.8Y - 40$$\n$$Y = 210 + 0.8Y$$\n$$0.2Y = 210 \\implies Y^* = \\frac{210}{0.2} = 1050$$"
  },
  {
    id: "eco_2_1_q2",
    subjectId: "eco_2_1",
    year: 2023,
    type: "Short",
    difficulty: "Easy",
    topic: "Accounting",
    subtopic: "National Income Ident",
    marks: 5,
    text: "Write the national income identity for an open economy.",
    solution: "$$GDP = C + I + G + NX$$\nwhere $NX$ represents Net Exports ($X - M$)."
  },
  // eco_2_2: Intermediate Mathematical Methods for Economics
  {
    id: "eco_2_2_q1",
    subjectId: "eco_2_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Optimization",
    subtopic: "Lagrange Multipliers",
    marks: 12,
    text: "Set up the Lagrangian to maximize $f(x,y) = xy$ subject to $2x + y = 100$. Solve for $x$, $y$, and the multiplier $\\lambda$.",
    solution: "Lagrangian:\n$$\\mathcal{L}(x,y,\\lambda) = xy - \\lambda(2x + y - 100)$$\nFirst-order conditions:\n1. $\\frac{\\partial \\mathcal{L}}{\\partial x} = y - 2\\lambda = 0 \\implies y = 2\\lambda$\n2. $\\frac{\\partial \\mathcal{L}}{\\partial y} = x - \\lambda = 0 \\implies x = \\lambda$\n3. $2x + y = 100$\n\nSubstitute (1) and (2) into (3):\n$$2(\\lambda) + 2\\lambda = 100 \\implies 4\\lambda = 100 \\implies \\lambda = 25$$\n\nOptimal solutions: $x = 25$, $y = 50$, $\\lambda = 25$."
  },
  {
    id: "eco_2_2_q2",
    subjectId: "eco_2_2",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Dynamics",
    subtopic: "Differential Equations",
    marks: 5,
    text: "Solve first-order differential equation: $\\frac{dy}{dt} + 2y = 8$.",
    solution: "This is a linear ODE. Integrating factor $I(t) = e^{\\int 2 dt} = e^{2t}$.\nMultiply both sides:\n$$\\frac{d}{dt}(y e^{2t}) = 8 e^{2t}$$\n$$y e^{2t} = 4 e^{2t} + C$$\n$$y(t) = 4 + C e^{-2t}$$"
  },
  // eco_2_3: Intermediate Statistics for Economics
  {
    id: "eco_2_3_q1",
    subjectId: "eco_2_3",
    year: 2024,
    type: "Long",
    difficulty: "Medium",
    topic: "Limit Theorems",
    subtopic: "CLT",
    marks: 10,
    text: "State the Central Limit Theorem (CLT) and explain why it is crucial for parameter estimations.",
    solution: "CLT: Regardless of the population distribution, the sampling distribution of the sample mean $\\bar{X}$ approaches a normal distribution with mean $\\mu$ and variance $\\sigma^2/n$ as sample size $n \\to \\infty$ ($n \\ge 30$). It allows economists to perform Z-tests and construct confidence intervals without knowing the exact population distribution."
  },
  {
    id: "eco_2_3_q2",
    subjectId: "eco_2_3",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Hypothesis Testing",
    subtopic: "Type errors",
    marks: 5,
    text: "Define Type I and Type II errors in hypothesis testing.",
    solution: "- **Type I Error ($\\alpha$)**: Rejecting the null hypothesis ($H_0$) when it is true.\n- **Type II Error ($\\beta$)**: Failing to reject the null hypothesis ($H_0$) when it is false."
  },
  // eco_3_1: Intermediate Microeconomics I: Behavioural Foundations of Market Interactions
  {
    id: "eco_3_1_q1",
    subjectId: "eco_3_1",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Production Theory",
    subtopic: "Cost Minimisation",
    marks: 12,
    text: "Solve cost minimization to find conditional factor demands: minimize $wL + rK$ subject to $K^{0.5} L^{0.5} = q$.",
    solution: "Condition for cost minimization:\n$$\\text{MRTS} = \\frac{w}{r} \\implies \\frac{\\partial q / \\partial L}{\\partial q / \\partial K} = \\frac{w}{r}$$\n$$\\frac{0.5 K^{0.5} L^{-0.5}}{0.5 K^{-0.5} L^{0.5}} = \\frac{K}{L} = \\frac{w}{r} \\implies K = L \\frac{w}{r}$$\n\nSubstitute into constraint:\n$$\\left(L \\frac{w}{r}\\right)^{0.5} L^{0.5} = q \\implies L^* = q \\sqrt{\\frac{r}{w}}$$\nBy symmetry:\n$$K^* = q \\sqrt{\\frac{w}{r}}$$\nThese are the conditional factor demands."
  },
  {
    id: "eco_3_1_q2",
    subjectId: "eco_3_1",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Welfare",
    subtopic: "Pareto Efficiency",
    marks: 5,
    text: "Define Pareto Efficiency in consumption exchange.",
    solution: "An allocation is Pareto efficient if it is impossible to make one consumer better off without making another consumer worse off. Slope condition: $\\text{MRS}^A = \\text{MRS}^B$."
  },
  // eco_3_2: Intermediate Macroeconomics I
  {
    id: "eco_3_2_q1",
    subjectId: "eco_3_2",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "IS-LM Model",
    subtopic: "Algebraic derivation",
    marks: 10,
    text: "Derive the IS curve equation if consumption is $C = C_0 + c(Y-T)$, investment is $I = I_0 - b i$, and government purchases are $G$.",
    solution: "In equilibrium:\n$$Y = C + I + G = C_0 + c(Y-T) + I_0 - b i + G$$\n$$Y(1-c) = C_0 - c T + I_0 + G - b i$$\n$$Y = \\left[ \\frac{1}{1-c} \\right] (C_0 - c T + I_0 + G) - \\left[ \\frac{b}{1-c} \\right] i$$\nThis yields the negative relation between interest rate $i$ and output $Y$."
  },
  {
    id: "eco_3_2_q2",
    subjectId: "eco_3_2",
    year: 2023,
    type: "Short",
    difficulty: "Medium",
    topic: "Open Economy",
    subtopic: "Mundell Fleming",
    marks: 5,
    text: "Why is monetary policy highly effective under flexible exchange rates in the Mundell-Fleming model?",
    solution: "Expansionary monetary policy lowers the interest rate, capital flows out, causing currency depreciation. Depreciation boosts net exports, amplifying the expansionary effect on GDP."
  },
  // eco_3_3: Advanced Mathematical Methods for Economics
  {
    id: "eco_3_3_q1",
    subjectId: "eco_3_3",
    year: 2024,
    type: "Long",
    difficulty: "Hard",
    topic: "Differential Equations",
    subtopic: "Second Order linear",
    marks: 15,
    text: "Find the general solution to the second-order homogeneous differential equation: $\\frac{d^2y}{dt^2} - 5\\frac{dy}{dt} + 6y = 0$.",
    solution: "Find characteristic equation roots:\n$$r^2 - 5r + 6 = 0 \\implies (r - 2)(r - 3) = 0$$\nRoots are $r_1 = 2$ and $r_2 = 3$.\n\nSince roots are real and distinct, the general solution is:\n$$y(t) = C_1 e^{2t} + C_2 e^{3t}$$"
  },
  {
    id: "eco_3_3_q2",
    subjectId: "eco_3_3",
    year: 2023,
    type: "Short",
    difficulty: "Hard",
    topic: "Optimisation",
    subtopic: "Hamiltonian",
    marks: 5,
    text: "Set up the Hamiltonian function $\\mathcal{H}$ for dynamic optimization problem with objective $\\int_0^T f(t,x,u) dt$ and state equation $\\dot{x} = g(t,x,u)$.",
    solution: "The Hamiltonian is:\n$$\\mathcal{H}(t, x, u, \\lambda) = f(t, x, u) + \\lambda \\cdot g(t, x, u)$$\nwhere $x$ is the state variable, $u$ is the control variable, and $\\lambda$ is the costate variable."
  }
];
