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

// Service Template - reusable service definition stored in library
export interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  category?: string; // e.g., "Setup", "Enrichment", "Foundation Building", "CLE"
  defaultDurationWeeks: number;
  defaultDeliverables: string[]; // Default deliverables for this service
  defaultPrice: number;
  tags?: string[]; // For searching/filtering
  createdAt: string;
  updatedAt: string;
}

// Proposal Package Template - reusable package definition
export interface PackageTemplate {
  id: string;
  name: string;
  description: string;
  serviceTemplateIds: string[]; // References to ServiceTemplate IDs
  defaultPrice: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Service Instance in a Proposal - references a template but can be customized
export interface ProposalServiceInstance {
  id: string;
  serviceTemplateId: string; // Reference to ServiceTemplate
  phaseId?: string; // Assigned to a phase
  customName?: string; // Override template name
  customDescription?: string; // Override template description
  durationWeeks: number; // Can override template default
  deliverables: string[]; // Can customize from template
  price: number; // Can override template default
}

// Package Instance in a Proposal
export interface ProposalPackageInstance {
  id: string;
  packageTemplateId: string; // Reference to PackageTemplate
  serviceInstances: ProposalServiceInstance[]; // Expanded services
  customPrice?: number;
}

// Proposal structure - references templates by ID
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
  // New modular fields - references to templates
  serviceInstances: ProposalServiceInstance[]; // Selected services
  packageInstances?: ProposalPackageInstance[]; // Selected packages
}

