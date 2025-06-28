import styles from './Sheet.module.scss';
import Table from './table';

export function Sheet() {
  return (
    <div className={styles['sheet']}>
      <nav>
        <span>
          <small>Rekap Gaji Bulan:</small>
          &nbsp;
          <h3><b>JUNI 2025</b></h3>
        </span>
      </nav>
      <main>
        <Table />
      </main>
    </div>
  );
}
