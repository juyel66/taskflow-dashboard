/**
 * Reusable Loading indicator component.
 * @param {Object} props
 * @param {string} [props.message='Loading tasks...'] - Optional message to display
 */
const Loading = ({ message = 'Loading tasks...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
