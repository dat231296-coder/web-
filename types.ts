
export interface MarketingIdea {
  title: string;
  content: string;
  hashtags: string[];
  emoji: string;
  target: 'Student' | 'Office Worker' | 'General';
}

export interface GenerationParams {
  tone: string;
  urgency: 'high' | 'medium' | 'low';
  serviceType: string;
}
