import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * TaskItem Component displays an individual todo with completion toggle and delete button.
 * @param {Object} props
 * @param {Object} props.task - Task object { id, title, completed }
 * @param {Function} props.onToggleTask - Callback when checking/unchecking task
 * @param {Function} props.onDeleteTask - Callback when clicking delete button
 */
const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling || isDeleting) return;
    setIsToggling(true);
    try {
      await onToggleTask(task.id, !task.completed);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting || isToggling) return;
    setIsDeleting(true);
    try {
      await onDeleteTask(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'task-item-completed' : ''}`}>
      <div className="task-item-left">
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={Boolean(task.completed)}
            onChange={handleToggle}
            disabled={isToggling || isDeleting}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </label>
        <Link
          to={`/tasks/${task.id}`}
          className={`task-item-title-link ${task.completed ? 'completed' : ''}`}
          title="Click to view details"
        >
          {task.title}
        </Link>
      </div>

      <div className="task-item-actions">
        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          disabled={isDeleting || isToggling}
          aria-label={`Delete task "${task.title}"`}
        >
          {isDeleting ? (
            <span>Deleting...</span>
          ) : (
            <>
              <span aria-hidden="true">🗑</span> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
