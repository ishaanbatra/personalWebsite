import type { FormEvent } from 'react';
import SectionWrapper from './SectionWrapper';
import Button from './Button';

const ContactSection = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const submission = Object.fromEntries(data.entries());
    console.log('Contact form submission:', submission);
    form.reset();
  };

  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      intro="Let’s talk about research, internships, or building something new together."
    >
      <div className="contact-grid">
        <div className="contact-details">
          <p>
            Feel free to reach out directly. I respond quickly to thoughtful emails and LinkedIn messages.
          </p>
          <ul className="contact-list">
            <li>
              <span className="muted">Email</span>
              <a className="text-link" href="mailto:hello@ishaansite.com">hello@ishaansite.com</a>
            </li>
            <li>
              <span className="muted">LinkedIn</span>
              <a className="text-link" href="https://www.linkedin.com/in/placeholder" target="_blank" rel="noreferrer">
                linkedin.com/in/placeholder
              </a>
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} placeholder="What would you like to discuss?" required />
          </div>
          <Button variant="primary">Send Message</Button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
