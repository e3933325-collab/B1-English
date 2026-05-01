import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Trophy, 
  RefreshCcw,
  Sparkles,
  Loader2
} from 'lucide-react';
import { curriculum, Topic } from './data/curriculum.ts';
import { getTopicContent } from './lib/gemini.ts';

// --- Components ---

const Header = ({ onBack }: { onBack?: () => void }) => (
  <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b-2 border-ink py-6 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between mb-12">
    <div className="flex items-center gap-6">
      {onBack && (
        <button 
          onClick={onBack}
          className="p-2 hover:bg-line/20 rounded-full transition-colors border border-line"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1 drop-shadow-sm">Intermediate Curriculum</span>
        <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight leading-none text-ink">B1 English Mastery</h1>
      </div>
    </div>
    <div className="hidden md:block text-right">
      <p className="font-serif italic text-muted text-sm border-r-4 border-accent pr-4">Програма навчання — 2026</p>
    </div>
  </header>
);

interface TopicCardProps {
  topic: Topic;
  onClick: () => void | Promise<void>;
  index: number;
  key?: string | number;
}

const TopicCard = ({ topic, onClick, index }: TopicCardProps) => {
  const displayIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group py-8 md:px-8 border-b md:border-b-0 md:border-r border-line last:border-r-0 flex flex-col justify-between cursor-pointer transition-all hover:bg-white/40"
    >
      <div>
        <div className="font-serif text-xs opacity-60 mb-6 italic tracking-wider">Розділ {displayIndex}</div>
        <h3 className="text-2xl font-serif text-ink mb-3 group-hover:text-accent transition-colors leading-tight">
          {topic.titleUk}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-8 font-sans">
          {topic.descriptionUk}
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button className="bg-ink text-white px-6 py-3 text-[10px] uppercase font-bold tracking-[0.15em] hover:bg-accent transition-colors">
            Вчити зараз
          </button>
          <ArrowRight className="w-4 h-4 text-ink opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
        <div className="w-full h-[2px] bg-line overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-accent"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Quiz = ({ questions, onComplete }: { questions: any[], onComplete: () => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    const correct = idx === questions[currentIdx].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedIdx(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  const q = questions[currentIdx];

  return (
    <div className="space-y-16">
      <header className="flex justify-between items-baseline border-b border-ink/10 pb-6">
        <h3 className="text-2xl font-serif italic text-ink">Екзаменаційний розділ {currentIdx + 1} з {questions.length}</h3>
        <div className="text-right">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Поточний результат</span>
          <span className="text-xl font-serif text-ink">{score} очок</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full border border-ink flex items-center justify-center font-serif italic text-xl">Q</div>
          <p className="text-3xl font-serif text-ink leading-tight">{q.question}</p>
        </div>

        <div className="grid gap-5">
          {q.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              disabled={selectedIdx !== null}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-6 transition-all font-serif text-xl border-l-4 group relative ${
                selectedIdx === idx 
                  ? (idx === q.correctIndex ? 'border-accent bg-accent/5' : 'border-ink bg-ink/5')
                  : (selectedIdx !== null && idx === q.correctIndex ? 'border-accent bg-accent/5' : 'border-line/30 hover:border-accent hover:bg-white/50')
              }`}
            >
              <span className="opacity-30 mr-6 italic font-sans text-sm tracking-tighter">0{idx + 1}.</span>
              {opt}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-accent" />
              </div>
            </button>
          ))}
        </div>
        
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 p-10 border-2 border-ink bg-white relative shadow-[10px_10px_0px_0px_rgba(26,26,26,0.05)]"
            >
              <div className={`absolute -top-3 left-8 px-4 py-1 text-[10px] uppercase font-bold text-white tracking-widest ${isCorrect ? 'bg-accent shadow-sm' : 'bg-ink shadow-sm'}`}>
                {isCorrect ? 'Correct Assessment' : 'Revision Required'}
              </div>
              <p className="text-lg font-serif italic text-ink/80 leading-relaxed mb-8">{q.explanation}</p>
              <button 
                onClick={nextQuestion}
                className="flex items-center gap-4 bg-ink text-white pr-8 pl-10 py-4 text-[10px] uppercase font-bold tracking-[0.25em] hover:bg-accent transition-all group"
              >
                <span>{currentIdx < questions.length - 1 ? 'Наступне запитання' : 'Підсумувати результати'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topicData, setTopicData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'dashboard' | 'learning' | 'completed'>('dashboard');

  const handleTopicSelect = async (topic: Topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setView('learning');
    
    try {
      const data = await getTopicContent(topic.title);
      setTopicData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView('dashboard');
    setSelectedTopic(null);
    setTopicData(null);
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans selection:bg-accent/20">
      <Header onBack={view !== 'dashboard' ? handleBack : undefined} />

      <main className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-16 border-l-8 border-ink pl-10 py-4">
                <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-6 text-ink">B1 Curriculum.</h2>
                <p className="text-xl text-muted max-w-2xl font-serif italic">
                  Повне занурення в англійську мову на рівні Intermediate. <br className="hidden md:block"/>
                  Оберіть модуль для детального вивчення сьогодні.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
                {curriculum.map((topic, idx) => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic} 
                    index={idx}
                    onClick={() => handleTopicSelect(topic)} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-8">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-accent animate-spin" />
                    <Sparkles className="w-6 h-6 text-ink absolute -top-2 -right-2 animate-bounce" />
                  </div>
                  <p className="text-muted font-serif italic text-xl">Curating your editorial lessons...</p>
                </div>
              ) : topicData ? (
                <div className="space-y-24">
                  {/* Explanation Section */}
                  <section className="bg-white p-10 md:p-16 border-2 border-ink shadow-[15px_15px_0px_0px_rgba(26,26,26,0.03)]">
                    <div className="flex items-center gap-4 text-accent mb-12">
                      <div className="w-10 h-px bg-accent"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{selectedTopic?.titleUk} / Module Data</span>
                    </div>
                    
                    <div className="prose prose-stone max-w-none">
                      <div className="text-2xl md:text-3xl font-serif italic leading-snug text-ink mb-16 whitespace-pre-wrap border-l-4 border-accent pl-10 py-4">
                        {topicData.explanation}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-8 border-t border-line pt-8">
                          <h4 className="font-serif italic text-xl text-ink">Ключові принципи</h4>
                          <ul className="space-y-6">
                            {topicData.keyRules.map((rule: string, i: number) => (
                              <li key={i} className="flex gap-4 items-start group">
                                <span className="text-accent font-bold mt-1 text-xs tracking-tighter">0{i+1}</span>
                                <span className="text-muted text-sm leading-relaxed border-b border-transparent group-hover:border-line transition-colors">{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-8 border-t border-line pt-8">
                          <h4 className="font-serif italic text-xl text-ink">Контекстуальні приклади</h4>
                          <div className="space-y-6">
                            {topicData.examples.map((ex: any, i: number) => (
                              <div key={i} className="group">
                                <p className="text-lg font-serif italic text-ink group-hover:text-accent transition-colors underline decoration-line underline-offset-4">{ex.en}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted mt-2 opacity-60">{ex.uk}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Quiz Section */}
                  <Quiz 
                    questions={topicData.practice} 
                    onComplete={() => setView('completed')} 
                  />
                </div>
              ) : (
                <div className="text-center py-24 bg-white border-2 border-line">
                  <RefreshCcw className="w-12 h-12 text-muted mx-auto mb-8 opacity-20" />
                  <p className="text-ink font-serif italic text-xl mb-8">Матеріал не вдалося сформувати.</p>
                  <button onClick={() => handleTopicSelect(selectedTopic!)} className="bg-ink text-white px-10 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-accent transition-all">Спробувати ще раз</button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white border-2 border-ink shadow-[20px_20px_0px_0px_rgba(26,26,26,0.05)] max-w-2xl mx-auto px-10"
            >
              <div className="inline-flex p-6 rounded-full border-2 border-accent mb-10">
                <Trophy className="w-12 h-12 text-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-ink mb-6">Прогрес підтверджено.</h2>
              <p className="text-muted font-serif italic text-lg mb-12 leading-relaxed">
                Вітаємо! Ви успішно опрацювали навчальний блок <br/>
                <span className="text-ink decoration-accent underline underline-offset-8">"{selectedTopic?.titleUk}"</span>.
              </p>
              <button 
                onClick={handleBack}
                className="bg-ink text-white px-12 py-5 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-accent transition-all shadow-xl shadow-ink/10"
              >
                Повернутися до Програми
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-6 md:px-10 py-16 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-muted">
          <a href="#" className="hover:text-accent transition-colors">Повна Програма</a>
          <a href="#" className="hover:text-accent transition-colors">Словник</a>
          <a href="#" className="hover:text-accent transition-colors">Граматика</a>
          <a href="#" className="hover:text-accent transition-colors">Статистика</a>
        </div>
        <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em]">
          Edition 2026 &bull; <span className="text-ink">Intermediate Mastering B1</span>
        </p>
      </footer>
    </div>
  );
}
