interface NavigationTypes {
  id: string;
  name: string;
  path: string;
}

export const navigations: NavigationTypes[] = [
  { id: "1", name: "Find Jobs", path: "/jobs" },
  { id: "2", name: "Browser Companies", path: "/companies" },
];
