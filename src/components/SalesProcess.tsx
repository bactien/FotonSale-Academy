import React, { useState } from 'react';
import { sales9MOTs } from '../data/specs';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  CheckCircle2, 
  AlertOctagon, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Workflow 
} from 'lucide-react';

export default function SalesProcess() {
  const [selectedStep, setSelectedStep] = useState(sales9MOTs[0]);

  return (
    <div className="space-y-6" id="sales-process-timeline-page">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-800 font-sans tracking-tight uppercase flex items-center justify-center gap-1.5">
          <Workflow className="w-5 h-5 text-blue-600" />
          QUY TRÌNH BÁN HÀNG CHUẨN VÀNG 9 BƯỚC (9-MOTS)
        </h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Được thiết lập dựa trên cẩm nang bán hàng thương mại thực chiến dành riêng cho Phân khúc Xe tải Foton tại thị trường miền Bắc.
        </p>
      </div>

      {/* Steps visual track */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-slate-200">
        {sales9MOTs.map((s, idx) => {
          const isActive = selectedStep.step === s.step;
          return (
            <React.Fragment key={s.step}>
              <button
                onClick={() => setSelectedStep(s)}
                className={`flex-shrink-0 cursor-pointer p-3 py-4 rounded-xl border text-center font-sans transition-all flex flex-col items-center justify-center min-w-[110px] md:min-w-[130px] ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 text-slate-500 bg-white hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[9px] font-mono block uppercase mb-1 font-bold ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>Giai ĐOẠN {s.step}</span>
                <span className="text-xs font-bold block truncate max-w-[100px] md:max-w-[120px]">{s.name.split(' (')[0]}</span>
              </button>
              {idx < sales9MOTs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Main step details view card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStep.step}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Award className="w-56 h-55 text-blue-600" />
          </div>

          {/* Heading */}
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-700 bg-blue-50 py-1 px-3.5 rounded-full border border-blue-100 inline-block mb-2">
              BƯỚC CHUẨN HOÁ {selectedStep.step} / 9
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug uppercase">
              {selectedStep.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Core Objectives */}
            <div className="space-y-4">
              <div className="space-y-1.5 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                  Mục tiêu cốt lõi của TVBH:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                  {selectedStep.objective}
                </p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Tâm lý/ Kỳ vọng của Khách Hàng:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                  {selectedStep.customerExpectation}
                </p>
              </div>

              {/* Red warning list of common mistakes */}
              {selectedStep.mistakes && selectedStep.mistakes.length > 0 && (
                <div className="space-y-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                  <h4 className="text-xs font-mono font-bold text-rose-750 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                    Sai lầm chí mạng cần triệt tiêu:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                    {selectedStep.mistakes.map((mis, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start leading-relaxed">
                        <span className="text-rose-600 font-bold mt-0.5">•</span>
                        <span>{mis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Expert Tips */}
            <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                Tuyệt học Kinh nghiệm huấn luyện:
              </h4>
              <div className="space-y-3.5 text-xs text-slate-800 leading-relaxed font-sans">
                {selectedStep.expertTips.map((tip, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-white/80 p-3 rounded-xl border border-orange-100 font-medium shadow-none">
                    <span className="p-1 px-2.5 bg-orange-100 text-orange-950 rounded-lg font-mono text-[9px] font-black uppercase shrink-0">
                      Tip {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom quick advisory slogan */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-2 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="font-sans leading-relaxed">
              <strong className="font-bold text-blue-950">Chỉ dẫn Giám đốc Đào tạo:</strong> Hãy dán chặt quy chuẩn hành động trên vào tâm thế hằng ngày. Thành hay bại của một sales mới không ở tài ăn nói ba hoa, mà nằm ở tính kỷ luật tuân thủ đúng bước chân của Khách Hàng.
            </p>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
