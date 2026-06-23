export interface Question {
  id: number;
  category: 'Sản phẩm' | 'Thị trường' | 'Kỹ năng' | 'Khách hàng' | 'Từ chối';
  question: string;
  options: string[];
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface TruckSpec {
  id: string;
  name: string;
  title: string;
  segment: 'Tải Nhẹ (LDT)' | 'Tải Trung (MDT)' | 'Tải Nặng (HDT)' | 'Đầu Kéo';
  powerType: 'Xăng' | 'Dầu';
  engine: string;
  capacity: string;
  power: string;
  torque: string;
  gearbox: string;
  payload: string;
  dimension: string;
  chassis: string;
  suspension: string;
  safety: string;
  comfort: string;
  warranty: string;
  strengths: string[];
  weaknesses: {
    con: string;
    conResponse: string;
  }[];
  competitors: string;
}

export interface SalesStep {
  step: number;
  name: string;
  objective: string;
  customerExpectation: string;
  expertTips: string[];
  mistakes?: string[];
}

export interface QuizHistoryItem {
  week: string;
  rate: number;
  date: string;
}
