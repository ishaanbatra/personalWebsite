export type SkillCategory = {
  category: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    items: ['TypeScript', 'Python', 'C++', 'MATLAB']
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'Node.js', 'FastAPI', 'D3.js']
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Docker', 'PostgreSQL', 'AWS']
  }
];
