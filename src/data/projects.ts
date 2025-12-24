export type Project = {
  title: string;
  description: string;
  descriptionLink?: {
    label: string;
    href: string;
  };
};

export const projects: Project[] = [
  {
    title: 'Furuta Pendulum',
    description:
      'A project my friend and I started together in Fall 2025. Through the process, we both learned a ton about the basics of control theory. See more here.',
    descriptionLink: {
      label: 'here',
      href: 'https://www.instagram.com/dartra10/'
    }
  },
  {
    title: 'Hoot',
    description:
      'An AI Teaching Assisstant that prioritizes intellectual privacy and accurate guidance according to the specific course. Secured $24k funding and implementation at Purdue University. Try a small demo!',
      descriptionLink: {
        label: 'demo',
        href: '#'
      }  
    },
  {
    title: 'ISS Case Analysis',
    description:
      'Conducted a process-tracked comparative case analysis of the International Space Station to investigate how its institutional design determines decision-making in times of geopolitical and technological crises. Read it here.',
      descriptionLink: {
        label: 'here',
        href: 'https://docs.google.com/document/d/11q0cUtEFzE5K2DWFXMeFL9eu9h6G39SXWwGNWpZMciA/edit?usp=sharing'
      }
  },
  {
    title: 'RC Car Record',
    description:
      'Alongside 5 teammates, developed an RC car that broke the Guiness World Record for distance traveled on one charge. See the record here.',
      descriptionLink: {
        label: 'here',
        href: 'https://www.guinnessworldrecords.com/world-records/greatest-distance-by-a-radio-controlled-model-car-on-one-set-of-batteries-(rc)'
      }
  }
];
