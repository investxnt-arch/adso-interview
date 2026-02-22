'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="border-4 border-[#FF006E] bg-[#111] p-8 text-center">
          <h2 className="text-[#FF006E] text-xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}