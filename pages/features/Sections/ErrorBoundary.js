import React, { Component } from 'react';
import { withRouter } from 'next/router';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Something went wrong.</h1>
      
    </div>
      
    }

    // Render the children component tree
    return this.props.children; 
  }
}

export default withRouter(ErrorBoundary);

