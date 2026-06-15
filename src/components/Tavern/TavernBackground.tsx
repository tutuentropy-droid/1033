import { Flame, Wine, BookOpen, Feather } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TavernBackgroundProps {
  children: React.ReactNode;
}

export default function TavernBackground({ children }: TavernBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(62, 39, 35, 0.9) 0%, rgba(93, 64, 55, 0.8) 30%, rgba(245, 230, 200, 0.9) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: 'overlay',
        }}
      />

      <div className="absolute top-8 left-8 candle-glow z-10">
        <div className="relative">
          <div className="w-3 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90 blur-[1px]" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-orange-600 to-yellow-300 rounded-full" />
          </div>
          <Flame size={24} className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-amber-100" />
        </div>
      </div>

      <div className="absolute top-8 right-8 candle-glow z-10" style={{ animationDelay: '1s' }}>
        <div className="relative">
          <div className="w-3 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90 blur-[1px]" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-orange-600 to-yellow-300 rounded-full" />
          </div>
          <Flame size={24} className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-amber-100" />
        </div>
      </div>

      <div className="absolute bottom-20 left-12 z-10 opacity-60">
        <Wine size={48} className="text-tavern-wine rotate-12" />
      </div>

      <div className="absolute bottom-24 right-16 z-10 opacity-60">
        <BookOpen size={40} className="text-tavern-wood -rotate-12" />
        <Feather size={32} className="text-tavern-ink absolute top-4 right-4 rotate-45" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 z-0">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(93, 64, 55, 0.4) 50%, rgba(62, 39, 35, 0.6) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-tavern-wood via-tavern-dark to-tavern-wood">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.1) 60px, rgba(0,0,0,0.1) 62px)',
          }} />
        </div>
      </div>

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
