import Link from 'next/link';
import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  breadcrumb: {
    href?: string;
    label: string;
  };
}

const BreadCrumb: React.FC<BreadcrumbProps> = ({ breadcrumb }) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/dashboard" className={styles.dashboard}>
            Dashboard
          </Link>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className={styles.separator}>
            <path d="M3.828 1.707a1 1 0 0 1 1.414 0L9 5.586a1 1 0 0 1 0 1.414L5.242 9.828a1 1 0 0 1-1.414-1.414L7.586 6 3.828 2.242a1 1 0 0 1 0-1.414z"/>
          </svg>
          <span className={styles.breadcrumbLabel}>
            {breadcrumb.label}
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default BreadCrumb;
