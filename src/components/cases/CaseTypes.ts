
export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  responsibleUser: string;
  category: string;
  status: "進行中" | "結案" | "暫停" | "諮詢階段";
  date: string;
  courtNumber?: string;
}

export const mockCases: Case[] = [
  {
    id: "CS001",
    caseNumber: "C-2025-042",
    title: "王大明 v. 台北市政府",
    client: "王大明",
    responsibleUser: "張大律師",
    category: "行政訴訟",
    status: "進行中",
    date: "2025-05-02",
    courtNumber: "110-訴-123",
  },
  {
    id: "CS002",
    caseNumber: "C-2025-041",
    title: "林小華專利糾紛",
    client: "林小華",
    responsibleUser: "李小律師",
    category: "智慧財產",
    status: "進行中",
    date: "2025-04-28",
    courtNumber: "110-智財-456",
  },
  {
    id: "CS003",
    caseNumber: "C-2025-039",
    title: "張三商標侵權",
    client: "張三",
    responsibleUser: "張大律師",
    category: "智慧財產",
    status: "進行中",
    date: "2025-04-25",
    courtNumber: "110-智財-789",
  },
  {
    id: "CS004",
    caseNumber: "C-2025-036",
    title: "李四繼承案",
    client: "李四",
    responsibleUser: "李小律師",
    category: "民事",
    status: "暫停",
    date: "2025-04-20",
    courtNumber: "110-民-321",
  },
  {
    id: "CS005",
    caseNumber: "C-2025-032",
    title: "陳五房產訴訟",
    client: "陳五",
    responsibleUser: "張大律師",
    category: "民事",
    status: "結案",
    date: "2025-04-15",
    courtNumber: "110-民-654",
  },
  {
    id: "CS006",
    caseNumber: "C-2025-030",
    title: "趙六諮詢案件",
    client: "趙六",
    responsibleUser: "李小律師",
    category: "勞資糾紛",
    status: "諮詢階段",
    date: "2025-04-10",
  },
];
