import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'ghost'
    className?: string
}

export function Button({
    children,
    variant = 'primary',
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                variant === 'primary' && 'btn-primary',
                variant === 'secondary' && 'btn-secondary',
                variant === 'ghost' && 'text-white/60 hover:text-white transition-colors',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
