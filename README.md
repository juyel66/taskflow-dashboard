# TaskFlow Dashboard

A modern, production-quality, responsive Task Management Dashboard built with **React**, **React Router DOM**, **Axios**, and **Plain CSS**.

Developed as a Senior Frontend Engineer coding assignment demonstrating clean architecture, component reusability, asynchronous state management, and mobile-first responsive design.

---

##  Features

- **CRUD Operations**:
  - **Create**: Add new tasks with input validation and instant state update.
  - **Read**: Fetch initial 10 todo items from JSONPlaceholder API.
  - **Update**: Toggle task completion status with line-through styling and top header counter update.
  - **Delete**: Remove tasks directly from the Dashboard or from the Task Details view.
- **Routing**: Client-side navigation via React Router DOM (`/` Dashboard, `/tasks/:id` Task Details).
- **Comprehensive UI States**:
  - **Loading State**: Animated spinner indicator during API requests.
  - **Error State**: Friendly error alert with retry button for seamless error recovery.
  - **Empty State**: Visual illustration when no tasks are present.
- **UX & Accessibility**:
  - Interactive hover effects and transitions.
  - Dynamic button disabling while requests are in-flight.
  - Responsive mobile-first layout (Mobile, Tablet, Desktop).

---

## 🛠 Tech Stack

- **Framework**: React 19
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Plain CSS (Custom CSS Variables, Flexbox/Grid, Animations)
- **Build Tool**: Vite

---

##  Folder Structure

```text
src/
├── assets/
├── components/
│   ├── AddTask.jsx       # Controlled task creation form
│   ├── Empty.jsx         # Empty state view
│   ├── Error.jsx         # Error state alert with retry
│   ├── Header.jsx        # App header & task completion counter
│   ├── Loading.jsx       # Loading spinner state
│   ├── TaskItem.jsx      # Individual task card with toggle & delete
│   └── TaskList.jsx      # Task collection renderer
├── pages/
│   ├── Dashboard.jsx     # Main dashboard view & CRUD handlers
│   └── TaskDetails.jsx   # Detailed single task view
├── routes/
│   └── AppRoutes.jsx     # React Router DOM configuration
├── services/
│   └── todoService.js    # Dedicated Axios API service
├── styles/
│   ├── components.css    # Reusable component styles
│   ├── global.css        # Design tokens & global resets
│   └── pages.css         # Page-specific layout styles
├── App.jsx               # Main application container & router
└── main.jsx              # Entry point
```

---

##  API Details

**Base URL**: `https://jsonplaceholder.typicode.com`

**Endpoints Used**:
- `GET /todos?_limit=10` - Fetch initial task list
- `GET /todos/:id` - Fetch details for a specific task
- `POST /todos` - Create a new task item
- `PATCH /todos/:id` - Update completion status
- `DELETE /todos/:id` - Remove task item

> *Note: JSONPlaceholder simulates CRUD requests and does not persist backend data. The application updates local React state immediately upon successful HTTP requests to provide real-time UI feedback.*

---

##  Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd taskflow-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run linter**:
   ```bash
   npm run lint
   ```

---


