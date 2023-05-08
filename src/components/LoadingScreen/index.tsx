const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div className="spinner-container d-flex flex-column align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="loading-text mt-2">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;