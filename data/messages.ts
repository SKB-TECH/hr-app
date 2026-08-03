export interface Attachment {
  name: string;
  url: string;
  isImage: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  attachment?: Attachment;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  favorite?: boolean;
  pinned?: boolean;
  muted?: boolean;
  messages: Message[];
}

export const currentUser = {
  id: "me",
  name: "Maria Kelly ",
  avatar: "/team/person3.png",
};

export const conversations: Conversation[] = [
  {
    id: "1", name: "Jan Mayer", role: "Recruiter", company: "Nomad",
    avatar: "/team/person1.png",
    lastMessage: "We want to invite you for a qui...", time: "12 mins ago", unread: true,
    messages: [
      { id: "m1", senderId: "1", text: "Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.", timestamp: "12 mins ago", isOwn: false },
      { id: "m2", senderId: "1", text: "We want to invite you for a quick interview", timestamp: "12 mins ago", isOwn: false },
      { id: "m3", senderId: "me", text: "Hi Jan, sure I would love to. Thanks for taking the time to see my work!", timestamp: "12 mins ago", isOwn: true },
    ],
  },
  {
    id: "2", name: "Joe Bartmann", role: "Hiring Manager", company: "Stripe",
    avatar: "/team/person2.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [
      { id: "m1", senderId: "2", text: "Hey thanks for your interview today. We were really impressed!", timestamp: "3:40 PM", isOwn: false },
      { id: "m2", senderId: "me", text: "Thank you so much! I really enjoyed learning about the team.", timestamp: "3:42 PM", isOwn: true },
    ],
  },
  {
    id: "3", name: "Ally Wales", role: "Engineering Lead", company: "Vercel",
    avatar: "/team/person3.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "3", text: "Hey thanks for your interview. We'd love to move forward with the process.", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "4", name: "James Gardner", role: "CTO", company: "Linear",
    avatar: "/team/person4.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "4", text: "Hey thanks for your interview. Really great to meet you!", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "5", name: "Allison Geidt", role: "People Ops", company: "Figma",
    avatar: "/team/person5.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "5", text: "Hey thanks for your interview. We'll be in touch soon!", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "6", name: "Ruben Culhane", role: "Tech Lead", company: "Notion",
    avatar: "/team/person6.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "6", text: "Hey thanks for your interview. Loved chatting with you.", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "7", name: "Lydia Diaz", role: "Recruiter", company: "Airbnb",
    avatar: "/team/person7.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "7", text: "Hey thanks for your interview. We're reviewing candidates now.", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "8", name: "James Dokidis", role: "Engineering Manager", company: "Shopify",
    avatar: "/team/person8.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "8", text: "Hey thanks for your interview. Very impressed with your portfolio.", timestamp: "3:40 PM", isOwn: false }],
  },
  {
    id: "9", name: "Angelina Swann", role: "Head of Design", company: "Loom",
    avatar: "/team/person9.png",
    lastMessage: "Hey thanks for your interview...", time: "3:40 PM", unread: false,
    messages: [{ id: "m1", senderId: "9", text: "Hey thanks for your interview. Your design sense is great.", timestamp: "3:40 PM", isOwn: false }],
  },
];