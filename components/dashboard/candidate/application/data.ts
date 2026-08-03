export const application = [
  {
    id: "1",
    companyName: "Nomad",
    role: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review",
    logo: "/Nomad.png",
    location: "Remote",
  },
  {
    id: "2",
    companyName: "Udacity",
    role: "Social Media Assistant",
    dateApplied: "18 July 2021",
    status: "Shortlisted",
    logo: "/Udacity.png",
    location: "San Francisco",
  },
  {
    id: "3",
    companyName: "Packer",
    role: "Social Media Assistant",
    dateApplied: "2 July 2021",
    status: "Offered",
    logo: "/packer.png",
    location: "London",
  },
  {
    id: "4",
    companyName: "Divvy",
    role: "Social Media Assistant",
    dateApplied: "14 July 2021",
    status: "Interviewing",
    logo: "/divvy.png",
    location: "Florence",
  },
  {
    id: "5",
    companyName: "DigitalOcean",
    role: "Social Media Assistant",
    dateApplied: "4 July 2021",
    status: "Unsuitable",
    logo: "/DigitalOcean.png",
    location: "New York",
  },

  // add more to show pagination
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `${6 + i}`,
    companyName: `Company ${6 + i}`,
    role: i % 3 === 0 ? "Frontend Developer" : "Product Designer",
    dateApplied: `2021-07-${(i % 28) + 1}`,
    status:
      i % 5 === 0
        ? "In Review"
        : i % 5 === 1
          ? "Interviewing"
          : i % 5 === 2
            ? "Assessment"
            : i % 5 === 3
              ? "Offered"
              : "Hired",
    logo: "/Nomad.png",
    location: i % 2 === 0 ? "Florence" : "Remote",
  })),
];
