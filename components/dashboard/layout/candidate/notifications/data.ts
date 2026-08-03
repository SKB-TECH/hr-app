import { NotificationItem } from "./types";
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    senderName: "Jan Mayer",
    senderAvatar: "https://i.pravatar.cc/150?img=11",
    message: "invited you to interview with Nomad",
    isRead: false,
    timestamp: "12 mins ago",
    badge: { label: "New", type: "new" },
  },
  {
    id: "notif-2",
    senderName: "Jana Alicia",
    senderAvatar: "https://i.pravatar.cc/150?img=5",
    message: "from Udacity updated your job applications status",
    isRead: false,
    timestamp: "3 days ago",
    badge: { label: "Shortlisted", type: "shortlisted" },
  },
  {
    id: "notif-3",
    senderName: "Ally Wales",
    senderAvatar: "https://i.pravatar.cc/150?img=47",
    message: "from Digital Ocean sent you an interview invitation",
    isRead: true,
    timestamp: "14 July 2021 • 3:26 PM",
    interviewCard: {
      title: "Interview – Jake Gyll",
      role: "Social Media Manager Role",
      date: "Mon, 20 July 2021",
      time: "12 PM – 12:30 PM",
      personName: "Jake Gyll",
      personEmail: "jakegyll@email.com",
      personAvatar: "https://i.pravatar.cc/150?img=68",
    },
  },
];

export const MOCK_COMPANY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-c-1",
    senderName: "Jake Gyll",
    senderAvatar: "https://i.pravatar.cc/150?img=68",
    message: "applied for the Social Media Manager role",
    isRead: false,
    timestamp: "2 hours ago",
    badge: { label: "New Application", type: "new" },
  },
  {
    id: "notif-c-2",
    senderName: "Sarah Connor",
    senderAvatar: "https://i.pravatar.cc/150?img=22",
    message: "accepted the interview invitation",
    isRead: false,
    timestamp: "Yesterday",
    badge: { label: "Interview Accepted", type: "shortlisted" },
    interviewCard: {
      title: "Interview – Sarah Connor",
      role: "Lead Designer",
      date: "Thu, 23 July 2021",
      time: "10 AM – 11 AM",
      personName: "Sarah Connor",
      personEmail: "sarah.connor@email.com",
      personAvatar: "https://i.pravatar.cc/150?img=22",
    },
  },
];
