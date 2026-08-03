import {
  Stage,
  Note,
  Assignee,
  InterviewDay,
  Applicant,
} from "@/types/company-applicants";

export const applicantsData: Applicant[] = [
  // applicant 1
  {
    id: 1,
    applicantDetails: {
      name: "Jerom Bell",
      image: "/team/person1.png",
      title: "Product Designer",
      ratings: 4.0,
      applicationDate: "",
      appliedJobs: [
        { title: "Product Development", type: "Full-Time", field: "marketing" },
      ],
    },

    personalInfo: [
      { id: 1, label: "Full Name", value: "Jerome Bell" },
      { id: 2, label: "Gender", value: "Male" },
      {
        id: 3,
        label: "Date of Birth",
        value: "March 23, 1995",
        subValue: "(26 y.o)",
      },
      { id: 4, label: "Language", value: "English, French, Bahasa" },
      {
        id: 5,
        label: "Address",
        value: ["4517 Washington Ave.", "Manchester, Kentucky 39495"],
        isFullWidth: true,
      },
    ],
    professionalInfo: {
      about: [
        "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.",
        "For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
      ],
      details: [
        { id: 1, label: "Current Job", value: "Product Designer" },
        { id: 2, label: "Experience in Years", value: "4 Years" },
        {
          id: 3,
          label: "Highest Qualification Held",
          value: "Bachelors in Engineering",
        },
      ],
      skills: ["Project Management", "Copywriting", "English"],
    },
    applicationStage: {
      title: "Interview",
      stage: 3,
      totalStages: 4,
    },
    socialMedia: {
      email: "jeromebell45@gmail.com",
      phone: "+44 1245 572 890",
      instagram: "instagram.com/jeromebell",
      twitter: "twitter.com/jeromebell",
      website: "www.jeromebell.com",
    },
  },

  // Applicant 2
  {
    id: 2,
    applicantDetails: {
      name: "Sarah Jenkins",
      image: "/team/person2.png",
      title: "Frontend Engineer",
      ratings: 4.5,
      applicationDate: "",
      appliedJobs: [
        { title: "Product Development", type: "Full-Time", field: "marketing" },
      ],
    },
    personalInfo: [
      { id: 1, label: "Full Name", value: "Sarah Jenkins" },
      { id: 2, label: "Gender", value: "Female" },
      {
        id: 3,
        label: "Date of Birth",
        value: "August 12, 1992",
        subValue: "(30 y.o)",
      },
      { id: 4, label: "Language", value: "English, Spanish" },
      {
        id: 5,
        label: "Address",
        value: ["8920 Riverside Blvd.", "Austin, Texas 78701"],
        isFullWidth: true,
      },
    ],
    professionalInfo: {
      about: [
        "I'm a Senior Frontend Developer specializing in React and Next.js ecosystems. I thrive in building scalable, accessible, and highly performant web applications for enterprise clients.",
        "When I'm not coding, I'm actively contributing to open-source UI libraries and mentoring junior developers through local coding bootcamps.",
      ],
      details: [
        { id: 1, label: "Current Job", value: "Frontend Engineer" },
        { id: 2, label: "Experience in Years", value: "8 Years" },
        {
          id: 3,
          label: "Highest Qualification Held",
          value: "Masters in Computer Science",
        },
      ],
      skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Jest"],
    },
    applicationStage: {
      title: "Shortlisted",
      stage: 2,
      totalStages: 4,
    },
    socialMedia: {
      email: "sarahjenkins@gmail.com",
      phone: "+33 4323 572 890",
      website: "www.sarahjenkins.com",
    },
  },

  // Applicant 3
  {
    id: 3,
    applicantDetails: {
      name: "David Chen",
      image: "/team/person3.png",
      title: "Growth Marketer",
      ratings: 3.2,
      applicationDate: "",
      appliedJobs: [
        { title: "Language Tutor", type: "Remote", field: "Education" },
        { title: "Content Writer", type: "Hybrid", field: "Marketing" },
        {
          title: "Online Course Instructor",
          type: "Full-Time",
          field: "Education",
        },
        {
          title: "Translation Specialist",
          type: "Freelance",
          field: "Linguistics",
        },
      ],
    },
    personalInfo: [
      { id: 1, label: "Full Name", value: "David Chen" },
      { id: 2, label: "Gender", value: "Male" },
      {
        id: 3,
        label: "Date of Birth",
        value: "November 05, 1998",
        subValue: "(24 y.o)",
      },
      { id: 4, label: "Language", value: "English, Mandarin" },
      {
        id: 5,
        label: "Address",
        value: ["1220 Tech Park Way, Apt 4B", "San Jose, California 95131"],
        isFullWidth: true,
      },
    ],
    professionalInfo: {
      about: [
        "Data-driven marketing specialist with a proven track record of increasing ROI for SaaS companies. I excel at translating complex analytics into actionable growth strategies.",
      ],
      details: [
        { id: 1, label: "Current Job", value: "Growth Marketer" },
        { id: 2, label: "Experience in Years", value: "2 Years" },
        {
          id: 3,
          label: "Highest Qualification Held",
          value: "Bachelors in Marketing",
        },
      ],
      skills: ["SEO", "Google Analytics", "A/B Testing", "Content Strategy"],
    },
    applicationStage: {
      title: "In-Review",
      stage: 1,
      totalStages: 4,
    },
    socialMedia: {
      email: "david@gmail.com",
      phone: "+893 4323 572 890",
      website: "www.david.com",
    },
  },
];

