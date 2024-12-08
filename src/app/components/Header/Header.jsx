import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src='/logo.png' alt="Logo" width={190} height={55} />
      <nav className={styles.navbar}>
        <div className={styles.brand}></div>
        <ul className={styles.menu}>
          <li>
            <Link href="/home">Home</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/transactions">Transactions</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/categories">Categories</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/savings">Savings</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/reports">Reports</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
            <Image src='/brush_stain.png' alt="brush_stain" width={20} height={20} />
          </li>
          <li className={styles.userAccount}>
            <Link href="/profile" title="Your Account">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
