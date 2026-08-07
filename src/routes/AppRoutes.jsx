import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TaskDetails from '../pages/TaskDetails';

/**
 * Application routing component.
 * Passes shared task state and CRUD handlers to pages.
 */
const AppRoutes = ({
  tasks,
  isLoading,
  error,
  isAdding,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onRetry,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            isAdding={isAdding}
            onAddTask={onAddTask}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onRetry={onRetry}
          />
        }
      />
      <Route
        path="/tasks/:id"
        element={<TaskDetails tasks={tasks} onDeleteTask={onDeleteTask} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
