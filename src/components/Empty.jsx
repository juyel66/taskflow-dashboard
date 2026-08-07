/**
 * Reusable Empty state component displayed when list contains no items.
 * @param {Object} props
 * @param {string} [props.title='No tasks found'] - Heading title
 * @param {string} [props.subtitle='Your task list is empty. Add a new task to get started!'] - Description text
 */
const Empty = ({
  title = 'No tasks found',
  subtitle = 'Your task list is empty. Add a new task to get started!',
}) => {
  return (
    <div className="empty-container">
      <div className="empty-icon-wrapper" aria-hidden="true">
        📋
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-subtitle">{subtitle}</p>
    </div>
  );
};

export default Empty;
