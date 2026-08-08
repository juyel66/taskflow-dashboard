import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getTodoById } from '../services/todoService';

/**
 * TaskDetails Page Component
 * Displays details for a single task using local React state first,
 * falling back to API fetch if the task is not in local state.
 * @param {Object} props
 * @param {Array} props.tasks - Central tasks state array
 * @param {Function} props.onDeleteTask - Central delete task handler
 */
const TaskDetails = ({ tasks = [], onDeleteTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load task details: check local state first, fallback to API call if missing
  useEffect(() => {
    let ignore = false;

    const loadTaskDetails = async () => {
      // 1. Check if task exists in central tasks state (e.g. newly created tasks or loaded tasks)
      const localTask = tasks.find((t) => String(t.id) === String(id));

      if (localTask) {
        if (!ignore) {
          setTask(localTask);
          setError(null);
          setIsLoading(false);
        }
        return;
      }

      // 2. Fallback: fetch from API if not present in local state
      try {
        const data = await getTodoById(id);
        if (!ignore) {
          setTask(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || `Failed to fetch details for task #${id}.`);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadTaskDetails();

    return () => {
      ignore = true;
    };
  }, [id, tasks]);

  // Retry fetching task details from API if failed
  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodoById(id);
      setTask(data);
    } catch (err) {
      setError(err.message || `Failed to fetch details for task #${id}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle task deletion from detail view
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDeleteTask(id);
      navigate('/', { replace: true });
    } catch {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Loading message={`Fetching task #${id} details...`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <Error
          title="Task Load Error"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <Error
          title="Task Not Found"
          message={`No task with ID #${id} could be located.`}
        />
      </div>
    );
  }

  return (
    <div className="container task-details-wrapper">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="task-details-card">
        <div className="task-details-header">
          <div className="task-details-title-group">
            <h2 className="task-details-title">{task.title}</h2>
            <div className="task-meta-badges">
              <span className="meta-badge">Task ID: #{task.id}</span>
              <span className="meta-badge">User ID: #{task.userId || 1}</span>
            </div>
          </div>

          <div className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
            <span>{task.completed ? '✓ Completed' : '⏳ Pending'}</span>
          </div>
        </div>

        <div className="task-details-body">
          <span className="section-label">Description</span>
          <p className="task-description">
            This is a placeholder description for task #{task.id}. In a full-featured backend, detailed notes, priority levels, sub-tasks, and activity logs would be managed here.
          </p>
        </div>

        <div className="task-details-footer">
          <button
            type="button"
            className="details-delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span>Deleting task...</span>
            ) : (
              <>
                <RiDeleteBin6Line /> Delete Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
