import { useState } from 'react';
import { TruckSpec } from '../types';
import { fotonSpecs } from '../data/specs';
import { AlertTriangle, Scale, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function SpecExplorer() {
  const [selectedTruck, setSelectedTruck] = useState<TruckSpec>(fotonSpecs[0]);
  const [filterSegment, setFilterSegment] = useState<string>('Tất cả');

  const segments = ['Tất cả', 'Tải Nhẹ (LDT)', 'Tải Trung (MDT)', 'Tải Nặng (HDT)', 'Đầu Kéo'];

  const filteredSpecs = fotonSpecs.filter((item) => {
    if (filterSegment === 'Tất cả') return true;
    return item.segment === filterSegment;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left side: Spec Selector Sidebar */}
      <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase font-sans">
            Bộ Lọc Phân Khúc
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {segments.map((seg) => (
              <button
                key={seg}
                onClick={() => {
                  setFilterSegment(seg);
                  // Auto pick first truck matching segment
                  const matched = fotonSpecs.find(s => seg === 'Tất cả' || s.segment === seg);
                  if (matched) setSelectedTruck(matched);
                }}
                className={`text-[10px] md:text-xs px-3 py-2 rounded-xl font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  filterSegment === seg
                    ? 'bg-blue-600 text-white shadow-sm border border-blue-600'
                    : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-350'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-200 my-1" />

        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
          <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
            Danh sách Xe ({filteredSpecs.length})
          </label>
          {filteredSpecs.map((truck) => {
            const isActive = selectedTruck.id === truck.id;
            return (
              <button
                key={truck.id}
                onClick={() => setSelectedTruck(truck)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex flex-col gap-1 items-start cursor-pointer ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm'
                    : 'border-slate-150 bg-white hover:bg-slate-50/60 text-slate-600'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-sm text-slate-800">{truck.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase transition-colors ${
                    truck.powerType === 'Xăng' ? 'bg-amber-100 text-amber-800 border border-amber-200/50' : 'bg-blue-100 text-blue-700 border border-blue-200/50'
                  }`}>
                    {truck.powerType}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full font-mono text-[10px] text-slate-500 font-medium mt-1">
                  <span>Tải: {truck.payload}</span>
                  <span>Thùng: {truck.dimension.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Spec Sheet Display */}
      <div className="col-span-1 lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm">
        {selectedTruck ? (
          <motion.div
            key={selectedTruck.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header Product */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/50">{selectedTruck.segment}</span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-150">Nhiên liệu: {selectedTruck.powerType}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 font-sans tracking-tight">{selectedTruck.name}</h2>
              <p className="text-slate-500 italic text-xs mt-1.5">{selectedTruck.title}</p>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <SpecItem label="Động cơ" value={selectedTruck.engine} />
                <SpecItem label="Dung tích xy lanh" value={selectedTruck.capacity} />
                <SpecItem label="Mô-men xoắn cực đại" value={selectedTruck.torque} isHighlight />
                <SpecItem label="Công suất cực đại" value={selectedTruck.power} />
                <SpecItem label="Hộp số phối bộ" value={selectedTruck.gearbox} />
              </div>
              <div className="space-y-3">
                <SpecItem label="Tải trọng cho phép" value={selectedTruck.payload} />
                <SpecItem label="Kích thước thùng Lọt Lòng" value={selectedTruck.dimension} />
                <SpecItem label="Khung Chassis bệ gầm" value={selectedTruck.chassis} />
                <SpecItem label="Hệ thống treo gánh lực" value={selectedTruck.suspension} />
                <SpecItem label="Phanh &amp; An Toàn chủ động" value={selectedTruck.safety} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <SpecItem label="Tiện nghi Cabin nổi trội" value={selectedTruck.comfort} />
              <SpecItem label="Chính sách Cam kết Hậu mãi" value={selectedTruck.warranty} isHighlight labelColor="text-amber-600 font-bold" />
            </div>

            {/* Strengths & Weaknesses (Sales ammunition) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5 border-t border-slate-100">
              {/* Strengths / USPs */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  Luận điểm bán hàng Vàng (USPs)
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 font-sans leading-relaxed">
                  {selectedTruck.strengths.map((str, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-emerald-500 font-black mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Counter Arguments to Weaknesses */}
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-orange-600 animate-pulse" />
                  Nhược điểm &amp; Tuyệt chiêu xử lý phản đối
                </h4>
                <div className="space-y-4 text-xs font-sans">
                  {selectedTruck.weaknesses.map((weak, idx) => (
                    <div key={idx} className="space-y-1 pb-2 border-b border-orange-100 last:border-b-0 last:pb-0">
                      <div className="flex gap-1.5 text-[11px] font-bold text-rose-600 items-start">
                        <span className="shrink-0 text-rose-700 font-mono text-[9px] uppercase font-black">❓ KH Chê:</span>
                        <span>{weak.con}</span>
                      </div>
                      <div className="flex gap-1.5 text-orange-950 items-start italic leading-relaxed pl-2.5 border-l border-orange-200">
                        <span className="shrink-0 text-orange-800 font-black font-mono text-[9px] not-italic uppercase">➡️ Trị:</span>
                        <span>{weak.conResponse}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Competitors Box */}
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between text-xs font-mono flex-wrap gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                Đối thủ so găng:
              </span>
              <span className="text-slate-705 text-right font-sans font-bold">{selectedTruck.competitors}</span>
            </div>

          </motion.div>
        ) : (
          <div className="flex items-center justify-center p-20 text-slate-400">
            Hãy chọn một dòng sản phẩm để tham chiếu thông số kỹ thuật.
          </div>
        )}
      </div>
    </div>
  );
}

// Micro Helper Component for clean specs display
interface SpecItemProps {
  label: string;
  value: string;
  isHighlight?: boolean;
  labelColor?: string;
}

function SpecItem({ label, value, isHighlight = false, labelColor = 'text-slate-400' }: SpecItemProps) {
  return (
    <div className={`p-3 rounded-2xl border leading-relaxed transition-all duration-100 ${
      isHighlight 
        ? 'bg-blue-50/50 border-blue-200/60 shadow-none' 
        : 'bg-slate-50 border-slate-150'
    }`}>
      <span className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isHighlight ? 'text-blue-600' : labelColor}`}>
        {label}
      </span>
      <span className={`block text-xs font-sans ${isHighlight ? 'text-blue-900 font-extrabold' : 'text-slate-700 font-medium'}`}>
        {value}
      </span>
    </div>
  );
}
