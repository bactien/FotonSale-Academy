import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XSquare, 
  RotateCcw, 
  Clock, 
  FileText, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  UserCheck 
} from 'lucide-react';

interface QuizEngineProps {
  questions: Question[];
  masteredQuestionIds: number[];
  onQuestionCorrect: (id: number) => void;
  onQuestionsCorrectBatch: (ids: number[]) => void;
  onQuizComplete?: (score: number, total: number, mode: 'practice' | 'exam' | 'mock') => void;
}

export default function QuizEngine({ 
  questions, 
  masteredQuestionIds,
  onQuestionCorrect,
  onQuestionsCorrectBatch,
  onQuizComplete
}: QuizEngineProps) {
  const [activeTab, setActiveTab] = useState<'practice' | 'exam' | 'mock'>('practice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answersLog, setAnswersLog] = useState<Record<number, string>>({}); // { questionId: chosenOptionKey }
  
  const hasRecordedResultRef = useRef(false);
  
  // Custom Study/Exam configurations
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLimit, setSelectedLimit] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<'sequential' | 'shuffle'>('sequential');
  const [selectedTruckModel, setSelectedTruckModel] = useState<string>('all');
  
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mock Exam custom settings
  const [mockLimit, setMockLimit] = useState<'10' | '20' | '50'>('20');
  const [mockMinutes, setMockMinutes] = useState<number>(10);

  // Exam Mode states
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active questions resolved dynamically
  const activeQuestions = sessionStarted ? sessionQuestions : questions;

  // Reset quiz logic
  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setAnswersLog({});
    setExamStarted(false);
    setSessionStarted(false);
    setSessionQuestions([]);
    setTimeLeft(600);
    setTimerActive(false);
    setErrorMessage(null);
    setSelectedTruckModel('all');
    hasRecordedResultRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTabChange = (tab: 'practice' | 'exam' | 'mock') => {
    setActiveTab(tab);
    resetQuiz();
    setSessionStarted(false);
    setErrorMessage(null);
    setSelectedTruckModel('all');
    if (tab === 'exam') {
      setSelectedCategory('all');
      setSelectedLimit('30');
      setSelectedOrder('shuffle');
    } else if (tab === 'mock') {
      setSelectedCategory('all');
      setSelectedLimit('all');
      setSelectedOrder('shuffle');
    } else {
      setSelectedCategory('all');
      setSelectedLimit('all');
      setSelectedOrder('sequential');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer logic for exam - only ticks down the time without being recreated every second
  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  useEffect(() => {
    if (showResults && activeQuestions.length > 0 && onQuizComplete && !hasRecordedResultRef.current) {
      hasRecordedResultRef.current = true;
      onQuizComplete(score, activeQuestions.length, activeTab);
    }
  }, [showResults, score, activeQuestions, activeTab, onQuizComplete]);

  // Handle auto-submission once timer reaches zero
  useEffect(() => {
    if (timerActive && timeLeft === 0) {
      handleFinishExam();
    }
  }, [timeLeft, timerActive]);

  const startSession = () => {
    let pool = [...questions];
    
    // 1. Filter by category
    if (selectedCategory === 'Sản phẩm') {
      pool = pool.filter(q => q.category === 'Sản phẩm');
    } else if (selectedCategory === 'Thị trường') {
      pool = pool.filter(q => q.category === 'Thị trường');
    } else if (selectedCategory === 'Kỹ năng') {
      pool = pool.filter(q => q.category === 'Kỹ năng');
    } else if (selectedCategory === 'Khách hàng') {
      pool = pool.filter(q => {
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
      });
    } else if (selectedCategory === 'Từ chối') {
      pool = pool.filter(q => {
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
      });
    } else if (selectedCategory === 'unmastered') {
      pool = pool.filter(q => !masteredQuestionIds.includes(q.id));
    } else if (selectedCategory === 'mastered') {
      pool = pool.filter(q => masteredQuestionIds.includes(q.id));
    }

    // 1b. Filter by specific truck model/code (Dòng xe / Mã xe)
    if (selectedTruckModel !== 'all') {
      pool = pool.filter(q => {
        if (!q) return false;
        const text = ((q.question || '') + ' ' + (q.explanation || '') + ' ' + (q.options?.join(' ') || '')).toLowerCase();
        
        switch (selectedTruckModel) {
          case 'wonder':
            return text.includes('wonder');
          case 'x25':
            return text.includes('x25') || text.includes('x 25') || text.includes('1.9t') || text.includes('2.4t');
          case 's35':
            return text.includes('s35') || text.includes('s 35') || text.includes('3.5t') || text.includes('3.5 tấn');
          case 's50':
            return text.includes('s50') || text.includes('s 50') || text.includes('5t') || text.includes('5 tấn');
          case 's70':
            return text.includes('s70') || text.includes('s 70') || text.includes('s70l') || text.includes('6.5t') || text.includes('7.5t') || text.includes('7.5 tấn') || text.includes('6.5 tấn') || text.includes('7 tấn');
          case 's90':
            return text.includes('s90') || text.includes('s 90') || text.includes('9t') || text.includes('9 tấn');
          case 'c160':
            return text.includes('c160') || text.includes('c 160') || text.includes('auman c160') || text.includes('yuchai 220');
          case 'c240':
            return text.includes('c240') || text.includes('c 240') || text.includes('auman c240') || text.includes('3 chân');
          case 'fv':
            return text.includes('fv270') || text.includes('fv400') || text.includes('fv460') || text.includes('fv 270') || text.includes('fv 400') || text.includes('fv 460') || text.includes('đầu kéo') || text.includes('tractor');
          default:
            return true;
        }
      });
    }
    
    // Check if empty
    if (pool.length === 0) {
      setErrorMessage("Không có câu hỏi nào đáp ứng điều kiện lọc này trong ngân hàng đề!");
      return;
    }

    setErrorMessage(null);

    // 2. Order
    if (activeTab === 'mock') {
      // Force shuffle to get random questions for mock exam
      pool.sort(() => Math.random() - 0.5);
    } else if (selectedOrder === 'shuffle') {
      pool.sort(() => Math.random() - 0.5);
    } else {
      pool.sort((a, b) => a.id - b.id);
    }

    // 3. Limit
    if (activeTab === 'mock') {
      const limitNum = parseInt(mockLimit, 10);
      pool = pool.slice(0, limitNum);
    } else if (selectedLimit !== 'all') {
      const limitNum = parseInt(selectedLimit, 10);
      pool = pool.slice(0, limitNum);
    }

    setSessionQuestions(pool);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setAnswersLog({});
    setExamStarted(activeTab === 'exam' || activeTab === 'mock');
    hasRecordedResultRef.current = false;
    
    // Dynamic countdown timer based on question limit chosen or custom mock minutes
    let secondsLimit = 600;
    if (activeTab === 'mock') {
      secondsLimit = mockMinutes * 60;
    } else {
      if (selectedLimit === '10') secondsLimit = 200;
      else if (selectedLimit === '20') secondsLimit = 400;
      else if (selectedLimit === '30') secondsLimit = 600;
      else if (selectedLimit === '50') secondsLimit = 1000;
      else secondsLimit = Math.min(1800, pool.length * 30); // 30s per question up to 30 mins
    }
    
    setTimeLeft(secondsLimit);
    setTimerActive(activeTab === 'exam' || activeTab === 'mock');
    setSessionStarted(true);
  };

  const handleStartExam = () => {
    // Legacy support or fallback
    startSession();
  };

  const handleFinishExam = () => {
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calculate Score in Exam mode
    let finalScore = 0;
    const correctIds: number[] = [];
    activeQuestions.forEach((q) => {
      const chosen = answersLog[q.id];
      if (chosen === q.correct_answer) {
        finalScore++;
        correctIds.push(q.id);
      }
    });
    setScore(finalScore);
    setShowResults(true);

    if (correctIds.length > 0) {
      onQuestionsCorrectBatch(correctIds);
    }
  };

  const handleAnswerSelection = (optionString: string) => {
    if (isAnswered && activeTab === 'practice') return; // Cannot change answer in practice
    
    const chosenKey = optionString.charAt(0); // A, B, C, or D
    setSelectedAnswer(chosenKey);

    const question = activeQuestions[currentIndex];
    if (!question) return;
    
    if (activeTab === 'practice') {
      setIsAnswered(true);
      const isCorrect = chosenKey === question.correct_answer;
      if (isCorrect) {
        setScore(prev => prev + 1);
        onQuestionCorrect(question.id);
      }
      setAnswersLog(prev => ({ ...prev, [question.id]: chosenKey }));
    } else {
      // Exam mode - simply log the answer
      setAnswersLog(prev => ({ ...prev, [question.id]: chosenKey }));
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached the end
      if (activeTab === 'practice') {
        setShowResults(true);
      } else {
        handleFinishExam();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Sync state when moving between questions
  useEffect(() => {
    const currentQ = activeQuestions[currentIndex];
    if (currentQ && answersLog[currentQ.id] !== undefined) {
      setSelectedAnswer(answersLog[currentQ.id]);
      setIsAnswered(true);
    } else {
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [currentIndex, answersLog, activeQuestions]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const isQuizRunning = sessionStarted && !showResults;
    if (!isQuizRunning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const activeQ = activeQuestions[currentIndex];
      if (!activeQ) return;

      // Classify key action
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const optionIdx = parseInt(e.key, 10) - 1;
        if (activeQ.options && activeQ.options[optionIdx]) {
          handleAnswerSelection(activeQ.options[optionIdx]);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeTab === 'exam' || activeTab === 'mock' || isAnswered) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (activeTab === 'exam' || activeTab === 'mock' || isAnswered) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isAnswered, activeTab, sessionStarted, showResults, activeQuestions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestion = activeQuestions[currentIndex];

  // Category and status count telemetry
  const countAll = questions.length;
  const countSảnPhẩm = questions.filter(q => q.category === 'Sản phẩm').length;
  const countThịTrường = questions.filter(q => q.category === 'Thị trường').length;
  const countKỹNăng = questions.filter(q => q.category === 'Kỹ năng').length;
  const countKháchHàng = questions.filter(q => {
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
  }).length;
  const countTừChối = questions.filter(q => {
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
  }).length;
  const countUnmastered = questions.filter(q => !masteredQuestionIds.includes(q.id)).length;
  const countMastered = questions.filter(q => masteredQuestionIds.includes(q.id)).length;

  const countForModel = (modelId: string) => {
    return questions.filter(q => {
      if (!q) return false;
      const text = ((q.question || '') + ' ' + (q.explanation || '') + ' ' + (q.options?.join(' ') || '')).toLowerCase();
      switch (modelId) {
        case 'wonder':
          return text.includes('wonder');
        case 'x25':
          return text.includes('x25') || text.includes('x 25') || text.includes('1.9t') || text.includes('2.4t');
        case 's35':
          return text.includes('s35') || text.includes('s 35') || text.includes('3.5t') || text.includes('3.5 tấn');
        case 's50':
          return text.includes('s50') || text.includes('s 50') || text.includes('5t') || text.includes('5 tấn');
        case 's70':
          return text.includes('s70') || text.includes('s 70') || text.includes('s70l') || text.includes('6.5t') || text.includes('7.5t') || text.includes('7.5 tấn') || text.includes('6.5 tấn') || text.includes('7 tấn');
        case 's90':
          return text.includes('s90') || text.includes('s 90') || text.includes('9t') || text.includes('9 tấn');
        case 'c160':
          return text.includes('c160') || text.includes('c 160') || text.includes('auman c160') || text.includes('yuchai 220');
        case 'c240':
          return text.includes('c240') || text.includes('c 240') || text.includes('auman c240') || text.includes('3 chân');
        case 'fv':
          return text.includes('fv270') || text.includes('fv400') || text.includes('fv460') || text.includes('fv 270') || text.includes('fv 400') || text.includes('fv 460') || text.includes('đầu kéo') || text.includes('tractor');
        default:
          return true;
      }
    }).length;
  };

  if (!activeQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
        <HelpCircle className="w-16 h-16 mb-4 text-blue-600 animate-pulse" />
        <h3 className="text-xl font-bold text-slate-800">Chưa có câu hỏi nào được nạp</h3>
        <p className="mt-2 text-xs text-slate-500">Hãy thêm câu hỏi mới qua tab "Quản Lý Đề Thi" để bắt đầu sát hạch.</p>
      </div>
    );
  }

  // Scoring details
  const percentage = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;
  const isPassed = percentage >= 85;

  return (
    <div className="space-y-6" id="quiz-portal">
      {/* Selector of Quiz mode */}
      {!sessionStarted && !showResults && (
        <div className="flex flex-col sm:flex-row justify-center p-1 bg-white border border-slate-200 shadow-sm rounded-2xl max-w-xl mx-auto gap-1">
          <button
            onClick={() => handleTabChange('practice')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Luyện tập thực chiến
          </button>
          <button
            onClick={() => handleTabChange('exam')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Thi Sát hạch Chuẩn
          </button>
          <button
            onClick={() => handleTabChange('mock')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'mock'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            Sát hạch giả lập
          </button>
        </div>
      )}

      {/* Main Container */}
      <AnimatePresence mode="wait">
        {/* Intro settings for both Practice and Exam Mode */}
        {!sessionStarted && !showResults && (
          <motion.div
            key="session-setup"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl max-w-2xl mx-auto shadow-sm relative overflow-hidden space-y-6"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              {activeTab === 'exam' ? (
                <Trophy className="w-44 h-44 text-amber-500" />
              ) : activeTab === 'mock' ? (
                <Clock className="w-44 h-44 text-indigo-600" />
              ) : (
                <HelpCircle className="w-44 h-44 text-blue-600" />
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className={`p-2.5 rounded-xl ${
                activeTab === 'exam' 
                  ? 'bg-amber-500/10 text-amber-600' 
                  : activeTab === 'mock' 
                  ? 'bg-indigo-500/10 text-indigo-600' 
                  : 'bg-blue-500/10 text-blue-600'
              }`}>
                {activeTab === 'exam' ? (
                  <Trophy className="w-5 h-5 animate-bounce" />
                ) : activeTab === 'mock' ? (
                  <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                ) : (
                  <HelpCircle className="w-5 h-5 animate-pulse" />
                )}
               </span>
               <div>
                 <h3 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-tight">
                   {activeTab === 'exam' 
                     ? 'Thi Sát hạch năng lực trực tuyến' 
                     : activeTab === 'mock' 
                     ? 'Sát hạch giả lập áp lực phòng thi' 
                     : 'Học tập thực chiến Foton'}
                 </h3>
                 <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-semibold">
                   {activeTab === 'exam' 
                     ? 'Đánh giá tính giờ & Cấp chứng nhận Vàng' 
                     : activeTab === 'mock' 
                     ? 'Hẹn giờ thi thực tế & rút ngẫu nhiên bộ đề' 
                     : 'Chế độ luyện tập giải nghĩa tự chọn'}
                 </p>
               </div>
            </div>

            {/* Config details */}
            <div className="space-y-5 pt-2">
              {activeTab === 'mock' ? (
                /* Sát hạch giả lập specific configurations */
                <>
                  {/* Option 1: Limit of Question count */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block pb-1">1. Chọn số lượng câu hỏi ngẫu nhiên</label>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <button 
                        type="button" 
                        onClick={() => setMockLimit('10')}
                        className={`p-4 text-center rounded-2xl border font-sans transition-all flex flex-col items-center justify-center cursor-pointer ${
                          mockLimit === '10' 
                            ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 font-extrabold text-indigo-900 shadow-sm shadow-indigo-100' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-black text-sm tracking-wide">10 CÂU HỎI</span>
                        <span className="text-[9px] text-slate-400 mt-1 block">Rà quét nhanh siêu tốc</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setMockLimit('20')}
                        className={`p-4 text-center rounded-2xl border font-sans transition-all flex flex-col items-center justify-center cursor-pointer ${
                          mockLimit === '20' 
                            ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 font-extrabold text-indigo-900 shadow-sm shadow-indigo-100' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-black text-sm tracking-wide">20 CÂU HỎI</span>
                        <span className="text-[9px] text-slate-400 mt-1 block">Đề thi bán hàng tiêu chuẩn</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setMockLimit('50')}
                        className={`p-4 text-center rounded-2xl border font-sans transition-all flex flex-col items-center justify-center cursor-pointer ${
                          mockLimit === '50' 
                            ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 font-extrabold text-indigo-900 shadow-sm shadow-indigo-100' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-755'
                        }`}
                      >
                        <span className="font-black text-sm tracking-wide">50 CÂU HỎI</span>
                        <span className="text-[9px] text-slate-400 mt-1 block">Sát hạch toàn diện nâng cao</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 2: Customizable countdown timer */}
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block pb-1">2. Thiết lập đồng hồ đếm ngược thi thực tế</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { min: 3, label: '3 phút', desc: 'Siêu tốc - Áp lực nghẹt thở' },
                        { min: 5, label: '5 phút', desc: 'Rèn xử lý phản pháo' },
                        { min: 10, label: '10 phút', desc: 'Tiêu chuẩn mặc định' },
                        { min: 15, label: '15 phút', desc: 'Bình tĩnh kiểm tra kĩ' },
                        { min: 25, label: '25 phút', desc: 'Cày đề chuyên sâu lâu dài' },
                        { min: 40, label: '40 phút', desc: 'Không giới hạn thời gian' }
                      ].map((item) => (
                        <button 
                          key={item.min}
                          type="button" 
                          onClick={() => setMockMinutes(item.min)}
                          className={`p-3 text-center rounded-xl border font-sans transition-all flex flex-col items-center justify-center cursor-pointer ${
                            mockMinutes === item.min 
                              ? 'border-indigo-600 bg-indigo-55 text-indigo-900 border-2 font-black shadow-sm ring-1 ring-indigo-500' 
                              : 'bg-white text-slate-650 border-slate-200 hover:border-slate-350'
                          }`}
                        >
                          <span className="font-extrabold flex items-center justify-center gap-1.5 text-[13px]">
                            <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                            {item.label}
                          </span>
                          <span className="text-[9px] text-slate-400 mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Option 3: Dòng xe trọng tâm filter */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                        3. Lựa chọn dòng xe trọng tâm (Không bắt buộc)
                      </label>
                      {selectedTruckModel !== 'all' && (
                        <button 
                          type="button"
                          onClick={() => setSelectedTruckModel('all')}
                          className="text-[10px] text-indigo-600 font-extrabold hover:underline"
                        >
                          Xóa bộ lọc xe (Hiện tất cả)
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('all')}
                        className={`p-2 rounded-xl border text-center font-sans font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center min-h-[48px] ${
                          selectedTruckModel === 'all'
                            ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 text-indigo-900'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-600'
                        }`}
                      >
                        <span className="text-[10px]">Tất cả</span>
                        <span className="block text-[8px] text-slate-450 font-mono font-normal">{questions.length} câu</span>
                      </button>
                      {[
                        { id: 'wonder', name: 'Wonder' },
                        { id: 'x25', name: 'Aumark X25' },
                        { id: 's35', name: 'Aumark S35' },
                        { id: 's50', name: 'Aumark S50' },
                        { id: 's70', name: 'Aumark S70' },
                        { id: 's90', name: 'Aumark S90' },
                        { id: 'c160', name: 'Auman C160' },
                        { id: 'c240', name: 'Auman C240' },
                        { id: 'fv', name: 'FV Đầu Kéo' }
                      ].map((truck) => (
                        <button
                          key={truck.id}
                          type="button"
                          onClick={() => setSelectedTruckModel(truck.id)}
                          className={`p-2 rounded-xl border text-center font-sans font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center min-h-[48px] ${
                            selectedTruckModel === truck.id
                              ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 text-indigo-900'
                              : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-600'
                          }`}
                        >
                          <span className="text-[10px] truncate w-full">{truck.name}</span>
                          <span className="block text-[8px] text-slate-450 font-mono font-normal">{countForModel(truck.id)} câu</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Regular Practice and Exam settings panel */
                <>
                  {/* Option 1: Study options */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">1. Chủ đề câu hỏi học tập</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('all')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'all' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Học tất cả câu hỏi ({countAll} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Bao quát toàn tập 600 câu sườn</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('Sản phẩm')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'Sản phẩm' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Học theo Sản phẩm ({countSảnPhẩm} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Cabin Wonder, Aucan S35, Auman C160, EST</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('Khách hàng')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'Khách hàng' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Học theo Khách hàng ({countKháchHàng} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Chủ doanh nghiệp, tài xế dốc đèo miền Bắc</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('Từ chối')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'Từ chối' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Học Xử lý Từ chối ({countTừChối} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Vượt cản đắt giá, bài toán TCO, so sánh xe cỏ</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('Thị trường')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'Thị trường' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Thị trường địa lý ({countThịTrường} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Hành vi bến bãi, tuyến vận tải miền Bắc</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCategory('Kỹ năng')}
                        className={`p-3 text-left rounded-xl border font-sans transition-all flex flex-col justify-between cursor-pointer ${
                          selectedCategory === 'Kỹ năng' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-semibold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-750'
                        }`}
                      >
                        <span className="font-bold">Kỹ năng Chốt Deal ({countKỹNăng} câu)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Chốt deal thực chiến theo quy trình 9-MOTS</span>
                      </button>
                      <button 
                        type="button" 
                        disabled={countUnmastered === 0}
                        onClick={() => setSelectedCategory('unmastered')}
                        className={`p-3.5 text-left rounded-xl border font-sans transition-all flex flex-col justify-between md:col-span-2 disabled:opacity-50 cursor-pointer ${
                          selectedCategory === 'unmastered' 
                            ? 'border-rose-600 bg-rose-50/40 ring-1 ring-rose-500 font-semibold text-rose-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-rose-50/20 text-slate-755'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold flex items-center gap-1.5 text-rose-700">
                            🔴 Luyện câu yếu / chưa làm chủ ({countUnmastered} câu chưa thuộc)
                          </span>
                          {countUnmastered > 0 && (
                            <span className="bg-rose-100 text-rose-800 text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase">Ưu tiên</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 font-mono">Tập trung rà quét dứt điểm các lỗ hổng kiến thức</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 1b: Truck Model/Code Filter */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">
                        1b. Chọn Xe trọng tâm cần học (Dòng xe / Mã xe)
                      </label>
                      {selectedTruckModel !== 'all' && (
                        <button 
                          type="button"
                          onClick={() => setSelectedTruckModel('all')}
                          className="text-[10px] text-blue-600 font-bold hover:underline"
                        >
                          Xóa bộ lọc xe (Hiện tất cả)
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('all')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'all'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span>Tất cả dòng xe</span>
                        <span className="block text-[9px] text-slate-400 font-normal mt-0.5">{questions.length} câu hỏi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('wonder')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'wonder'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Wonder</span>
                        <span className="text-[9px] text-slate-500 block">Tải Nhẹ Xăng</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('wonder')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('x25')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'x25'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Aumark X25</span>
                        <span className="text-[9px] text-slate-500 block">1.9T - 2.4T</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('x25')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('s35')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 's35'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Aumark S35</span>
                        <span className="text-[9px] text-slate-500 block">Tải Trung 3.5T</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('s35')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('s50')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 's50'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Aumark S50</span>
                        <span className="text-[9px] text-slate-500 block">Tải Trung 5T</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('s50')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('s70')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 's70'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Aumark S70</span>
                        <span className="text-[9px] text-slate-500 block">6.5T - 7.5T</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('s70')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('s90')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 's90'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Aumark S90</span>
                        <span className="text-[9px] text-slate-500 block">Thùng Dài 7.4m</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('s90')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('c160')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'c160'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Auman C160M</span>
                        <span className="text-[9px] text-slate-500 block">Tải Nặng 9T</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('c160')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('c240')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'c240'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Auman C240</span>
                        <span className="text-[9px] text-slate-500 block">3 Chân Nặng</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('c240')} câu</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTruckModel('fv')}
                        className={`p-2.5 rounded-xl border text-center font-sans font-bold transition-all relative flex flex-col items-center justify-center min-h-[58px] cursor-pointer ${
                          selectedTruckModel === 'fv'
                            ? 'border-blue-600 bg-blue-50/55 ring-1 ring-blue-500 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span className="text-blue-800 block text-[10px] uppercase tracking-wide font-extrabold">Đầu Kéo FV</span>
                        <span className="text-[9px] text-slate-500 block">FV270/400/460</span>
                        <span className="block text-[9px] text-slate-400 font-mono font-normal mt-0.5">{countForModel('fv')} câu</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 2: Limits */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">2. Giới hạn số câu hỏi mỗi lượt</label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button 
                        type="button" 
                        onClick={() => setSelectedLimit('all')}
                        className={`py-2 px-3.5 rounded-xl border font-bold transition-all cursor-pointer ${
                          selectedLimit === 'all' 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        {activeTab === 'practice' ? 'Tất cả câu hỏi' : 'Thi tất cả'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedLimit('10')}
                        className={`py-2 px-3.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          selectedLimit === '10' 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        10 Câu ngắn
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedLimit('20')}
                        className={`py-2 px-3.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          selectedLimit === '20' 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        20 Câu
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedLimit('30')}
                        className={`py-2 px-3.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          selectedLimit === '30' 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        30 Câu chuẩn
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedLimit('50')}
                        className={`py-2 px-3.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                          selectedLimit === '50' 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        50 Câu
                      </button>
                    </div>
                  </div>

                  {/* Option 3: Sort selection */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block">3. Thứ tự trình bày câu hỏi</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button 
                        type="button" 
                        onClick={() => setSelectedOrder('sequential')}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedOrder === 'sequential' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-bold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-600'
                        }`}
                      >
                        <div>
                          <span className="block font-bold">Thứ tự chuẩn</span>
                          <span className="text-[9px] text-slate-400 font-mono">Xếp theo phân loại đề</span>
                        </div>
                        <span className="text-slate-400">🔢</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedOrder('shuffle')}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedOrder === 'shuffle' 
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 font-bold text-blue-900' 
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-600'
                        }`}
                      >
                        <div>
                          <span className="block font-bold">Xáo trộn ngẫu nhiên</span>
                          <span className="text-[9px] text-slate-400 font-mono">Tăng tương tác phản xạ</span>
                        </div>
                        <span className="text-slate-500">🔀</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Hint box if Exam */}
            {activeTab === 'exam' && (
              <div className="p-4 bg-amber-50 border border-amber-150 rounded-2xl flex gap-3 text-amber-900">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-sans">
                  Đạt tỷ lệ đúng từ <strong className="font-bold text-amber-700">85% trở lên</strong> để nhận Chứng chỉ Sales Vàng đại lý Foton miền Bắc. Hệ thống kích hoạt đồng hồ đếm ngược ngay khi bấm bắt đầu.
                </p>
              </div>
            )}

            {/* Hint box if Mock */}
            {activeTab === 'mock' && (
              <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl flex gap-3 text-indigo-950">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-sans">
                  Chế độ <strong className="font-bold text-indigo-900">Sát hạch giả lập</strong> áp lực rèn dứt điểm phản xạ! Đang lựa chọn <strong className="font-bold text-indigo-900">{mockLimit} câu hỏi ngẫu nhiên</strong> với thời lượng <strong className="font-bold text-indigo-900">{mockMinutes} phút</strong> đếm ngược nghẹt thở. Không tiết lộ đáp án tức thời.
                </p>
              </div>
            )}

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-semibold flex items-center justify-between"
              >
                <span>⚠️ {errorMessage}</span>
                <button type="button" onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-700 font-bold ml-2 font-sans">✕</button>
              </motion.div>
            )}

            <button
              onClick={startSession}
              className={`w-full py-4 text-center text-white font-bold rounded-xl shadow-md cursor-pointer active:scale-95 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
                activeTab === 'exam' 
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10' 
                  : activeTab === 'mock'
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/15'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/10'
              }`}
            >
              {activeTab === 'exam' ? (
                <>
                  Bắt đầu sát hạch tính giờ ngay
                  <Trophy className="w-4 h-4" />
                </>
              ) : activeTab === 'mock' ? (
                <>
                  Bắt đầu sát hạch giả lập ngay
                  <Clock className="w-4 h-4" />
                </>
              ) : (
                <>
                  Bắt đầu lượt học tập thực chiến
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Dynamic Quiz Card */}
        {sessionStarted && !showResults && (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl max-w-3xl mx-auto shadow-sm"
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-blue-650 bg-blue-50 py-1 px-3 rounded-full border border-blue-105">
                  Câu hỏi {currentIndex + 1} / {activeQuestions.length}
                </span>
                <span className="text-xs font-mono text-amber-700 bg-amber-50 py-1 px-3 rounded-full border border-amber-105">
                  {activeQuestion.category}
                </span>
              </div>

              {(activeTab === 'exam' || activeTab === 'mock') && (
                <div className="flex items-center gap-2 text-rose-600 font-mono text-sm bg-rose-50 py-1.5 px-3.5 rounded-xl border border-rose-100">
                  <Clock className="w-4 h-4 animate-pulse inline" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              )}

              {activeTab === 'practice' && (
                <p className="text-xs text-slate-500">
                  Điểm số tích luỹ: <b className="text-emerald-600 font-bold">{score}</b> / {activeQuestions.length}
                </p>
              )}
            </div>

            {/* Progress line */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
                {activeQuestion.question}
              </h3>
            </div>

            {/* Options layout */}
            <div className="grid grid-cols-1 gap-3.5 mb-8">
              {activeQuestion.options.map((optionString, idx) => {
                const optKey = optionString.charAt(0); // A, B, C, D
                const chosenLog = answersLog[activeQuestion.id];
                const isSelected = selectedAnswer === optKey || ((activeTab === 'exam' || activeTab === 'mock') && chosenLog === optKey);
                
                // Styling based on practice results or exam state
                let optionStyle = 'border-slate-200 text-slate-700 bg-white hover:border-blue-500 hover:bg-blue-50/20';
                let bulletStyle = 'bg-slate-100 text-slate-500 border border-slate-200';
                
                if (activeTab === 'practice') {
                  if (isAnswered) {
                    const isCorrectOption = optKey === activeQuestion.correct_answer;
                    const isSelectedAndWrong = isSelected && optKey !== activeQuestion.correct_answer;
                    
                    if (isCorrectOption) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-sm';
                      bulletStyle = 'bg-emerald-500 text-white';
                    } else if (isSelectedAndWrong) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                      bulletStyle = 'bg-rose-500 text-white';
                    } else {
                      optionStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                      bulletStyle = 'bg-slate-100/60 text-slate-300 border-slate-200';
                    }
                  } else {
                    if (isSelected) {
                      optionStyle = 'border-2 border-blue-500 bg-blue-50 text-blue-900 font-semibold';
                      bulletStyle = 'bg-blue-600 text-white';
                    }
                  }
                } else {
                  // Exam Mode selection
                  if (isSelected) {
                    optionStyle = 'border-2 border-blue-500 bg-blue-50 text-blue-900 font-semibold';
                    bulletStyle = 'bg-blue-600 text-white';
                  }
                }

                // Parse key and text cleanly
                const colonIdx = optionString.search(/[:\.\)]/);
                const hasPrefix = colonIdx !== -1 && colonIdx < 3;
                const optText = hasPrefix ? optionString.slice(colonIdx + 1).trim() : optionString;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered && activeTab === 'practice'}
                    onClick={() => handleAnswerSelection(optionString)}
                    className={`w-full py-4 text-left p-4 rounded-xl border text-sm font-sans cursor-pointer active:scale-99 transition-all flex items-center justify-between gap-4 ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${bulletStyle}`}>
                        {optKey}
                      </span>
                      <span className="font-medium leading-relaxed">{optText}</span>
                    </div>
                    {activeTab === 'practice' && isAnswered && optKey === activeQuestion.correct_answer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {activeTab === 'practice' && isAnswered && isSelected && optKey !== activeQuestion.correct_answer && (
                      <XSquare className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card for Practice Mode */}
            {activeTab === 'practice' && isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-5 bg-orange-50 border border-orange-200 rounded-2xl mb-6 text-sm"
              >
                <div className="flex gap-2 text-orange-900 font-bold mb-3 items-center">
                  <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="uppercase text-xs tracking-wider">Tư duy Giám đốc Đào tạo (10+ năm kinh nghiệm)</span>
                </div>
                <div className="p-3 bg-white/70 rounded-xl border border-orange-100 text-slate-800 leading-relaxed font-sans text-xs">
                  {activeQuestion.explanation}
                </div>
              </motion.div>
            )}

            {/* Bottom Actions footer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-1.5">
                <p className="text-xs text-slate-400 font-medium font-sans">
                  {activeTab === 'practice' 
                    ? 'Chế độ luyện tập giải thích cực chi tiết học tất cả'
                    : 'Sát hạch tính giờ - Tự tin quyết bứt tốc'}
                </p>
                <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span className="font-sans font-medium text-slate-400">Phím tắt:</span>
                  <div className="flex gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">1</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">2</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">3</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">4</kbd>
                  </div>
                  <span className="font-sans">chọn đáp án |</span>
                  <div className="flex gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">Enter</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">➔</kbd>
                  </div>
                  <span className="font-sans">câu kế |</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-black">⬅</kbd>
                  <span className="font-sans">câu trước</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="py-3 px-4 text-slate-650 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs uppercase cursor-pointer"
                >
                  Thoát
                </button>
                {/* Show Next button only if answered (practice) or anytime (exam/mock) */}
                {(activeTab === 'exam' || activeTab === 'mock' || isAnswered) && (
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 text-white bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-md shadow-blue-500/10 tracking-wide text-xs uppercase flex items-center gap-1.5 cursor-pointer flex-1 md:flex-initial justify-center animate-fade-in"
                  >
                    {currentIndex < activeQuestions.length - 1 ? (
                      <>
                        Câu Tiếp Theo
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Xem Kết Quả Sát Hạch
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Screen */}
        {showResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Score Summary Box */}
            <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>

              <div className="inline-block p-4 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                <Trophy className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800">
                  {activeTab === 'practice' ? 'HOÀN THÀNH LUYỆN TẬP THỰC CHIẾN' : 'HOÀN THÀNH BÀI THI SÁT HẠCH'}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-widest font-bold">Phân khúc xe tải Foton Miền Bắc</p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-2">
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                  <span className="block text-2xl font-black font-mono text-blue-600">{percentage}%</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-mono pt-1 tracking-wider">Tỷ lệ đúng</span>
                </div>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <span className="block text-2xl font-black font-mono text-emerald-600">{score}</span>
                  <span className="block text-[9px] text-emerald-500 uppercase font-mono pt-1 tracking-wider">Đúng</span>
                </div>
                <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                  <span className="block text-2xl font-black font-mono text-rose-600">{activeQuestions.length - score}</span>
                  <span className="block text-[9px] text-rose-500 uppercase font-mono pt-1 tracking-wider">Sai</span>
                </div>
              </div>

              {/* Assessment Message */}
              <div className="max-w-lg mx-auto p-4 bg-slate-50 border border-slate-150 rounded-2xl text-left">
                <h4 className="text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Đánh giá từ Hội Đồng Đào Tạo:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isPassed ? (
                    '🏆 XUẤT SẮC! Bạn đã thể hiện tư duy nhạy sảo, bọc lót chắc chắn các thông số Foton (đặc biệt các dòng tải nhẹ Wonder, S35 phối hợp ZF) và quy trình 3F đập bỏ băn khoăn giá cao. Bạn đủ tư cách nhận chứng chỉ chuyên nghiệp cấp độ cao!'
                  ) : (
                    '⚠️ CẦN NỖ LỰC THÊM! Bạn còn mơ hồ ở một vài luận điểm bán hàng (độ rộng cabin Wonder rơ hẹp, hoặc đặc tính động cơ Aucan 4F25 của S35). Hãy dùng tab Flashcards và dữ liệu sườn Thư Viện Xe để bồi đắp kiến thức sành sỏi dứt điểm rồi sát hạch lại.'
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto py-3 px-6 text-white bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-2 text-xs uppercase"
                >
                  <RotateCcw className="w-4 h-4" />
                  Thi sát hạch lại
                </button>
                {isPassed && activeTab === 'exam' && (
                  <a 
                    href="#sales-certificate"
                    className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-md shadow-orange-500/10 transition-all flex items-center justify-center gap-2 text-xs uppercase"
                  >
                    <Award className="w-4 h-4" />
                    Xem Chứng Chỉ Sales Vàng
                  </a>
                )}
              </div>
            </div>

            {/* Immersive sales certificate */}
            {isPassed && activeTab === 'exam' && (
              <motion.div
                id="sales-certificate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border-4 border-double border-amber-300/80 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-3xl relative shadow-sm space-y-6 text-center"
              >
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-500/10 rounded-2xl pointer-events-none"></div>
                
                <Award className="w-20 h-20 text-amber-600 mx-auto animate-pulse" />
                
                <div className="space-y-1">
                  <h4 className="text-amber-800 font-mono tracking-widest text-[11px] uppercase font-black">HỌC VIỆN ĐÀO TẠO & SÁT HẠCH SẢN PHẨM FOTON</h4>
                  <h2 className="text-2xl font-sans text-slate-800 font-black tracking-wide uppercase">CHỨNG CHỈ TƯ VẤN VIÊN BÁN HÀNG VÀNG</h2>
                  <p className="text-xs text-slate-500 font-medium">Cấp đặc cách cho sự đột phá am hiểu phân khúc xe miền Bắc</p>
                </div>

                <div className="py-4 border-y border-amber-200/40 max-w-md mx-auto space-y-2">
                  <p className="text-slate-600 text-xs">Chứng nhận đại lý tôn vinh tư cách sales chuyên nghiệp hoàn thành xuất sắc:</p>
                  <p className="text-blue-700 font-mono text-sm font-black uppercase tracking-wider">TƯ VẤN VIÊN CAO CẤP FOTON TRỰC TUYẾN</p>
                  <p className="text-[10px] text-slate-400 font-mono">Bản điện tử số hiệu: #FT-{activeQuestions.length}-{score}-{percentage}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left pt-2">
                  <div>
                    <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">Điểm sát hạch</span>
                    <span className="block text-xs font-bold text-slate-800 font-mono">{percentage}% ĐẠT CHUẨN</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">Hội Đồng Duyệt</span>
                    <span className="block text-xs font-semibold text-amber-700 font-sans">Giám đốc Đào tạo Foton</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 italic font-medium">
                  *Chứng nhận điện tử tự động, có giá trị tức thời trong phạm vi cổng học tập*
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
