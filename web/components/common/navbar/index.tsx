import styles from './Navbar.module.scss';

import type { ClassAttributes, HTMLAttributes } from 'react';
import type { JSX } from 'react/jsx-runtime';


export default function Navbar (
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>,
) {
  return <nav className={styles['navbar']} {...props} />;
};
