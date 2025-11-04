export interface Deliverable {
  id: string;
  name: string;
  description: string;
  why: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  deliverables: Deliverable[];
}

export interface Milestone {
  week: number;
  label: string;
  completed: boolean;
}

export interface CompensationBreakdown {
  item: string;
  amount: number;
}

export interface PaymentScheduleItem {
  dueDate: string;
  amount: number;
  label: string;
}

export interface Compensation {
  total: number;
  currency: string;
  breakdown: CompensationBreakdown[];
  paymentSchedule: PaymentScheduleItem[];
}

export interface Proposal {
  id: string;
  clientName: string;
  clientCompany: string;
  dateIssued: string;
  status: "draft" | "active" | "approved";
  purpose: string;
  phases: Phase[];
  compensation: Compensation;
  milestones: Milestone[];
  preparedBy: string;
}

