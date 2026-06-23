import React, { useState } from 'react';
import { Question } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Lightbulb, 
  Sparkles, 
  RotateCcw, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface FlashcardsProps {
  questions: Question[];
  masteredQuestionIds: number[];
  onToggleMastery: (id: number) => void;
}

export default function Flashcards({ questions, masteredQuestionIds, onToggleMastery }: FlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0); // wrap around
      }
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setIndex(questions.length - 1);
      }
    }, 150);
  };

  const currentQuestion = questions[index];

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-slate-500">Chưa có câu hỏi nào để hiển thị thẻ.</div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto" id="flashcard-study-deck">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-800 font-sans tracking-tight">THẺ HỌC NĂNG ĐỘNG (FLASHCARDS)</h3>
        <p className="text-xs text-slate-500">Ấn chạm trực tiếp vào Thẻ để khám phá Đáp án &amp; Tuyệt chiêu bán hàng thực chiến</p>
      </div>

      {/* Progress tracker */}
      <div className="flex justify-between items-center text-xs font-mono text-slate-500 px-2">
        <span>Thẻ thứ: <b className="text-slate-800 font-bold">{index + 1}</b> / {questions.length}</span>
        <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-105">
          {currentQuestion.category}
        </span>
      </div>

      {/* 3D Flipping Card Stage */}
      <div 
        className="w-full h-96 relative cursor-pointer group"
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
        >
          {/* FRONT SIDE (Question) */}
          <div 
            className="absolute inset-0 w-full h-full bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Background design elements */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-semibold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Câu hỏi tư vấn viên
              </span>
              <span className="text-slate-400 text-[10px] font-mono">#00{currentQuestion.id}</span>
            </div>

            <div className="flex-1 flex items-center py-4">
              <h4 className="text-base md:text-lg font-bold text-slate-800 leading-snug font-sans">
                {currentQuestion.question}
              </h4>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 font-sans">
              <RotateCcw className="w-3.5 h-3.5 text-blue-650 animate-spin" style={{ animationDuration: '4s' }} />
              Chạm nhẹ để nẫy xem đáp án chính xác
            </div>
          </div>

          {/* BACK SIDE (Correct Answer & Master selling Tips) */}
          <div 
            className="absolute inset-0 w-full h-full bg-white border-2 border-emerald-500/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' 
            }}
          >
            {/* Background decorations */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Đáp án chuẩn &amp; Kỹ năng
              </span>
              <span className="text-emerald-700 text-xs font-mono font-bold bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100">
                Ý {currentQuestion.correct_answer} ĐÚNG
              </span>
            </div>

            {/* Answer Display */}
            <div className="flex-1 py-4 space-y-3.5 overflow-y-auto">
              {/* Correct answer list item details */}
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-xl text-xs font-semibold">
                {currentQuestion.options.find(opt => opt.startsWith(currentQuestion.correct_answer)) || currentQuestion.options[0]}
              </div>

              {/* Training Tips */}
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-1.5">
                <div className="text-[10px] text-orange-950 font-mono uppercase tracking-wider flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3 text-orange-600 shrink-0" />
                  Góc tư duy Chuyên gia đào tạo:
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-sans">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 py-2 border-t border-slate-100 font-sans font-medium">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              Cách tư vấn đập bỏ băn khoăn của Quý khách
            </div>
          </div>
        </motion.div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between gap-4 max-w-sm mx-auto pt-2">
        <button
          onClick={handlePrev}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-600 cursor-pointer active:scale-90 transition-all shadow-sm"
          title="Thẻ trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setFlipped(!flipped)}
          className="flex-1 py-3 px-5 border border-blue-600 text-white bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
        >
          <Sparkles className="w-4 h-4 shrink-0 text-amber-200" />
          Lật Thẻ Ngay
        </button>

        <button
          onClick={handleNext}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-600 cursor-pointer active:scale-90 transition-all shadow-sm"
          title="Thẻ tiếp"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
