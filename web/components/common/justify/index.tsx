import styles from './Justify.module.scss';

export default function Justify({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['justify']}>
      {children}
    </div>
  );
};
