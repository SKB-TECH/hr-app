export interface NotificationBadge {
  label: string;

  type: "new" | "shortlisted";
}

export interface InterviewCardData {
  title: string;
  role: string;
  date: string;
  time: string;
  personName: string;
  personEmail: string;
  personAvatar: string; // image URL
}

export interface NotificationItem {
  id: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  badge?: NotificationBadge;
  interviewCard?: InterviewCardData;
}
