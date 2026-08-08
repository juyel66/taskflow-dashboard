# TaskFlow Dashboard

TaskFlow is a simple task management dashboard built as a frontend coding assignment. It uses the JSONPlaceholder API to fetch and update todo items, managing CRUD changes through local React state because the mock API does not persist POST, PATCH, and DELETE requests.

## Features

- **Loading Tasks**: Fetches the initial list of 10 tasks from the API.
- **Creating Tasks**: Add new tasks through a controlled form.
- **Updating Completion Status**: Toggle a task as completed or incomplete.
- **Deleting Tasks**: Remove tasks from either the dashboard or details page.
- **Viewing Task Details**: View single task details on a dedicated route.
- **Completed Task Counter**: Displays total and completed task counts in the header.
- **Loading State**: Shows a loading indicator while fetching data.
- **Error State with Retry**: Displays error messages with a retry option for network/server failures.
- **Empty State**: Displays a friendly message when no tasks are available.
- **Responsive Layout**: Designed to work on mobile, tablet, and desktop screens.
- **React Router Navigation**: Client-side routing between dashboard and detail views.

## Tech Stack

- React 19 (`react`, `react-dom`)
- React Router DOM v7 (`react-router-dom`)
- Axios (`axios`)
- React Icons (`react-icons`)
- Vite (`vite`)
- Vanilla CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd taskflow-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Application Routes

- `/`: Dashboard (Main task list, creation form, and stats)
- `/tasks/:id`: Task Details (Single task view and actions)

## API

Base URL: `https://jsonplaceholder.typicode.com`

Endpoints used:
- `GET /todos?_limit=10` - Fetch initial list of tasks
- `GET /todos/:id` - Fetch details for a single task
- `POST /todos` - Create a new task
- `PATCH /todos/:id` - Update completion status of a task
- `DELETE /todos/:id` - Delete a task

## Note About JSONPlaceholder

JSONPlaceholder is a fake online REST API for testing and prototyping. It simulates CRUD operations (`POST`, `PATCH`, `DELETE`) and returns successful HTTP responses, but it does not persist any changes on the server.

To provide a consistent user experience:
- Created tasks are added to local React state.
- Updated and deleted tasks update local state immediately.
- Refreshing the browser while on a newly created task details page returns an HTTP `404 Not Found` from the API because the item was not saved on the backend server. The app handles this scenario by displaying a "Task Not Found" state rather than a raw server error.

## Project Structure

```text
taskflow-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddTask.jsx
│   │   ├── Empty.jsx
│   │   ├── Error.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── TaskDetails.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   └── todoService.js
│   ├── styles/
│   │   ├── components.css
│   │   ├── global.css
│   │   └── pages.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```
