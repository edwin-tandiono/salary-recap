import styles from './Sheet.module.scss';
import Table from './table';

export function Sheet() {
  return (
    <div className={styles['sheet']}>
      <nav>
        
      </nav>
      <main>
        <Table />
      </main>
    </div>
  );
}
