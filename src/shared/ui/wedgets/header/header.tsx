import { Logo } from '@/shared/ui/icon/logo/logo';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.logoLink}
          href="/"
          aria-label="khimanychDigital — на главную"
        >
          <Logo className={styles.logo} />
        </a>

        <nav className={styles.navigation} aria-label="Основная навигация">
          <a className={styles.navLink} href="#services">
            Услуги
          </a>

          <a className={styles.navLink} href="#team">
            О команде
          </a>

          <a className={styles.projectLink} href="#contacts">
            Обсудить проект
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}