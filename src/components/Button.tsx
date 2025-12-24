import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children' | 'onClick'>;

const Button = ({
  children,
  variant = 'primary',
  href,
  target,
  rel,
  onClick,
  ...rest
}: ButtonProps) => {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <a className={className} href={href} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
