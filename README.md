# PaperWise — Delhi University Semester PYQ Analyzer

PaperWise is a premium, dark-mode-first web application designed for Delhi University (DU) students to browse, filter, and track Past Year Questions (PYQs) for their semester exams. 

Inspired by AfterBoards.in's PYQ Analyser, PaperWise bridges the gap between chaotic PDF scans and structured, interactive, topic-level learning.

## Key Features

1. **Multi-Axis PYQ Analyzer**:
   - Filter questions by Subject, Exam Year, Topic, Difficulty (Easy, Medium, Hard), and Question Type (MCQ, Short, Long, Numerical).
   - Real-time searching across question texts and topic titles.
   - Client-side reactive updating of matching lists and statistics.
2. **Onboarding & Authentication**:
   - Multi-step registration flow to select DU College, Course (B.Com Hons, B.Sc CS Hons, B.A. Econ Hons), and current Semester.
   - Structured user profile state stored client-side.
3. **Interactive Dashboard**:
   - Welcome banner and key exam tracking details (Total PYQs, completed percentage, coverage metrics, days remaining).
   - Semester subject progress cards showing dynamic visual gauges.
   - Recent activity tracking of completed questions.
4. **Subject Detail Pages**:
   - Visual conic-gradient progress tracking for each subject.
   - Tab-based lists: View all, Group by Topic, or Group by Year.
5. **Interactive Explanations**:
   - Click to expand step-by-step solutions for each question.
   - Full support for LaTeX math notations (e.g. `\(E = mc^2\)`).

## Tech Stack & Architecture

- **Framework**: Next.js App Router (JavaScript)
- **Styling**: Vanilla CSS (`src/app/globals.css`) with custom utility classes, animations, and variables
- **Icons**: Lucide Icons (`lucide-react`)
- **Data Layer**: Static client-side JavaScript datasets (`src/data/`)

---

## Getting Started

### Prerequisites

- Node.js LTS
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Two19Labs/PaperWise.git
   cd PaperWise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start production server:
   ```bash
   npm run start
   ```
