import { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface GlassCardProps {
    children: ReactNode
    className?: string
    noPadding?: boolean
    style?: React.CSSProperties
}

export function GlassCard({ children, className, noPadding = false, style }: GlassCardProps) {
    return (
        <div className={cn('glass-card', !noPadding && 'p-8', className)} style={style}>
            {children}
        </div>
    )
}
