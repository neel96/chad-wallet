"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-2">
            <p className="text-sm text-[#6b7280]">Something went wrong</p>
            <p className="text-xs text-[#374151] font-mono">{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
