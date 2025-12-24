export type Experience = {
  role: string;
  organization: string;
  timeframe: string;
  location?: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: 'Cofounder',
    organization: 'Hoot',
    timeframe: 'Summer 2024',
    location: 'Cambridge, MA',
    points: [
      'Prototyped guidance simulations for autonomous aircraft using Python and MATLAB.',
      'Built dashboards to visualize flight telemetry and anomaly trends.',
      'Collaborated with a 6-person team to validate flight scenarios in CI pipelines.'
    ]
  },
  {
    role: 'AI Systems Fellow',
    organization: 'Future Vision Initiative',
    timeframe: '2023 — Present',
    location: 'Remote',
    points: [
      'Designed LLM-powered research assistants to accelerate literature reviews.',
      'Ran A/B tests on prompt strategies, improving response quality by 18%.',
      'Documented reproducible workflows and mentored two junior fellows.'
    ]
  },
  {
    role: 'Engineering Lead',
    organization: 'Aero Robotics Club',
    timeframe: '2022 — 2023',
    location: 'Ann Arbor, MI',
    points: [
      'Led avionics stack development for competition drone platforms.',
      'Integrated sensor fusion for real-time navigation with 30% latency reduction.',
      'Organized weekly code reviews and hardware-in-the-loop demos.'
    ]
  }
];
