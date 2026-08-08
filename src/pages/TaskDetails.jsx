import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa6';
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
  const [isNotFound, setIsNotFound] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadTaskDetails = async () => {
      const localTask = tasks.find((t) => String(t.id) === String(id));

      if (localTask) {
        if (!ignore) {
          setTask(localTask);
          setError(null);
          setIsNotFound(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const data = await getTodoById(id);
        if (!ignore) {
          setTask(data);
          setError(null);
          setIsNotFound(false);
        }
      } catch (err) {
        if (!ignore) {
          if (err.response?.status === 404) {
            setIsNotFound(true);
            setError(null);
          } else {
            setError(err.message || `Failed to fetch details for task #${id}.`);
            setIsNotFound(false);
          }
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

  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    setIsNotFound(false);
    try {
      const data = await getTodoById(id);
      setTask(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setIsNotFound(true);
      } else {
        setError(err.message || `Failed to fetch details for task #${id}.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <Error
          title="Task Load Error"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (isNotFound || !task) {
    return (
      <div className="container">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <Error
          title="Task Not Found"
          message="This task is no longer available from the API."
        />
      </div>
    );
  }

  return (
    <div className="container task-details-wrapper">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to Dashboard
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
