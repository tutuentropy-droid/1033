import { useNavigate } from 'react-router-dom';
import { Beaker, BookOpen, Trophy } from 'lucide-react';
import TavernBackground from '@/components/Tavern/TavernBackground';
import PhilosopherCard from '@/components/Tavern/PhilosopherCard';
import ParchmentCard from '@/components/shared/ParchmentCard';
import { philosophers } from '@/data/philosophers';
import { useGameStore } from '@/store/useGameStore';
import type { Philosopher } from '@/types';

export default function Tavern() {
  const navigate = useNavigate();
  const { setCurrentPhilosopher, score, resetGame } = useGameStore();

  const handleSelectPhilosopher = (philosopher: Philosopher) => {
    setCurrentPhilosopher(philosopher);
    navigate(`/duel/${philosopher.id}`);
  };

  return (
    <TavernBackground>
      <div className="min-h-screen flex flex-col">
        <header className="pt-8 pb-4 px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Beaker size={36} className="text-tavern-gold" />
            <h1 className="title-display">杠精酒馆</h1>
            <Beaker size={36} className="text-tavern-gold" />
          </div>
          <p className="text-parchment-100/90 font-serif text-lg italic">
            与智者把酒言欢，在质问中探寻真理
          </p>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="max-w-5xl w-full">
            <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
              <ParchmentCard className="px-6 py-3 flex items-center gap-3">
                <Trophy size={24} className="text-tavern-gold" />
                <div>
                  <p className="text-xs text-tavern-wood/70">总得分</p>
                  <p className="text-2xl font-bold text-tavern-ink">{score}</p>
                </div>
              </ParchmentCard>
              
              <button
                onClick={resetGame}
                className="btn-parchment text-sm flex items-center gap-2"
              >
                <BookOpen size={18} />
                重置进度
              </button>
            </div>

            <h2 className="text-center text-parchment-100 font-display text-2xl mb-6">
              选择一位哲学家开始对决
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {philosophers.map((philosopher) => (
                <PhilosopherCard
                  key={philosopher.id}
                  philosopher={philosopher}
                  onSelect={handleSelectPhilosopher}
                />
              ))}
            </div>
          </div>
        </div>

        <footer className="py-6 text-center text-parchment-200/70 text-sm font-serif">
          <p>「杠精酒馆」—— 哲学，从质问开始</p>
        </footer>
      </div>
    </TavernBackground>
  );
}
