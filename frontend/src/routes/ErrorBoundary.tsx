import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl">
            Something went wrong. Please try again later.
          </h1>
          <h2 className="text-xl">
            If this issue persists, please report it by creating a{" "}
            <a
              className="text-red-500 hover:text-red-700"
              href="https://github.com/katyadam/change-impact-analysis/issues"
            >
              Github issue.
            </a>
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
