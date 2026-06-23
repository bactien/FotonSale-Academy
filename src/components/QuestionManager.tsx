import React, { useState } from 'react';
import { Question } from '../types';
import { 
  Plus, 
  Copy, 
  Check, 
  Search, 
  Trash2, 
  HelpCircle, 
  Sparkles, 
  FileJson, 
  ListOrdered,
  Download,
  Upload,
  RefreshCw,
  BadgeAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestionManagerProps {
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onDeleteQuestion: (id: number) => void;
  onImportQuestions?: (qs: Question[], overwrite: boolean) => void;
  onResetDefaultQuestions?: () => void;
}

export default function QuestionManager({ 
  questions, 
  onAddQuestion, 
  onDeleteQuestion, 
  onImportQuestions,
  onResetDefaultQuestions 
}: QuestionManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'view' | 'add' | 'json'>('view');

  // Pagination Configuration
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Form states for adding custom questions
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState<'Sản phẩm' | 'Thị trường' | 'Kỹ năng' | 'Khách hàng' | 'Từ chối'>('Sản phẩm');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrect, setNewCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [newExplanation, setNewExplanation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // File IO Status Configuration
  const [importMode, setImportMode] = useState<'merge' | 'overwrite'>('merge');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(questions, null, 2);
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.warn('Navigator clipboard copy failed, attempting fallback:', err);
        fallbackCopyText(jsonStr);
      });
    } else {
      fallbackCopyText(jsonStr);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy command was unsuccessful');
      }
    } catch (err) {
      console.error('Fallback wordbook copy failed:', err);
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newQuestion.trim() || !newOptA.trim() || !newOptB.trim() || !newOptC.trim() || !newOptD.trim() || !newExplanation.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ tất cả các trường dữ liệu bắt buộc.');
      return;
    }

    const created: Question = {
      id: questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1,
      category: newCategory,
      question: newQuestion,
      options: [
        `A. ${newOptA}`,
        `B. ${newOptB}`,
        `C. ${newOptC}`,
        `D. ${newOptD}`
      ],
      correct_answer: newCorrect,
      explanation: newExplanation
    };

    onAddQuestion(created);

    // Reset Form
    setNewQuestion('');
    setNewOptA('');
    setNewOptB('');
    setNewOptC('');
    setNewOptD('');
    setNewCorrect('A');
    setNewExplanation('');
    setActiveSegment('view');
  };

  // State-machine Bulletproof CSV Parser
  const parseCSVToRows = (text: string): string[][] => {
    const result: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let entry = '';
    
    // Clean BOM if present
    let rawText = text;
    if (rawText.startsWith('\uFEFF')) {
      rawText = rawText.substring(1);
    }
    
    for (let i = 0; i < rawText.length; i++) {
      const char = rawText[i];
      const nextChar = rawText[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          entry += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(entry);
        entry = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\n' && rawText[i - 1] === '\r') {
          // Skip redundant line feed
          continue;
        }
        row.push(entry);
        if (row.length > 0 && row.some(cell => cell.length > 0)) {
          result.push(row);
        }
        row = [];
        entry = '';
      } else {
        entry += char;
      }
    }
    
    if (entry || row.length > 0) {
      row.push(entry);
      result.push(row);
    }
    
    return result;
  };

  // Export JSON file
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Foton_Academy_Questions_Set.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export CSV file (Excel ready with BOM)
  const handleExportCSV = () => {
    const headers = ['Mã câu hỏi (id)', 'Phân mảng chính (category)', 'Nội dung câu hỏi (question)', 'Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D', 'Đáp án đúng (A/B/C/D)', 'Giải thích chi tiết (explanation)'];
    
    const rows = questions.map(q => {
      // Striking out original prefixes if they have it (e.g. "A. Option content" -> "Option content")
      const optA = q.options[0] ? q.options[0].replace(/^[A-D]\.\s*/, '') : '';
      const optB = q.options[1] ? q.options[1].replace(/^[A-D]\.\s*/, '') : '';
      const optC = q.options[2] ? q.options[2].replace(/^[A-D]\.\s*/, '') : '';
      const optD = q.options[3] ? q.options[3].replace(/^[A-D]\.\s*/, '') : '';
      
      return [
        q.id,
        q.category,
        q.question,
        optA,
        optB,
        optC,
        optD,
        q.correct_answer,
        q.explanation
      ];
    });

    const csvContent = [headers, ...rows]
      .map(row => row.map(val => {
        const escaped = ('' + (val ?? '')).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(','))
      .join('\n');

    // BOM is needed for Microsoft Excel to auto-recognize UTF-8 encoding in Vietnamese characters
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Foton_Academy_Questions_Set.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Sample CSV template for editing
  const handleDownloadCSVSample = () => {
    const headers = ['Mã câu hỏi (id)', 'Phân mảng chính (category)', 'Nội dung câu hỏi (question)', 'Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D', 'Đáp án đúng (A/B/C/D)', 'Giải thích chi tiết (explanation)'];
    const sampleRows = [
      [
        '1',
        'Sản phẩm',
        'Ai là thương hiệu động cơ gánh tải vàng danh giá lắp gầm trên Aumark S70L?',
        'Weichai nông nghiệp',
        'Cummins ISF3.8 dũng cảm của Mỹ sản sinh 168HP lực kéo',
        'Yuchai thông dụng',
        'Isuzu nguyên khối cơ bản',
        'B',
        'Foton Aumark S70L xài Động cơ Cummins ISF3.8s5168 Mỹ với momen xoắn phẳng dạt tới 500Nm giúp bứt tốc thong thả dốc đèo tốt.'
      ],
      [
        '2',
        'Kỹ năng',
        'Khoản dầm Chassis của Foton Aumark S70 và S70L được gia công sản xuất thế nào?',
        'Dập sấy nóng qua lửa',
        'Dập nguội nguyên khối kẹp kép nguyên bệ sườn nhôm thép mác cao cường lực 6.0mm',
        'Uốn cong hàn dập thủ công',
        'Dẫn động từ sườn phụ tùng bãi',
        'B',
        'Chassis dòng Foton S70/S70L dập nguội nguyên khối kẹp kép 6mm nguyên tấm có độ thăng bằng sườn và sức gánh tải lực nén hoàn toàn trùm sạt so với xe dập nóng rẻ tiền.'
      ]
    ];

    const csvContent = [headers, ...sampleRows]
      .map(row => row.map(val => {
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Foton_Question_Sample_Set.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON handler
  const handleImportJSONFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error('Cấu hình file JSON mẫu phải là dạng một mảng danh sách câu hỏi.');
        }

        const validated: Question[] = [];
        for (const item of parsed) {
          if (!item.question || !Array.isArray(item.options) || item.options.length < 2 || !item.correct_answer || !item.category) {
            throw new Error('Từng câu hỏi nạp phải chứa đủ: category, question, options (Mảng), correct_answer, explanation.');
          }
          validated.push({
            id: Number(item.id) || validated.length + 1,
            category: item.category,
            question: item.question,
            options: item.options.map((opt: string, idx: number) => {
              const cleaned = opt.replace(/^[A-D]\.\s*/, '');
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              return `${letter}. ${cleaned}`;
            }),
            correct_answer: item.correct_answer,
            explanation: item.explanation || ''
          });
        }

        if (onImportQuestions) {
          onImportQuestions(validated, importMode === 'overwrite');
          setImportStatus({
            type: 'success',
            message: `Nạp thành công ${validated.length} câu hỏi từ file JSON vào bộ sát hạch!`
          });
        }
      } catch (err: any) {
        setImportStatus({
          type: 'error',
          message: `Lỗi đọc nạp file JSON: ${err.message}`
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Import CSV/Excel handler
  const handleImportCSVFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCSVToRows(text);
        if (rows.length < 2) {
          throw new Error('File CSV của bạn rỗng hoặc không đúng cấu hình định dạng mành.');
        }

        const validated: Question[] = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 3) continue;

          const rawId = Number(row[0]);
          const category = (row[1] || 'Sản phẩm').trim() as any;
          const question = (row[2] || '').trim();
          const optA = (row[3] || '').trim();
          const optB = (row[4] || '').trim();
          const optC = (row[5] || '').trim();
          const optD = (row[6] || '').trim();
          const correct = (row[7] || 'A').toUpperCase().trim() as any;
          const explanation = (row[8] || '').trim();

          if (!question || !optA || !optB) continue;

          const optionsList = [optA, optB, optC, optD].filter(o => o.length > 0);
          const options = optionsList.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return `${letter}. ${opt}`;
          });

          validated.push({
            id: isNaN(rawId) ? validated.length + 1 : rawId,
            category,
            question,
            options,
            correct_answer: correct,
            explanation
          });
        }

        if (validated.length === 0) {
          throw new Error('Không phân mảnh được câu hỏi hợp lệ nào phù hợp chuỗi. Vui lòng tải CSV Mẫu để so khớp cột!');
        }

        if (onImportQuestions) {
          onImportQuestions(validated, importMode === 'overwrite');
          setImportStatus({
            type: 'success',
            message: `Nạp thành công ${validated.length} câu hỏi mới từ file CSV/Excel vào bộ lọc!`
          });
        }
      } catch (err: any) {
        setImportStatus({
          type: 'error',
          message: `Lỗi đọc nạp file CSV: ${err.message}`
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredQuestions = questions.filter(q => 
    (q.question || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.explanation || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6" id="question-management-system">
      {/* Sub menu controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
        <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-2xl">
          <button
            onClick={() => { setActiveSegment('view'); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSegment === 'view' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            Danh Sách Câu Hỏi ({questions.length})
          </button>
          <button
            onClick={() => { setActiveSegment('add'); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSegment === 'add' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm Câu Mới
          </button>
          <button
            onClick={() => { setActiveSegment('json'); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeSegment === 'json' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            Xuất/Nhập File &amp; JSON Code
          </button>
        </div>

        {activeSegment === 'view' && (
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm nội dung đề..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all font-sans font-medium shadow-none"
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW CURRENT DECK LIST */}
        {activeSegment === 'view' && (
          <motion.div
            key="view-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* AUTORESTORE HELPER BANNER IF QUESTIONS COUNT IS LOW */}
            {questions.length <= 40 && onResetDefaultQuestions && (
              <div className="p-4 bg-orange-50 border border-orange-150 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-2 text-orange-800 text-xs font-sans font-semibold">
                  <BadgeAlert className="w-4.5 h-4.5 text-orange-600 shrink-0" />
                  <span>Bộ nhớ cache lưu cũ gồm {questions.length} câu. Hãy nhấp ĐỒNG BỘ NẠP NGAY 600 câu hỏi dã chiến Foton Mới Nhất!</span>
                </div>
                <button
                  onClick={onResetDefaultQuestions}
                  className="py-1.5 px-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-[10px] uppercase cursor-pointer transition-all flex items-center gap-1 shrink-0 self-end sm:self-auto"
                >
                  <RefreshCw className="w-3 h-3" />
                  Nạp Đầy Đủ 600 Câu
                </button>
              </div>
            )}

            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 border border-slate-150 rounded-2xl text-slate-550 text-xs font-sans">
                Không tìm thấy câu hỏi tương khớp với từ khóa của bạn.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedQuestions.map((q) => (
                    <div 
                      key={q.id}
                      className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between gap-4 group transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            Câu {q.id} • {q.category}
                          </span>
                          
                          <button
                            onClick={() => onDeleteQuestion(q.id)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-xl transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                            title="Xóa câu hỏi này khỏi danh sách đang kiểm tra"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-sm font-bold text-slate-800 leading-relaxed font-sans mt-1">
                          {q.question}
                        </h4>

                        <div className="space-y-1.5 pl-2 border-l border-slate-100 font-sans text-xs text-slate-600">
                          {q.options.map((opt, i) => {
                            const isCorrect = opt.startsWith(q.correct_answer);
                            return (
                              <div key={i} className={isCorrect ? 'text-emerald-700 font-bold' : ''}>
                                {opt}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-3 bg-orange-50/50 border border-orange-100/60 rounded-xl text-[11px] text-slate-700 leading-relaxed font-sans font-medium">
                        <b className="text-orange-950 not-italic font-bold block uppercase tracking-wider text-[9px] mb-0.5">Tư duy bán hàng:</b>
                        {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 animate-fade-in">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none transition-all"
                    >
                      Trang trước
                    </button>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      Trang <b className="text-slate-800">{currentPage}</b> / {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none transition-all"
                    >
                      Trang sau
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ADD CUSTOM QUESTION FORM */}
        {activeSegment === 'add' && (
          <motion.div
            key="add-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-white border border-slate-200 rounded-3xl space-y-6 max-w-xl mx-auto shadow-sm"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-850 font-sans uppercase">Biên soạn câu hỏi trắc nghiệm mới</h3>
              <p className="text-xs text-slate-500">Mẫu thi số {questions.length + 1} sẽ lập tức đổ bộ vào bộ Flashcards và Sát hạch để rà soát.</p>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs bg-rose-50 border border-rose-100 rounded-xl text-rose-700 font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phân mảng chính</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Sản phẩm">Kiến thức sản phẩm - Foton</option>
                    <option value="Thị trường">Hiểu thị trường miền Bắc</option>
                    <option value="Kỹ năng">Tư vấn sành sỏi &amp; Quy trình 9-MOTS</option>
                    <option value="Khách hàng">Phân tích Khách hàng</option>
                    <option value="Từ chối">Xử lý Từ chối &amp; Đắt giá</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Đáp án đúng của thẻ</label>
                  <select
                    value={newCorrect}
                    onChange={(e) => setNewCorrect(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="A">Khẳng định Ý A</option>
                    <option value="B">Khẳng định Ý B</option>
                    <option value="C">Khẳng định Ý C</option>
                    <option value="D">Khẳng định Ý D</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nội dung câu hỏi rõ ràng</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Khách hàng chê thương hiệu Foton ít phổ biến hơn KIA, một TVBH chuyên nghiệp nên..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans font-medium"
                />
              </div>

              {/* Options */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 tracking-wider">Các ý phương án lựa chọn (A, B, C, D)</label>
                
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-xs text-slate-400 w-4 font-bold">A.</span>
                  <input
                    type="text"
                    placeholder="Điền nội dung phương án A..."
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans font-medium"
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-xs text-slate-400 w-4 font-bold">B.</span>
                  <input
                    type="text"
                    placeholder="Điền nội dung phương án B..."
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans font-medium"
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-xs text-slate-400 w-4 font-bold">C.</span>
                  <input
                    type="text"
                    placeholder="Điền nội dung phương án C..."
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans font-medium"
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-xs text-slate-400 w-4 font-bold">D.</span>
                  <input
                    type="text"
                    placeholder="Điền nội dung phương án D..."
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1 border-t border-slate-100 pt-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between tracking-wider">
                  <span>Giải thích chi tiết (Tư duy của chuyên gia 10 năm kinh nghiệm)</span>
                  <span className="lowercase text-amber-600 font-normal">học tập cực tốt *</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Gói giải thích bao hàm luận điểm bán hàng, so sánh kỹ thuật rực rỡ để tài xế hoặc sales mới đọc học dễ hiểu trôi chảy..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-blue-500/10"
              >
                <Plus className="w-4 h-4" />
                Cập nhật bổ sung vào đề
              </button>
            </form>
          </motion.div>
        )}

        {/* FILE EXPORT / IMPORT MANAGER PORTAL (REPLACES SIMPLE JSON VIEWER) */}
        {activeSegment === 'json' && (
          <motion.div
            key="json-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* LEFT COLUMN: ACTIVE ENGINES IMPORT/EXPORT */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-800 font-sans uppercase">Xuất Bản File Đề Thi</h3>
                <p className="text-xs text-slate-405">Tải bộ câu hỏi hiện tại sang tệp tin để nạp lưu trữ hoặc chỉnh sửa bằng Excel.</p>
              </div>

              {/* EXPORT BUTTONS ROW */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleExportJSON}
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer shadow-none select-none"
                >
                  <span className="flex items-center gap-2 text-slate-800">
                    <FileJson className="w-4 h-4 text-orange-500 shrink-0" />
                    Bản JSON Đầy Đủ (.JSON)
                  </span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer shadow-none select-none"
                >
                  <span className="flex items-center gap-2 text-slate-800 animate-fade-in">
                    <FileJson className="w-4 h-4 text-emerald-600 shrink-0" />
                    Bản Excel Bảng Tính (.CSV / UTF-8)
                  </span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={handleDownloadCSVSample}
                  className="w-full py-2.5 px-4 bg-orange-50/50 hover:bg-orange-550/10 border border-orange-100/60 text-orange-850 font-sans font-bold rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer shadow-none select-none"
                >
                  <span className="flex items-center gap-1.5 font-sans font-bold">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    Tải File Excel Mẫu Để Soạn Sửa
                  </span>
                  <span className="text-[10px] text-orange-700 bg-orange-100/60 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">Bản Mẫu</span>
                </button>
              </div>

              {/* COPY CLIPBOARD ACCORDION */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-650 font-sans uppercase">Copy mã JSON nhanh</h4>
                  <button
                    onClick={handleCopyJSON}
                    className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-bold transition-all text-[11px] flex items-center gap-1 cursor-pointer shadow-none"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                        Đã copy ráo!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy 1-Click
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150 max-h-40 overflow-y-auto font-mono text-[9px] text-blue-900/70 leading-relaxed scrollbar-thin">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(questions.slice(0, 3), null, 2)}<br />... [và còn lại {questions.length - 3} câu]</pre>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: IMPORT STAGE FILE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 font-sans uppercase">Nhập/Nạp File Đề Mới</h3>
                  <p className="text-xs text-slate-405">Tải lên tệp tự soạn chỉnh. Hỗ trợ thay thế hoàn toàn hoặc ghép phụ thêm vào dữ liệu đang chứa.</p>
                </div>

                {/* MERGE OR OVERWRITE CHOICE SELECT */}
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Lựa chọn chế độ nạp hàng:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImportMode('merge')}
                      className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                        importMode === 'merge' 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 text-slate-650 hover:text-slate-800'
                      }`}
                    >
                      Ghép Thêm Đề Mới
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportMode('overwrite')}
                      className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                        importMode === 'overwrite' 
                          ? 'bg-rose-620 bg-rose-600 text-white shadow-sm' 
                          : 'bg-white border border-slate-200 text-slate-650 hover:text-slate-800'
                      }`}
                    >
                      Ghi Đè Thay Thế
                    </button>
                  </div>
                </div>

                {/* FILE INPUT UPLOAD ACTION BIND */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* JSON IMPORT FILE */}
                  <label className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-250 hover:border-blue-500 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all text-center gap-2">
                    <Upload className="w-5 h-5 text-orange-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Chọn File JSON</span>
                      <span className="text-[10px] text-slate-400 font-medium">(.json)</span>
                    </div>
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImportJSONFile} 
                      className="hidden" 
                    />
                  </label>

                  {/* CSV IMPORT FILE */}
                  <label className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-250 hover:border-blue-500 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all text-center gap-2">
                    <Upload className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block text-nowrap">Chọn File CSV (Excel)</span>
                      <span className="text-[10px] text-slate-400 font-medium">(.csv)</span>
                    </div>
                    <input 
                      type="file" 
                      accept=".csv" 
                      onChange={handleImportCSVFile} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* IMPORT FEEDBACK ALERT BANNER */}
                {importStatus && (
                  <div className={`p-3 text-xs font-medium rounded-xl border font-sans leading-relaxed ${
                    importStatus.type === 'success' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                      : 'bg-rose-50 border-rose-100 text-rose-800'
                  }`}>
                    {importStatus.message}
                  </div>
                )}
              </div>

              {onResetDefaultQuestions && (
                <div className="border-t border-slate-100 pt-3">
                  <button
                    onClick={onResetDefaultQuestions}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-150 hover:text-red-700 text-slate-500 font-bold rounded-xl text-[10px] uppercase cursor-pointer transition-all flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Khôi phục 600 câu hỏi gốc Thaco Foton
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
