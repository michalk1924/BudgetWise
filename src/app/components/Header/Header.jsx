import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';
import logo from '../../images/logo.png';
import brush_stain from '../../images/brush_stain.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={logo} alt="Logo" width={200} height={75} />
      <nav className={styles.navbar}>
        <div className={styles.brand}></div>
        <ul className={styles.menu}>
          <li>
            <Link href="/home">Home</Link>
            <Image src={brush_stain} alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/categories">Categories</Link>
            <Image src={brush_stain} alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/savings">Savings</Link>
            <Image src={brush_stain} alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/reports">Reports</Link>
            <Image src={brush_stain} alt="brush_stain" width={20} height={20} />
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
