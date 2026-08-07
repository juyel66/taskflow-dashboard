import TaskItem from './TaskItem';
import Loading from './Loading';
import Error from './Error';
import Empty from './Empty';

/**
 * TaskList Component renders the collection of task items or appropriate state UI (loading, error, empty).
 * @param {Object} props
 * @param {Array} props.tasks - Array of todo objects
 * @param {boolean} props.isLoading - Initial loading state
 * @param {string|null} props.error - Error message if fetch failed
 * @param {Function} props.onRetry - Retry callback for error state
 * @param {Function} props.onToggleTask - Toggle completed state callback
 * @param {Function} props.onDeleteTask - Delete task callback
 */
const TaskList = ({
  tasks,
  isLoading,
  error,
  onRetry,
  onToggleTask,
  onDeleteTask,
}) => {
  if (isLoading) {
    return <Loading message="Fetching your tasks..." />;
  }

  if (error) {
    return <Error title="Failed to Load Tasks" message={error} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return <Empty title="No tasks found" subtitle="Your task list is empty. Add a new task above!" />;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">Your Tasks</h2>
        <span className="task-count-badge">{tasks.length} tasks</span>
      </div>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
