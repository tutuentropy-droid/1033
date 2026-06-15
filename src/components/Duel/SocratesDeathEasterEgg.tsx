import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronRight, BookOpen, Clock, User } from 'lucide-react';
import ParchmentCard from '@/components/shared/ParchmentCard';
import TypewriterText from '@/components/shared/TypewriterText';
import type { EasterEgg } from '@/types';
import { cn } from '@/lib/utils';

interface SocratesDeathEasterEggProps {
  easterEgg: EasterEgg;
  onClose: () => void;
  socratesAvatar: string;
}

export default function SocratesDeathEasterEgg({ easterEgg, onClose, socratesAvatar }: SocratesDeathEasterEggProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedDialogues, setDisplayedDialogues] = useState<number[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [typingForceCompleted, setTypingForceCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalDialogues = easterEgg.dialogues.length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedDialogues, currentIndex]);

  const handleTypewriterComplete = useCallback(() => {
    setIsTyping(false);
  }, []);

  const handleStart = useCallback(() => {
    setShowIntro(false);
    setDisplayedDialogues([0]);
    setCurrentIndex(0);
    setIsTyping(true);
    setTypingForceCompleted(false);
  }, []);

  const advanceToNext = useCallback(() => {
    if (currentIndex >= totalDialogues - 1) {
      return false;
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setDisplayedDialogues(prev => [...prev, nextIndex]);
    setIsTyping(true);
    setTypingForceCompleted(false);
    return true;
  }, [currentIndex, totalDialogues]);

  const handleUserAction = useCallback(() => {
    if (isTyping && !typingForceCompleted) {
      setTypingForceCompleted(true);
      setIsTyping(false);
      return;
    }

    if (currentIndex >= totalDialogues - 1) {
      onClose();
      return;
    }

    advanceToNext();
  }, [isTyping, typingForceCompleted, currentIndex, totalDialogues, advanceToNext, onClose]);

  const handleBubbleClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index === currentIndex) {
      handleUserAction();
    } else if (index < currentIndex) {
      // 点击历史对话气泡，不做处理
    }
  }, [currentIndex, handleUserAction]);

  const isLastDialogue = currentIndex >= totalDialogues - 1 && !isTyping;
  const currentSpeaker = easterEgg.dialogues[currentIndex]?.speaker;

  const getSpeakerStyle = (speaker: string) => {
    switch (speaker) {
      case '苏格拉底':
        return {
          avatar: socratesAvatar,
          color: 'bg-green-600',
          bubble: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 hover:shadow-lg hover:shadow-green-200/50',
          align: 'items-end',
          nameColor: 'text-green-700',
        };
      case '克里同':
        return {
          avatar: null,
          color: 'bg-blue-600',
          bubble: 'bg-gradient-to-br from-blue-50 to-sky-100 border-blue-300 hover:shadow-lg hover:shadow-blue-200/50',
          align: 'items-start',
          nameColor: 'text-blue-700',
        };
      case '旁白':
      default:
        return {
          avatar: null,
          color: 'bg-amber-600',
          bubble: 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 hover:shadow-lg hover:shadow-amber-200/50 cursor-pointer',
          align: 'items-center',
          nameColor: 'text-amber-700',
          isNarrator: true,
        };
    }
  };

  const renderDialogueContent = (dialogue: typeof easterEgg.dialogues[0], isCurrent: boolean) => {
    if (isCurrent && isTyping && !typingForceCompleted) {
      return (
        <TypewriterText 
          text={dialogue.text} 
          speed={20}
          onComplete={handleTypewriterComplete}
        />
      );
    }
    return dialogue.text;
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />
        
        <div className="relative z-10 w-full max-w-2xl animate-bounce-in">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500 blur-xl opacity-40 animate-pulse" />
          
          <ParchmentCard className="relative p-8 md:p-12 overflow-hidden">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-tavern-wood/50 hover:text-tavern-wood transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-400 blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl">
                  <img 
                    src={socratesAvatar} 
                    alt="苏格拉底"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm font-display shadow-lg whitespace-nowrap">
                  <BookOpen size={14} />
                  柏拉图《克里同篇》
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-tavern-wood mb-2">
                {easterEgg.title}
              </h1>

              <div className="flex items-center gap-2 mb-6 text-amber-700">
                <Clock size={16} />
                <span className="font-serif text-sm">公元前 399 年 · 雅典监狱</span>
              </div>

              <div className="w-full max-w-md mb-8 p-5 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-300">
                <p className="text-tavern-ink font-serif leading-relaxed text-sm md:text-base italic">
                  {easterEgg.description}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['克里同', '苏格拉底', '雅典法律'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-parchment-200/50 rounded-lg border border-parchment-300">
                    <User size={14} className="text-tavern-wood/60" />
                    <span className="text-sm text-tavern-ink/80 font-serif">{name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStart}
                className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 text-white rounded-xl font-display text-xl shadow-2xl hover:shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <BookOpen size={22} />
                  翻开历史对话
                  <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <p className="mt-4 text-xs text-tavern-wood/50 font-serif">
                点击对话气泡或"继续"按钮可推进，点击正在打字的对话可跳过动画
              </p>
            </div>
          </ParchmentCard>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-gradient-to-b from-gray-900 via-amber-950/95 to-gray-900">
      <header className="flex-shrink-0 px-4 py-4 border-b border-amber-900/50 bg-black/40 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg">
              <img src={socratesAvatar} alt="苏格拉底" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-lg text-amber-100">{easterEgg.title}</h2>
              <p className="text-xs text-amber-300/70 font-serif flex items-center gap-1">
                <Clock size={10} />
                公元前 399 年 · 雅典监狱
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-amber-300/70 font-serif">对话进度</div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-amber-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / totalDialogues) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-amber-200 font-mono w-12 text-right">
                  {currentIndex + 1}/{totalDialogues}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-amber-900/50 hover:bg-amber-800/50 text-amber-200 hover:text-amber-100 transition-all flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </header>

      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6"
        onClick={handleUserAction}
      >
        <div className="max-w-3xl mx-auto space-y-5">
          {displayedDialogues.map((dialogueIndex) => {
            const dialogue = easterEgg.dialogues[dialogueIndex];
            const style = getSpeakerStyle(dialogue.speaker);
            const isCurrent = dialogueIndex === currentIndex;
            const isNarrator = style.isNarrator;
            const isClickable = isCurrent || isNarrator;

            return (
              <div 
                key={dialogueIndex}
                className={cn(
                  'flex w-full animate-bounce-in',
                  style.align
                )}
              >
                {isNarrator ? (
                  <div 
                    className="w-full max-w-2xl mx-auto"
                    onClick={(e) => isCurrent && handleBubbleClick(e, dialogueIndex)}
                  >
                    <div className={cn(
                      'p-5 rounded-xl border-2 text-center transition-all duration-300',
                      style.bubble,
                      isCurrent && !isTyping && 'ring-2 ring-amber-400/50 ring-offset-2 ring-offset-transparent'
                    )}>
                      <p className={cn(
                        'text-xs font-display mb-2 tracking-wider',
                        style.nameColor
                      )}>
                        — {dialogue.speaker} —
                      </p>
                      <p className="text-tavern-ink font-serif leading-relaxed italic">
                        {renderDialogueContent(dialogue, isCurrent)}
                      </p>
                      {isCurrent && (
                        <div className={cn(
                          'mt-3 text-xs font-serif transition-opacity',
                          isTyping && !typingForceCompleted ? 'opacity-70' : 'opacity-100'
                        )}>
                          {isTyping && !typingForceCompleted
                            ? '（点击任意位置跳过动画）'
                            : '（点击任意位置继续）'
                          }
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className={cn(
                      'flex gap-3 max-w-[85%]',
                      dialogue.speaker === '苏格拉底' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white overflow-hidden',
                        style.color,
                      )}>
                        {style.avatar ? (
                          <img src={style.avatar} alt={dialogue.speaker} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-display text-lg">
                            {dialogue.speaker[0]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div 
                      className={cn(
                        'flex flex-col',
                        dialogue.speaker === '苏格拉底' ? 'items-end' : 'items-start'
                      )}
                    >
                      <p className={cn(
                        'text-xs font-display mb-1 px-2',
                        style.nameColor
                      )}>
                        {dialogue.speaker}
                      </p>
                      <div 
                        className={cn(
                          'p-4 rounded-2xl border-2 shadow-md transition-all duration-300 cursor-pointer',
                          style.bubble,
                          dialogue.speaker === '苏格拉底' 
                            ? 'rounded-tr-sm' 
                            : 'rounded-tl-sm',
                          isCurrent && !isTyping && 'ring-2 ring-amber-400/50 ring-offset-2 ring-offset-transparent'
                        )}
                        onClick={(e) => handleBubbleClick(e, dialogueIndex)}
                      >
                        <p className="text-tavern-ink font-serif leading-relaxed">
                          {renderDialogueContent(dialogue, isCurrent)}
                        </p>
                        {isCurrent && (
                          <div className={cn(
                            'mt-2 text-xs font-serif transition-opacity',
                            isTyping && !typingForceCompleted ? 'opacity-70' : 'opacity-100'
                          )}>
                            {isTyping && !typingForceCompleted
                              ? '（点击气泡跳过动画）'
                              : '（点击气泡继续）'
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && !typingForceCompleted && (
            <div className={cn(
              'flex',
              currentSpeaker === '苏格拉底' ? 'justify-end' : 'justify-start',
              (currentSpeaker === '旁白') && 'justify-center'
            )}>
              <div className={cn(
                'px-4 py-3 rounded-2xl',
                currentSpeaker === '苏格拉底' ? 'bg-green-100/50' :
                currentSpeaker === '克里同' ? 'bg-blue-100/50' :
                'bg-amber-100/50'
              )}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="flex-shrink-0 px-4 py-4 border-t border-amber-900/50 bg-black/40 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/60 text-amber-200 hover:text-amber-100 transition-all font-serif text-sm flex items-center gap-2"
          >
            <X size={16} />
            结束对话
          </button>

          {!isLastDialogue ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUserAction();
              }}
              className={cn(
                'px-8 py-3 rounded-xl font-display text-lg shadow-lg transition-all flex items-center gap-2',
                isTyping && !typingForceCompleted
                  ? 'bg-amber-800/50 text-amber-200 hover:bg-amber-800/70'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-amber-500/30'
              )}
            >
              {isTyping && !typingForceCompleted ? '跳过动画' : '继续对话'}
              <ChevronRight size={20} className={cn(isTyping && !typingForceCompleted && 'animate-pulse')} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="px-8 py-3 rounded-xl font-display text-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              ✨ 对话结束，铭记追问
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
