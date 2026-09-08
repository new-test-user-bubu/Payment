const Loading = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'loading-small',
    medium: 'loading-medium',
    large: 'loading-large',
  };

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
