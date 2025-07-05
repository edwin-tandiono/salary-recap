import classNames from 'classnames';

import styles from './Button.module.scss';

export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(styles['button'], className)} {...props}>
      {children}
    </button>
  );
};
