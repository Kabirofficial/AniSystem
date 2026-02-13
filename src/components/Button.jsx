import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

export const Button = forwardRef(({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-main disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-brand-primary text-white hover:bg-blue-600 focus:ring-brand-primary shadow-lg shadow-brand-primary/20",
        secondary: "bg-bg-panel text-text-main border border-white/10 hover:bg-slate-700 focus:ring-slate-500",
        outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",
        ghost: "bg-transparent text-text-muted hover:text-text-main hover:bg-white/5",
        danger: "bg-status-error text-white hover:bg-red-600 focus:ring-status-error",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            ref={ref}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";
