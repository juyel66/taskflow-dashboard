/**
 * Reusable Error display component with optional retry callback.
 * @param {Object} props
 * @param {string} [props.title='Something went wrong'] - Error heading
 * @param {string} [props.message='Failed to fetch data. Please try again.'] - Error message body
 * @param {Function} [props.onRetry] - Function to trigger on retry button click
 */
const Error = ({
  title = 'Something went wrong',
  message = 'Failed to fetch data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon-wrapper" aria-hidden="true">
        !
      </div>
      <h3 className="error-title">{title}</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button type="button" className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
