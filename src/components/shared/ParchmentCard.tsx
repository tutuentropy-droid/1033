import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ParchmentCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'scroll' | 'elevated';
}

export default function ParchmentCard({ 
  children, 
  className, 
  variant = 'default' 
}: ParchmentCardProps) {
  const baseStyles = 'bg-parchment-50 border-2 border-parchment-400 rounded-lg shadow-lg';
  const backgroundStyles = {
    backgroundImage: `
      linear-gradient(135deg, rgba(255,248,220,0.8) 0%, rgba(245,230,200,0.9) 100%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23f5e6c8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")
    `,
    backgroundBlendMode: 'multiply',
  };

  const variantStyles = {
    default: '',
    scroll: 'relative overflow-hidden pt-8 pb-8',
    elevated: 'shadow-xl transform hover:shadow-2xl transition-all duration-300',
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={backgroundStyles}
    >
      {variant === 'scroll' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-parchment-300 via-parchment-200 to-parchment-300 rounded-t-lg" />
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-parchment-300 via-parchment-200 to-parchment-300 rounded-b-lg" />
        </>
      )}
      {children}
    </div>
  );
}
