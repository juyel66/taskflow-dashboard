/**
 * Header component displays application title and completed tasks counter.
 * @param {Object} props
 * @param {number} props.completedCount - Number of completed tasks
 * @param {number} props.totalCount - Total number of tasks
 */
const Header = ({ completedCount = 0, totalCount = 0 }) => {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="header-brand">
          <div className="header-icon" aria-hidden="true">
            ✓
          </div>
          <h1 className="header-title">TaskFlow</h1>
        </div>

        <div className="completed-badge" aria-label={`Completed tasks: ${completedCount} of ${totalCount}`}>
          <span className="completed-badge-icon">✓</span>
          <span>
            {completedCount} of {totalCount} completed
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
