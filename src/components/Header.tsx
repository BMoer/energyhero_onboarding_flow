import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoEnergy}>energy</span>
          <span className={styles.logoHero}>hero</span>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Stromanbieter wechseln</a>
          <a href="#" className={styles.navLink}>Gasanbieter wechseln</a>
          <a href="#" className={styles.navLink}>Betriebe</a>
          <a href="#" className={styles.navLink}>Kontakt</a>
        </nav>
      </div>
    </header>
  );
}
