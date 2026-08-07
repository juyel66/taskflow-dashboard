import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Initial fetch of 10 todos on app mount
  useEffect(() => {
    let ignore = false;

    const fetchInitialTasks = async () => {
      try {
        const data = await getTodos(10);
        if (!ignore) {
          setTasks(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load tasks from server. Please try again.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchInitialTasks();

    return () => {
      ignore = true;
    };
  }, []);

  // Retry loading tasks if initial fetch failed
  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodos(10);
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Unable to load tasks from server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

  // Handler: Add a new task
  const handleAddTask = async (title) => {
    setIsAdding(true);
    try {
      const newTodo = await createTodo(title);
      
      const uniqueId = tasks.some((t) => String(t.id) === String(newTodo.id))
        ? Date.now()
        : newTodo.id;

      const createdTask = {
        ...newTodo,
        id: uniqueId,
        completed: false,
      };

      setTasks((prevTasks) => [createdTask, ...prevTasks]);
      return true;
    } catch (err) {
      alert(err.message || 'Failed to create task. Please try again.');
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  // Handler: Toggle task completed status
  const handleToggleTask = async (id, completed) => {
    try {
      await updateTodo(id, { completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          String(task.id) === String(id) ? { ...task, completed } : task
        )
      );
    } catch (err) {
      alert(err.message || 'Failed to update task status. Please try again.');
    }
  };

  // Handler: Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => String(task.id) !== String(id))
      );
    } catch (err) {
      alert(err.message || 'Failed to delete task. Please try again.');
      throw err;
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <Router>
      <div>
        <Header completedCount={completedCount} totalCount={totalCount} />
        <main>
          <AppRoutes
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            isAdding={isAdding}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onRetry={handleRetry}
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
