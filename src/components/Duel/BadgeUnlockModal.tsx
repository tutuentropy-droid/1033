import { useEffect, useState } from 'react';
import { X, Award, Sparkles, CheckCircle } from 'lucide-react';
import ParchmentCard from '@/components/shared/ParchmentCard';
import type { Badge } from '@/types';
import { cn } from '@/lib/utils';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

const getRarityStyle = (rarity: Badge['rarity']) => {
  switch (rarity) {
    case 'legendary':
      return {
        bg: 'from-yellow-400 via-orange-400 to-amber-500',
        text: 'text-yellow-50',
        glow: 'shadow-yellow-500/50',
        particle: 'bg-yellow-300',
        label: '传说级徽章',
        labelBg: 'bg-gradient-to-r from-yellow-600 to-orange-600',
      };
    case 'rare':
      return {
        bg: 'from-purple-400 via-indigo-400 to-violet-500',
        text: 'text-purple-50',
        glow: 'shadow-purple-500/50',
        particle: 'bg-purple-300',
        label: '稀有徽章',
        labelBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      };
    default:
      return {
        bg: 'from-gray-400 via-slate-400 to-zinc-500',
        text: 'text-gray-50',
        glow: 'shadow-gray-500/50',
        particle: 'bg-gray-300',
        label: '普通徽章',
        labelBg: 'bg-gradient-to-r from-gray-600 to-slate-600',
      };
  }
};

export default function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const style = getRarityStyle(badge.rarity);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 1.5,
    }));
    setParticles(newParticles);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            'absolute w-2 h-2 rounded-full animate-float-up',
            style.particle
          )}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
      
      <div className="relative z-10 w-full max-w-md">
        <div className={cn(
          'absolute -inset-1 rounded-3xl bg-gradient-to-r blur-xl opacity-60 animate-pulse',
          style.bg,
          style.glow,
          'shadow-2xl'
        )} />
        
        <ParchmentCard className="relative p-8 md:p-10 overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-tavern-wood/50 hover:text-tavern-wood transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className={cn(
            'absolute inset-0 opacity-5 bg-gradient-to-br',
            style.bg
          )} />

          <div className="relative flex flex-col items-center text-center">
            <div className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-display mb-6 shadow-lg',
              style.labelBg
            )}>
              <Sparkles size={14} />
              ✨ {style.label}解锁 ✨
            </div>

            <div className="relative mb-6">
              <div className={cn(
                'absolute -inset-4 rounded-full bg-gradient-to-r blur-2xl opacity-40 animate-pulse',
                style.bg
              )} />
              <div className={cn(
                'relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl',
                'bg-gradient-to-br',
                style.bg
              )}>
                <div className="absolute inset-1 rounded-full bg-white/20 backdrop-blur-sm" />
                <span className="relative text-6xl drop-shadow-2xl animate-bounce-in">
                  {badge.icon}
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-lg">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-xs font-semibold text-green-700">已永久解锁</span>
                </div>
              </div>
            </div>

            <h2 className={cn(
              'font-display text-3xl md:text-4xl mb-3 bg-gradient-to-r bg-clip-text text-transparent animate-gradient',
              style.bg
            )}>
              {badge.name}
            </h2>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-tavern-gold to-transparent mb-4" />

            <p className="text-tavern-ink/80 font-serif mb-6 leading-relaxed text-sm md:text-base">
              {badge.description}
            </p>

            <div className="w-full p-4 bg-parchment-200/50 rounded-xl border border-parchment-300 mb-6">
              <div className="flex items-start gap-2 text-left">
                <Award size={18} className="text-tavern-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-tavern-wood mb-0.5">解锁条件</p>
                  <p className="text-sm text-tavern-ink/80 font-serif">
                    {badge.unlockCondition}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className={cn(
                'w-full py-4 px-8 rounded-xl font-display text-lg text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]',
                'bg-gradient-to-r',
                style.bg
              )}
            >
              🎉 收下这份荣耀
            </button>
          </div>
        </ParchmentCard>
      </div>
    </div>
  );
}
