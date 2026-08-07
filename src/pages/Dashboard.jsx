import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

/**
 * Dashboard Page component presenting task creation form and the task list.
 */
const Dashboard = ({
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
    <div className="container">
      <AddTask onAddTask={onAddTask} isAdding={isAdding} />
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
