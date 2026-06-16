import { useState, useEffect } from 'react';
import { Dices, RotateCcw, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DiceResult } from '@/types';

interface EternalRecurrenceDiceProps {
  result: DiceResult | null;
  isRolling: boolean;
  hasRerolled: boolean;
  ubermenschWill: number;
  onReroll: () => boolean;
  disabled?: boolean;
}

const diceFaces: Record<DiceResult, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

const getDiceToneColor = (result: DiceResult | null) => {
  if (!result) return 'text-tavern-wood';
  if (result === 6) return 'text-yellow-500';
  if (result === 5) return 'text-green-500';
  if (result === 3 || result === 4) return 'text-tavern-wood';
  if (result === 2) return 'text-orange-500';
  return 'text-red-500';
};

const getDiceToneBg = (result: DiceResult | null) => {
  if (!result) return 'bg-parchment-100';
  if (result === 6) return 'bg-gradient-to-br from-yellow-100 to-amber-200';
  if (result === 5) return 'bg-gradient-to-br from-green-100 to-emerald-200';
  if (result === 3 || result === 4) return 'bg-parchment-100';
  if (result === 2) return 'bg-gradient-to-br from-orange-100 to-orange-200';
  return 'bg-gradient-to-br from-red-100 to-rose-200';
};

const getDiceToneBorder = (result: DiceResult | null) => {
  if (!result) return 'border-tavern-gold/50';
  if (result === 6) return 'border-yellow-500 shadow-lg shadow-yellow-500/30';
  if (result === 5) return 'border-green-500 shadow-md shadow-green-500/20';
  if (result === 3 || result === 4) return 'border-tavern-gold/50';
  if (result === 2) return 'border-orange-500 shadow-md shadow-orange-500/20';
  return 'border-red-500 shadow-lg shadow-red-500/30';
};

export default function EternalRecurrenceDice({
  result,
  isRolling,
  hasRerolled,
  ubermenschWill,
  onReroll,
  disabled = false,
}: EternalRecurrenceDiceProps) {
  const [displayFace, setDisplayFace] = useState<DiceResult>(1);
  const canReroll = !hasRerolled && ubermenschWill >= 3 && result !== null && !isRolling && !disabled;

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayFace((Math.floor(Math.random() * 6) + 1) as DiceResult);
      }, 80);
      return () => clearInterval(interval);
    } else if (result) {
      setDisplayFace(result);
    }
  }, [isRolling, result]);

  const handleReroll = () => {
    if (canReroll) {
      onReroll();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Dices size={18} className="text-purple-400" />
        <span className="text-parchment-100 font-display text-sm">
          永恒轮回骰子
        </span>
      </div>

      <div className="relative">
        <div
          className={cn(
            'w-20 h-20 rounded-2xl border-4 flex items-center justify-center text-6xl transition-all duration-300',
            getDiceToneBg(result),
            getDiceToneBorder(result),
            isRolling && 'animate-shake',
            result === 6 && !isRolling && 'animate-pulse'
          )}
        >
          <span className={cn('transition-colors duration-300', getDiceToneColor(result))}>
            {diceFaces[displayFace]}
          </span>
        </div>

        {result === 6 && !isRolling && (
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            ✨
          </div>
        )}
        {result === 1 && !isRolling && (
          <div className="absolute -top-2 -right-2 text-2xl">
            💀
          </div>
        )}
      </div>

      {result && !isRolling && (
        <div className="text-center space-y-1">
          {result === 6 && (
            <>
              <p className="text-yellow-400 font-display text-sm animate-pulse">
                永恒轮回！双倍分数！
              </p>
              <p className="text-yellow-300/80 font-serif text-xs">
                无论对错都算正确，得分 ×2
              </p>
            </>
          )}
          {result === 5 && (
            <>
              <p className="text-green-400 font-display text-sm">
                命运眷顾
              </p>
              <p className="text-green-300/80 font-serif text-xs">
                吉星高照，正常得分，好运常伴
              </p>
            </>
          )}
          {result === 4 && (
            <>
              <p className="text-parchment-100/90 font-display text-sm">
                命运平顺
              </p>
              <p className="text-parchment-100/60 font-serif text-xs">
                四平八稳，正常得分，全凭实力
              </p>
            </>
          )}
          {result === 3 && (
            <>
              <p className="text-parchment-100/80 font-display text-sm">
                命运平常
              </p>
              <p className="text-parchment-100/50 font-serif text-xs">
                不好不坏，正常得分，谨慎行事
              </p>
            </>
          )}
          {result === 2 && (
            <>
              <p className="text-orange-400 font-display text-sm">
                命运沉重
              </p>
              <p className="text-orange-300/80 font-serif text-xs">
                步履维艰，正常得分，答错扣分加倍
              </p>
            </>
          )}
          {result === 1 && (
            <>
              <p className="text-red-400 font-display text-sm">
                深渊凝视... 半分收场
              </p>
              <p className="text-red-300/80 font-serif text-xs">
                即使答对也只有一半分数
              </p>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/50 rounded-lg border border-purple-500/30">
            <Zap size={14} className="text-purple-400" />
            <span className="text-purple-200 font-serif text-sm">
              超人意志: <span className="font-bold text-purple-100">{ubermenschWill}</span>
            </span>
          </div>

          <button
            onClick={handleReroll}
            disabled={!canReroll}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-display text-sm transition-all',
              canReroll
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            )}
            title={hasRerolled ? '本题已重掷过' : ubermenschWill < 3 ? '超人意志不足（需3点）' : '消耗3点超人意志重掷'}
          >
            <RotateCcw size={14} />
            重掷
          </button>
        </div>

        <div className="text-center">
          {hasRerolled ? (
            <p className="text-gray-400 font-serif text-xs">
              本题已消耗重掷机会
            </p>
          ) : ubermenschWill < 3 ? (
            <p className="text-orange-400 font-serif text-xs">
              重掷需消耗 3 点超人意志（当前 {ubermenschWill} 点）
            </p>
          ) : (
            <p className="text-purple-300 font-serif text-xs">
              点击重掷消耗 3 点超人意志，改变命运
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
