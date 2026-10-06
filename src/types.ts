export interface Course {
  id: string;
  title: string;
  tagline: string;
  level: string;
  duration: string;
  tools: string[];
  overview: string;
  whatYouWillLearn: string[];
  practicalSkills: string[];
  keyModules: {
    title: string;
    topics: string[];
  }[];
  popular?: boolean;
}

export interface AdmissionFormData {
  fullName: string;
  fatherName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  education: string;
  selectedCourse: string;
  preferredTiming: 'Morning' | 'Afternoon' | 'Evening' | 'Weekend';
  learningMode: 'Online' | 'Physical';
  accountingExperience: 'Beginner (No prior background)' | 'Basic Theory Knowledge' | 'Commerce Student (I.Com / B.Com / BBA / BS)' | 'Working Professional / Freelancer';
  message: string;
}

export interface AccountingWorkflowStep {
  stepNumber: number;
  name: string;
  shortDesc: string;
  purpose: string;
  keyRule: string;
  documentType: string;
  practicalActivity: string;
  exampleData: {
    title: string;
    details: string;
    notes: string;
  };
}

export interface SoftwareDetail {
  id: 'excel' | 'quickbooks' | 'xero' | 'zohobooks';
  name: string;
  badge: string;
  tagline: string;
  description: string;
  accentColor: string;
  practicalWorkflow: {
    stage: string;
    action: string;
    deliverable: string;
  }[];
  coreFeatures: string[];
  practicalExercises: string[];
}
