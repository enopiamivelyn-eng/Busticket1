'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
}

export default function Header({ title, showBackButton = false, showSearch = true }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      router.push('/login');
    }
  };

  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        {showBackButton && (
          <button className={styles.backBtn} onClick={() => router.back()}>
            ←
          </button>
        )}
        {title && <span className={styles.pageTitle}>{title}</span>}
      </div>
      <div className={styles.headerRight}>
        {showSearch && <span className={styles.searchIcon}>🔍</span>}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
