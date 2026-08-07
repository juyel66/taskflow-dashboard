import { useState } from 'react';

/**
 * AddTask Component allows creating a new todo item.
 * Disables button & input while request is running.
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback to handle task creation
 * @param {boolean} props.isAdding - Loading state indicator
 */
const AddTask = ({ onAddTask, isAdding }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle || isAdding) {
      return;
    }

    const success = await onAddTask(trimmedTitle);
    if (success !== false) {
      setTitle('');
    }
  };

  return (
    <div className="add-task-card">
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="add-task-input-wrapper">
          <input
            type="text"
            className="add-task-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isAdding}
            aria-label="New task title"
          />
        </div>
        <button
          type="submit"
          className="add-task-button"
          disabled={isAdding || !title.trim()}
        >
          {isAdding ? (
            <>
              <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
              Adding...
            </>
          ) : (
            <>
              <span>+</span> Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
