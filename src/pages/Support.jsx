import { Button } from '../components/Button';
import { Mail, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Support = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 animate-fade-in text-center">

            <div className="max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="text-4xl font-bold text-text-main tracking-tight">How can we help?</h1>
                <p className="text-text-muted text-lg">Support the development or report issues directly to the team.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Card */}
                <div className="bg-bg-panel border border-white/5 p-8 rounded-2xl flex flex-col items-center hover:border-brand-primary/30 transition-colors">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-6">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2">Contact Us</h3>
                    <p className="text-text-muted mb-8 max-w-sm">
                        Have questions or suggestions? Reach out directly via email.
                    </p>
                    <a href="mailto:jinggstack@gmail.com" className="w-full">
                        <Button className="w-full">
                            jinggstack@gmail.com
                        </Button>
                    </a>
                </div>

                {/* Bug Report Card */}
                <div className="bg-bg-panel border border-white/5 p-8 rounded-2xl flex flex-col items-center hover:border-status-error/30 transition-colors">
                    <div className="w-16 h-16 bg-status-error/10 rounded-full flex items-center justify-center text-status-error mb-6">
                        <Bug size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2">Report a bug</h3>
                    <p className="text-text-muted mb-8 max-w-sm">
                        Found something broken? Let us know and we'll fix it in the next update.
                    </p>
                    <Button variant="outline" className="w-full border-status-error text-status-error hover:bg-status-error/10">
                        Open Issue
                    </Button>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-text-muted text-sm">
                <p>Designed and built for the community.</p>
            </div>
        </div>
    );
};