export const ALL_STAGES: Stage[] = [
  "In-Review",
  "Shortlisted",
  "Interview",
  "Hired / Declined",
];

export const NOTES: Note[] = [
  {
    id: 1,
    authorName: "Maria Kelly",
    authorInitials: "MK",
    avatarImage: "/team/person1.png",
    date: "10 July, 2021 · 11:30 AM",
    message:
      "Please, do an interview stage immediately. The design division needs more new employee now",
    replyCount: 2,
  },
  {
    id: 2,
    authorName: "Maria Kelly",
    authorInitials: "MK",
    avatarImage: "/team/person3.png",
    date: "10 July, 2021 · 10:30 AM",
    message: "Please, do an interview stage immediately.",
  },
];

export const ASSIGNEES: Assignee[] = [
  { initials: "MK", avatar: "/team/person1.png" },
  { initials: "JT", avatar: "/team/person2.png" },
  { initials: "AR", avatar: "/team/person3.png" },
];

export const INTERVIEW_DAYS: InterviewDay[] = [
  {
    date: "Tomorrow - 10 July, 2021",
    slots: [
      {
        id: 1,
        candidateName: "Kathryn Murphy",
        candidateInitials: "KM",
        profile_image: "/team/person1.png",
        testType: "Written Test",
        timeRange: "10:00 AM – 11:30 AM",
        location: "Silver Crysta Room, Nomad",
      },
    ],
  },
  {
    date: "11 July, 2021",
    slots: [
      {
        id: 2,
        candidateName: "Jenny Wilson",
        candidateInitials: "JW",
        profile_image: "/team/person2.png",

        testType: "Written Test 2",
        timeRange: "10:00 AM – 11:00 AM",
        location: "Silver Crysta Room, Nomad",
      },
    ],
  },
  {
    date: "12 July, 2021",
    slots: [
      {
        id: 3,
        candidateName: "Thad Eddings",
        candidateInitials: "TE",
        profile_image: "/team/person3.png",
        testType: "Skill Test",
        timeRange: "10:00 AM – 11:00 AM",
        location: "Silver Crysta Room, Nomad",
      },
    ],
  },
  {
    date: "13 July, 2021",
    slots: [
      {
        id: 4,
        candidateName: "Thad Eddings",
        candidateInitials: "TE",
        profile_image: "/team/person3.png",
        testType: "Final Test",
        timeRange: "10:00 AM – 11:00 AM",
        location: "Silver Crysta Room, Nomad",
      },
    ],
  },
];
