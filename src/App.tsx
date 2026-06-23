import React, { useState, useEffect, useRef } from 'react';
import { Question, QuizHistoryItem } from './types';
import { initialQuestions } from './data/questions';
import QuizEngine from './components/QuizEngine';
import Flashcards from './components/Flashcards';
import SpecExplorer from './components/SpecExplorer';
import SalesProcess from './components/SalesProcess';
import QuestionManager from './components/QuestionManager';
import RoleplaySimulator from './components/RoleplaySimulator';
import { 
  Trophy, 
  HelpCircle, 
  Flame, 
  Compass, 
  Workflow, 
  FileJson, 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  MapPin, 
  CheckSquare, 
  Layers,
  MessageSquare,
  Award,
  Shield,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('foton_academy_questions') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 500) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage reads are blocked/unavailable in this iframe:', e);
    }
    return initialQuestions;
  });

  const [activePortal, setActivePortal] = useState<'quiz' | 'flashcards' | 'specs' | 'timeline' | 'manager' | 'roleplay'>('quiz');

  // Mastered Questions telemetry tracking
  const [masteredQuestionIds, setMasteredQuestionIds] = useState<number[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('foton_mastered_questions') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading mastered questions from localStorage:', e);
    }
    return [];
  });

  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // User quiz progress over time history for Recharts
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('foton_quiz_history') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading quiz history from localStorage:', e);
    }
    return [
      { week: 'W1', rate: 58, date: '21/05' },
      { week: 'W2', rate: 64, date: '28/05' },
      { week: 'W3', rate: 71, date: '04/06' },
      { week: 'W4', rate: 76, date: '11/06' },
      { week: 'W5', rate: 85, date: '18/06' },
    ];
  });

  // Sync quiz history to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('foton_quiz_history', JSON.stringify(quizHistory));
      }
    } catch (e) {
      console.warn('Error saving quiz history to localStorage:', e);
    }
  }, [quizHistory]);

  // Sync questions to local Storage for durable persistence
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('foton_academy_questions', JSON.stringify(questions));
      }
    } catch (e) {
      console.warn('LocalStorage writes are blocked/unavailable in this iframe:', e);
    }
  }, [questions]);

  // Sync mastered questions to local Storage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('foton_mastered_questions', JSON.stringify(masteredQuestionIds));
      }
    } catch (e) {
      console.warn('Error saving mastered questions to localStorage:', e);
    }
  }, [masteredQuestionIds]);

  const [lastCelebratedMilestone, setLastCelebratedMilestone] = useState<number>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('foton_last_celebrated_milestone') : null;
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);

  useEffect(() => {
    const masteredCount = masteredQuestionIds.length;
    let milestoneToCelebrate = 0;
    if (masteredCount >= 600) {
      milestoneToCelebrate = 600;
    } else if (masteredCount >= 300) {
      milestoneToCelebrate = 300;
    } else if (masteredCount >= 100) {
      milestoneToCelebrate = 100;
    }

    if (milestoneToCelebrate > 0 && milestoneToCelebrate > lastCelebratedMilestone) {
      setCelebrationMilestone(milestoneToCelebrate);
      setLastCelebratedMilestone(milestoneToCelebrate);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('foton_last_celebrated_milestone', String(milestoneToCelebrate));
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, [masteredQuestionIds, lastCelebratedMilestone]);

  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(295);

  useEffect(() => {
    if (!showProgressDashboard || !chartRef.current) return;

    const currentRef = chartRef.current;
    
    // Set initial width
    if (currentRef.clientWidth) {
      setChartWidth(currentRef.clientWidth);
    }

    if (typeof ResizeObserver === 'undefined') {
      // Fallback for environments where ResizeObserver is not defined
      const handleResize = () => {
        if (currentRef.clientWidth) {
          setChartWidth(currentRef.clientWidth);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const observer = new ResizeObserver((entries) => {
      if (entries && entries[0]) {
        const { width } = entries[0].contentRect;
        if (width > 0) {
          setChartWidth(width);
        }
      }
    });

    observer.observe(currentRef);
    return () => {
      observer.unobserve(currentRef);
    };
  }, [showProgressDashboard]);

  const handleQuestionCorrect = (id: number) => {
    setMasteredQuestionIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const handleQuestionsCorrectBatch = (ids: number[]) => {
    setMasteredQuestionIds(prev => {
      const next = [...prev];
      let changed = false;
      ids.forEach(id => {
        if (!next.includes(id)) {
          next.push(id);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  };

  const handleToggleMastery = (id: number) => {
    setMasteredQuestionIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleQuizComplete = (score: number, total: number, mode: 'practice' | 'exam' | 'mock') => {
    if (total === 0) return;
    const rate = Math.round((score / total) * 100);
    
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    setQuizHistory(prev => {
      const nextWeekNum = prev.length + 1;
      const newEntry: QuizHistoryItem = {
        week: `W${nextWeekNum}`,
        rate: rate,
        date: formattedDate
      };
      const updated = [...prev, newEntry];
      if (updated.length > 8) {
        return updated.slice(updated.length - 8);
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    setMasteredQuestionIds([]);
    setQuizHistory([
      { week: 'W1', rate: 58, date: '21/05' },
      { week: 'W2', rate: 64, date: '28/05' },
      { week: 'W3', rate: 71, date: '04/06' },
      { week: 'W4', rate: 76, date: '11/06' },
      { week: 'W5', rate: 85, date: '18/06' },
    ]);
    setShowProgressDashboard(false);
    setShowResetConfirm(false);
  };

  const handleAddQuestion = (q: Question) => {
    setQuestions([...questions, q]);
  };

  const handleDeleteQuestion = (id: number) => {
    const remaining = questions.filter(q => q.id !== id);
    // Reindex remaining questions smoothly
    const reindexed = remaining.map((q, idx) => ({ ...q, id: idx + 1 }));
    setQuestions(reindexed);
  };

  const handleImportQuestions = (imported: Question[], overwrite: boolean) => {
    if (overwrite) {
      setQuestions(imported);
    } else {
      const maxId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) : 0;
      const reindexed = imported.map((q, idx) => ({ ...q, id: maxId + idx + 1 }));
      setQuestions([...questions, ...reindexed]);
    }
  };

  const handleResetDefaultQuestions = () => {
    setQuestions(initialQuestions);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('foton_academy_questions');
      }
    } catch (e) {
      console.warn('Error clearing cache:', e);
    }
  };

  // Categorized Progress Data
  const catSảnPhẩmTotal = questions.filter(q => q.category === 'Sản phẩm').length;
  const catThịTrườngTotal = questions.filter(q => q.category === 'Thị trường').length;
  const catKỹNăngTotal = questions.filter(q => q.category === 'Kỹ năng').length;
  
  const matchesKháchHàng = (q: Question) => {
    if (!q) return false;
    const quesLower = (q.question || '').toLowerCase();
    const expLower = (q.explanation || '').toLowerCase();
    return q.category === 'Thị trường' || 
      quesLower.includes('khách') || 
      quesLower.includes('đối tác') || 
      quesLower.includes('doanh nghiệp') || 
      quesLower.includes('nhà xe') || 
      quesLower.includes('người mua') || 
      quesLower.includes('bác tài') || 
      quesLower.includes('tài xế') || 
      expLower.includes('khách') || 
      expLower.includes('đối tác');
  };

  const matchesTừChối = (q: Question) => {
    if (!q) return false;
    const quesLower = (q.question || '').toLowerCase();
    const expLower = (q.explanation || '').toLowerCase();
    return quesLower.includes('từ chối') || 
      quesLower.includes('chê') || 
      quesLower.includes('băn khoăn') || 
      quesLower.includes('phàn nàn') || 
      quesLower.includes('đối thủ') || 
      quesLower.includes('đắt') || 
      quesLower.includes('so sánh') || 
      quesLower.includes('giảm giá') || 
      quesLower.includes('ép giá') || 
      quesLower.includes('3f') || 
      quesLower.includes('feel') || 
      quesLower.includes('tco') || 
      expLower.includes('từ chối') || 
      expLower.includes('chê') || 
      expLower.includes('băn khoăn') || 
      expLower.includes('phàn nàn') || 
      expLower.includes('đối thủ') || 
      expLower.includes('đắt');
  };

  const catKháchHàngTotal = questions.filter(matchesKháchHàng).length;
  const catTừChốiTotal = questions.filter(matchesTừChối).length;

  const catSảnPhẩmDone = questions.filter(q => q.category === 'Sản phẩm' && masteredQuestionIds.includes(q.id)).length;
  const catThịTrườngDone = questions.filter(q => q.category === 'Thị trường' && masteredQuestionIds.includes(q.id)).length;
  const catKỹNăngDone = questions.filter(q => q.category === 'Kỹ năng' && masteredQuestionIds.includes(q.id)).length;
  const catKháchHàngDone = questions.filter(q => matchesKháchHàng(q) && masteredQuestionIds.includes(q.id)).length;
  const catTừChốiDone = questions.filter(q => matchesTừChối(q) && masteredQuestionIds.includes(q.id)).length;

  // Total Bank is strictly 600 questions
  const totalBankQuestionsCount = 600;
  const masteredCount = masteredQuestionIds.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalBankQuestionsCount) * 1000) / 10) || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white pb-12">
      {/* Top ambient subtle layout glow */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-blue-500/5 via-blue-500/0 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 relative z-10">
        
        {/* Main Header Board */}
        <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm relative overflow-visible">
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none rounded-r-3xl"></div>

          <div className="flex items-center gap-4">
            <span className="p-3 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-500/20 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-800 uppercase">
                  Foton Sales Academy
                </h1>
                <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200 py-0.5 px-2 rounded-full uppercase tracking-wider">
                  Pro v2026
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 leading-snug">
                <MapPin className="w-3.5 h-3.5 text-blue-650" />
                Học viện Đào tạo &amp; Sát hạch Sales cao cấp xe tải Foton miền Bắc
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:self-auto shrink-0 relative">
            {/* Native Question stats */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-2.5 px-3.5 border border-slate-150 rounded-2xl text-xs text-slate-500 font-mono h-[52px]">
              <div className="text-left font-sans">
                <span className="block text-slate-400 text-[8px] font-mono uppercase tracking-wider font-bold">Tổng quy mô</span>
                <span className="text-xs font-bold text-slate-700">{questions.length} câu</span>
              </div>
            </div>

            {/* Circular Progress Ring Dashboard Selector */}
            <div className="relative">
              <button
                onClick={() => setShowProgressDashboard(!showProgressDashboard)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50 py-2 pl-3 pr-4 border border-blue-100 rounded-2xl shadow-sm cursor-pointer select-none transition-all duration-155 group h-[52px]"
                title="Xem chi tiết bảng tiến trình học"
              >
                <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                  {/* SVG progress ring */}
                  <svg className="w-9 h-9 rotate-[-90deg]">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      className="stroke-slate-100 fill-none"
                      strokeWidth="3.5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      className="stroke-blue-600 fill-none"
                      strokeWidth="3.5"
                      strokeDasharray="100.53"
                      initial={{ strokeDashoffset: 100.53 }}
                      animate={{ strokeDashoffset: 100.53 - (Math.min(100, progressPercent) / 100) * 100.53 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center percentage label */}
                  <span className="absolute text-[9px] font-bold font-mono text-slate-800">
                    {Math.round(progressPercent)}%
                  </span>
                </div>

                <div className="text-left">
                  <span className="block text-[8px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Đã làm chủ</span>
                  <div className="flex items-center gap-1.5 flex-nowrap">
                    <span className="text-xs font-black text-slate-800 font-mono">
                      {masteredCount} / {totalBankQuestionsCount} câu
                    </span>
                    
                    {/* Inline unlocked badges display */}
                    <div className="flex items-center gap-0.5 ml-1">
                      {masteredCount >= 100 && (
                        <span className="inline-flex" title="Huy chương Chuyên Viên (> 100 câu)">
                          <Shield className="w-3.5 h-3.5 text-amber-500 fill-amber-100 bg-amber-50 rounded" />
                        </span>
                      )}
                      {masteredCount >= 300 && (
                        <span className="inline-flex" title="Huy chương Đại Sứ Sales (> 300 câu)">
                          <Award className="w-3.5 h-3.5 text-blue-500 fill-blue-50 bg-blue-50 rounded" />
                        </span>
                      )}
                      {masteredCount >= 600 && (
                        <span className="relative inline-flex animate-pulse" title="Huy chương Huyền Thoại (600 câu!)">
                          <Trophy className="w-3.5 h-3.5 text-yellow-500 fill-yellow-100 bg-yellow-50 rounded" />
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                          </span>
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-blue-600 group-hover:translate-y-0.5 transition-transform ml-0.5">▾</span>
                  </div>
                </div>
              </button>

              {/* Progress detailed modal dropdown floating over parent */}
              <AnimatePresence>
                {showProgressDashboard && (
                  <>
                    {/* Fixed full screen click barrier */}
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setShowProgressDashboard(false)} 
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-14 w-[335px] md:w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Tiến Độ Sát Hạch</h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 py-0.5 px-2 rounded-md">
                          {progressPercent}% Hoàn tất
                        </span>
                      </div>

                      {/* Category Progress Breakdowns */}
                      <div className="space-y-3">
                        {/* Sản phẩm progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-600">Sản phẩm xe Foton</span>
                            <span className="text-slate-800 font-mono">{catSảnPhẩmDone} / {catSảnPhẩmTotal} câu</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 rounded-full transition-all duration-500"
                              style={{ width: `${catSảnPhẩmTotal > 0 ? (catSảnPhẩmDone / catSảnPhẩmTotal) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Thị trường progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-600">Thị trường địa lý bến bãi</span>
                            <span className="text-slate-800 font-mono">{catThịTrườngDone} / {catThịTrườngTotal} câu</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: `${catThịTrườngTotal > 0 ? (catThịTrườngDone / catThịTrườngTotal) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                         {/* Kỹ năng progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-600">Kỹ năng Chốt Deal 9-MOTS</span>
                            <span className="text-slate-800 font-mono">{catKỹNăngDone} / {catKỹNăngTotal} câu</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${catKỹNăngTotal > 0 ? (catKỹNăngDone / catKỹNăngTotal) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Khách hàng progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-600">Phân tích Khách hàng</span>
                            <span className="text-slate-800 font-mono">{catKháchHàngDone} / {catKháchHàngTotal} câu</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${catKháchHàngTotal > 0 ? (catKháchHàngDone / catKháchHàngTotal) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Từ chối progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-600">Xử lý Từ chối &amp; Đắt giá</span>
                            <span className="text-slate-800 font-mono">{catTừChốiDone} / {catTừChốiTotal} câu</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-rose-500 rounded-full transition-all duration-500"
                              style={{ width: `${catTừChốiTotal > 0 ? (catTừChốiDone / catTừChốiTotal) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Achievements Badges Section */}
                      <div className="pt-3 border-t border-slate-150 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-650" />
                          <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-tight">Hệ Thống Huy Chương Đạt Được</h4>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {/* Badge 1: 100 questions */}
                          <div className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center gap-1 relative overflow-hidden transition-all ${
                            masteredCount >= 100
                              ? 'bg-amber-50/70 border-amber-200 text-amber-900 shadow-sm'
                              : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                          }`}>
                            <div className={`p-1.5 rounded-lg ${
                              masteredCount >= 100 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-350'
                            }`}>
                              <Shield className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-extrabold block leading-none">Chuyên Viên</span>
                            <span className="text-[8px] font-mono opacity-85 leading-none mt-0.5">≥ 100 câu</span>
                            {masteredCount < 100 && (
                              <div className="absolute top-1 right-1">
                                <Lock className="w-2.5 h-2.5 text-slate-350" />
                              </div>
                            )}
                          </div>

                          {/* Badge 2: 300 questions */}
                          <div className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center gap-1 relative overflow-hidden transition-all ${
                            masteredCount >= 300
                              ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-sm'
                              : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                          }`}>
                            <div className={`p-1.5 rounded-lg ${
                              masteredCount >= 300 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-350'
                            }`}>
                              <Award className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-extrabold block leading-none">Đại Sứ Sales</span>
                            <span className="text-[8px] font-mono opacity-85 leading-none mt-0.5">≥ 300 câu</span>
                            {masteredCount < 300 && (
                              <div className="absolute top-1 right-1">
                                <Lock className="w-2.5 h-2.5 text-slate-350" />
                              </div>
                            )}
                          </div>

                          {/* Badge 3: 600 questions */}
                          <div className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center gap-1 relative overflow-hidden transition-all ${
                            masteredCount >= 600
                              ? 'bg-yellow-50/70 border-yellow-300 text-amber-950 shadow-sm ring-1 ring-yellow-400/10'
                              : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                          }`}>
                            <div className={`p-1.5 rounded-lg ${
                              masteredCount >= 600 ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-350'
                            }`}>
                              <Trophy className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-extrabold block leading-none">Huyền Thoại</span>
                            <span className="text-[8px] font-mono opacity-85 leading-none mt-0.5">600 câu</span>
                            {masteredCount < 600 && (
                              <div className="absolute top-1 right-1">
                                <Lock className="w-2.5 h-2.5 text-slate-350" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Weekly Correct Answer Rate Trend */}
                      <div className="pt-3 border-t border-slate-150 space-y-2">
                        <div className="flex items-center gap-1.5 justify-between">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                            <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-tight">Xu Hướng Đúng Hàng Tuần</h4>
                          </div>
                          <span className="text-[9px] font-mono text-slate-400">Đơn vị: % Chính xác</span>
                        </div>
                        
                        <div ref={chartRef} className="h-44 w-full pr-1 font-mono text-[9px] select-none">
                          {chartWidth > 0 ? (
                            <AreaChart
                              width={chartWidth}
                              height={176}
                              data={quizHistory}
                              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis 
                                dataKey="week" 
                                stroke="#94a3b8" 
                                tickLine={false} 
                                axisLine={false}
                                dy={4}
                              />
                              <YAxis 
                                stroke="#94a3b8" 
                                domain={[0, 100]} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(val) => `${val}%`}
                              />
                              <Tooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload as QuizHistoryItem;
                                    return (
                                      <div className="bg-slate-800 text-white rounded-lg p-2 shadow-lg border border-slate-700 text-[10px] font-sans">
                                        <p className="font-bold">{data.week} ({data.date})</p>
                                        <p className="text-blue-300 font-mono">Chính xác: {data.rate}%</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="rate" 
                                stroke="#2563eb" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorRate)" 
                              />
                            </AreaChart>
                          ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">
                              Đang tính toán biểu đồ...
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                        {!showResetConfirm ? (
                          <div className="flex items-center justify-between text-[10px]">
                            <button
                              type="button"
                              onClick={() => setShowResetConfirm(true)}
                              className="text-red-500 hover:text-red-700 hover:underline font-bold bg-transparent border-none cursor-pointer p-0 select-none"
                            >
                              Xóa tiến trình học
                            </button>
                            <span className="text-slate-400 font-mono">Quy mô: 600 câu chuẩn</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 p-2 bg-red-50 rounded-lg text-[10px] border border-red-100">
                            <span className="text-red-700 font-semibold">Chắc chắn xóa tiến trình về 0%?</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleResetProgress}
                                className="bg-red-600 text-white font-bold px-2 py-0.5 rounded hover:bg-red-700 cursor-pointer"
                              >
                                Có, Xóa
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowResetConfirm(false)}
                                className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded hover:bg-slate-300 cursor-pointer"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Nav Portal Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <PortalButton
            active={activePortal === 'quiz'}
            onClick={() => setActivePortal('quiz')}
            icon={<Trophy className="w-4 h-4" />}
            label="Sát hạch trực tuyến"
          />
          <PortalButton
            active={activePortal === 'flashcards'}
            onClick={() => setActivePortal('flashcards')}
            icon={<CheckSquare className="w-4 h-4" />}
            label="Flashcards ôn thi"
          />
          <PortalButton
            active={activePortal === 'specs'}
            onClick={() => setActivePortal('specs')}
            icon={<Flame className="w-4 h-4" />}
            label="Thư viện xe Foton"
          />
          <PortalButton
            active={activePortal === 'timeline'}
            onClick={() => setActivePortal('timeline')}
            icon={<Workflow className="w-4 h-4" />}
            label="Quy trình 9 bước"
          />
          <PortalButton
            active={activePortal === 'roleplay'}
            onClick={() => setActivePortal('roleplay')}
            icon={<MessageSquare className="w-4 h-4" />}
            label="Tương tác thực chiến"
          />
          <PortalButton
            active={activePortal === 'manager'}
            onClick={() => setActivePortal('manager')}
            icon={<FileJson className="w-4 h-4" />}
            label="Quản lý mã đề &amp; JSON"
          />
        </nav>

        {/* Master Content Router */}
        <main className="space-y-6">
          {activePortal === 'quiz' && (
            <QuizEngine 
              questions={questions} 
              masteredQuestionIds={masteredQuestionIds}
              onQuestionCorrect={handleQuestionCorrect}
              onQuestionsCorrectBatch={handleQuestionsCorrectBatch}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {activePortal === 'flashcards' && (
            <Flashcards 
              questions={questions} 
              masteredQuestionIds={masteredQuestionIds}
              onToggleMastery={handleToggleMastery}
            />
          )}

          {activePortal === 'specs' && (
            <SpecExplorer />
          )}

          {activePortal === 'timeline' && (
            <SalesProcess />
          )}

          {activePortal === 'roleplay' && (
            <RoleplaySimulator />
          )}

          {activePortal === 'manager' && (
            <QuestionManager 
              questions={questions} 
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onImportQuestions={handleImportQuestions}
              onResetDefaultQuestions={handleResetDefaultQuestions}
            />
          )}
        </main>

        {/* Footer block */}
        <footer className="pt-6 border-t border-slate-200 pb-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
          <p>© 2026 Foton Vietnam - Cổng thông tin đào tạo thuộc Bộ phận Kế hoạch &amp; Sản phẩm.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-800 transition-colors">Tiêu chuẩn: UNECE R-29-03</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors">Công nghệ: Aucan &amp; Cummins</span>
          </div>
        </footer>

        {/* Achievements Level-Up Popup Overlay Award */}
        <AnimatePresence>
          {celebrationMilestone !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md cursor-default"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, rotate: -1 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center space-y-6"
              >
                {/* Visual decoration confetti background or radial burst */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-indigo-600"></div>
                <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>

                <div className="flex justify-center">
                  <motion.div 
                    animate={{ rotate: [0, 8, -8, 8, 0], scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className={`p-5 rounded-full shadow-lg ${
                      celebrationMilestone === 600 
                        ? 'bg-yellow-105 text-yellow-600 bg-yellow-50' 
                        : celebrationMilestone === 300 
                        ? 'bg-blue-105 text-blue-600 bg-blue-50' 
                        : 'bg-amber-105 text-amber-600 bg-amber-50'
                    }`}
                  >
                    {celebrationMilestone === 600 ? (
                      <Trophy className="w-14 h-14 animate-pulse text-yellow-500" />
                    ) : celebrationMilestone === 300 ? (
                      <Award className="w-14 h-14 text-blue-500" />
                    ) : (
                      <Shield className="w-14 h-14 text-amber-500" />
                    )}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">
                    THĂNG HẠNG DANH HIỆU SÁT HẠCH FOTON
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {celebrationMilestone === 600 
                      ? '🏆 HUYỀN THOẠI SALES' 
                      : celebrationMilestone === 300 
                      ? '🥈 ĐẠI SỨ SALES FOTON' 
                      : '🥉 CHUYÊN VIÊN SÁT HẠCH'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chinh phục cột mốc đỉnh cao: <strong className="text-slate-800 font-mono text-sm">{celebrationMilestone} / 600 CÂU HỎI</strong>
                  </p>
                </div>

                <div className="p-4.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-sans text-left">
                  {celebrationMilestone === 600 
                    ? 'Xuất chúng đại tài! Bạn chính là vị vua thực chiến của Foton Academy khi làm chủ trọn vẹn 600 câu hỏi sát hạch. Chứng Chỉ Vàng danh giá nhất hệ thống đang vinh danh toàn bộ nỗ lực học tập xuất sắc của bạn!' 
                    : celebrationMilestone === 300 
                    ? 'Tuyệt vời chiến thần! Bạn đã vượt qua mốc oanh liệt 300 câu hỏi học tập, xuất sắc làm chủ mọi kỹ năng tư vấn, xử lý ý kiến từ chối và bài toán kinh tế TCO tối ưu nhiên liệu thương hiệu Thaco Foton!' 
                    : 'Chúc mừng bạn! Bạn đã làm chủ xuất sắc 100 câu hỏi trong hệ thống đề thi sát hạch! Đẳng cấp am hiểu đặc tính kỹ thuật dầm bệ, lốc máy và kỹ năng đàm phán dòng xe Foton của bạn đang ngày càng chín muồi.'}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCelebrationMilestone(null)}
                    className={`w-full py-3 rounded-2xl text-xs font-bold text-white shadow-md cursor-pointer transition-all ${
                      celebrationMilestone === 600 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:opacity-90' 
                        : celebrationMilestone === 300 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90'
                    }`}
                  >
                    Tuyệt vời! Tiếp tục thực chiến
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Sub helper component for nav links
interface PortalButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function PortalButton({ active, onClick, icon, label }: PortalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 cursor-pointer flex items-center gap-1.5 p-2.5 px-4 rounded-xl text-xs font-semibold font-sans border transition-all ${
        active 
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10' 
          : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
