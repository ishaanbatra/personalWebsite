export type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: {
    github?: string;
    demo?: string;
  };
};

export const projects: Project[] = [
  {
    title: 'Orbit Visualizer',
    description:
      'Interactive tool for visualizing orbital trajectories with dynamic parameter controls.',
    tech: ['React', 'TypeScript', 'D3.js'],
    links: {
      github: '#',
      demo: '#'
    }
  },
  {
    title: 'Mission Planner',
    description:
      'Web app that assembles launch windows, vehicle profiles, and risk metrics into a single brief.',
    tech: ['Next.js', 'Node', 'PostgreSQL'],
    links: {
      github: '#',
      demo: '#'
    }
  },
  {
    title: 'LLM Research Assistant',
    description:
      'Retrieval-augmented assistant that summarizes papers and drafts experiment templates.',
    tech: ['Python', 'FastAPI', 'OpenAI API'],
    links: {
      github: '#'
    }
  },
  {
    title: 'Autonomous Drone HUD',
    description:
      'Heads-up display for live drone telemetry with latency-aware alerts and replay mode.',
    tech: ['React', 'WebSockets', 'Three.js'],
    links: {
      demo: '#'
    }
  }
];
