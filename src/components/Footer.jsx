import { Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full py-8 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-2 text-center">
                <p className="text-text-muted text-sm flex items-center gap-1.5">
                    &copy; {new Date().getFullYear()} AniSystem. Designed and built for the community.
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted/50 font-medium tracking-wide">
                    <span>by Jingg</span>
                    <span>•</span>
                    <a href="https://github.com/Kabirofficial/AniSystem" target="_blank" rel="noopener" className="hover:text-text-main transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};
