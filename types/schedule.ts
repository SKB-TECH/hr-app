

export interface CalEvent {
  id: string;
  title: string;
  date: string;      
  startHour: number;  
  endHour: number;
  color: string;      
  category: string;
  avatars?: string[];
}

export interface Category {
  id: string;
  label: string;
  color: string;  
  checked: boolean;
}