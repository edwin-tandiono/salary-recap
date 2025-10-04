import styles from './NavButton.module.scss';

export default function NavLink (props) {
  return <button className={styles['nav-button']} {...props} />;
};
