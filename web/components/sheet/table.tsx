
import classNames from 'classnames';

import styles from './Sheet.module.scss';

export default function Table() {
  return (
    <div className={styles['table']}>
      <div className={styles['table__header']}>
        <div className={classNames(
          styles['table__header__cell'],
          styles['table__header__cell--number'],
        )}>
          No.</div>
        <div className={styles['table__header__cell']}>Nama</div>
        <div className={styles['table__header__cell']}>Gaji Pokok</div>
        <div className={styles['table__header__cell']}>Uang Makan</div>
        <div className={styles['table__header__cell']}>Lemburan</div>
        <div className={styles['table__header__cell']}>Cicilan = Sisa</div>
        <div className={classNames(
          styles['table__header__cell'],
          styles['table__header__cell--bonus'],
        )}>
          <div className={styles['table__header__cell--bonus__top']}>Bonus</div>
          <div className={styles['table__header__cell--bonus__bottom']}>
            <div>Tunjangan</div>
            <div>Absensi</div>
            <div>Transport</div>
            <div>Bonus</div>
          </div>
        </div>
        <div className={styles['table__header__cell']}>Jumlah</div>
      </div>

      <div className={styles['table__body']}></div>
    </div>
  ); 
};
