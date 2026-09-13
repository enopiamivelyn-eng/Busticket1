'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();

  const userLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/my-bookings', label: 'My Bookings' },
    { href: '/ticket', label: 'My Ticket' },
    { href: '/reservation', label: 'My Reservation' },
    { href: '/profile', label: 'Profile' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/bookings', label: 'Bookings' },
    { href: '/admin/buses', label: 'Buses' },
    { href: '/admin/routes', label: 'Routes' },
    { href: '/admin/payments', label: 'Payments' },
    { href: '/admin/users', label: 'User' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src="/assets/images/logo-SCSIT.png" alt="SCSIT Logo" />
        </div>
        <span className={styles.logoText}>
          Salazar <span className={styles.logoHighlight}>Lost and Found</span>
        </span>
      </div>

      <nav>
        <ul className={styles.navMenu}>
          {links.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <Link
                href={link.href}
                className={pathname === link.href ? styles.active : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.userAvatar}></div>
        <span className={styles.username}>Username</span>
      </div>
    </aside>
  );
}
