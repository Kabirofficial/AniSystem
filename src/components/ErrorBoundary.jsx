import React from 'react';
import { Button } from './Button';
import { AlertOctagon } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
                    <div className="bg-bg-panel border border-status-error/20 rounded-xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
                        <div className="w-16 h-16 bg-status-error/10 rounded-full flex items-center justify-center mx-auto text-status-error mb-4">
                            <AlertOctagon size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
                        <p className="text-text-muted">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        <div className="pt-4">
                            <Button onClick={() => window.location.reload()} className="w-full">
                                Refresh Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
