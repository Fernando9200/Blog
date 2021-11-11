import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css';

export const Footer = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => window.location.href = 'https://github.com/'}>GitHub</div>
        </div>
    );
};