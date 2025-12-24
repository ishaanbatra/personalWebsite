import SectionWrapper from './SectionWrapper';

const ShareIdeaSection = () => {
  return (
    <SectionWrapper
      id="share-idea"
      title={(
        <a
          className="share-idea-link"
          href="https://docs.google.com/forms/d/e/1FAIpQLSczdWW5SqI0qijzjELLKI4VRHvrzl_o1SfBu5T1CyNJXMBgJA/viewform?usp=dialog"
          target="_blank"
          rel="noreferrer"
        >
          Share Your Idea!
        </a>
      )}
    >
      <></>
    </SectionWrapper>
  );
};

export default ShareIdeaSection;
