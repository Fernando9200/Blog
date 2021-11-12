import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css';

export const Footer = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => window.location.href = 'https://www.workana.com/freelancer/0e4ed7aa5719ac3e8e4835b4dd4a9c92'}>Workana</div>
            <div onClick={() => window.location.href = 'https://www.linkedin.com/in/fernando-carretto/'}>LinkedIn</div>
            <div onClick={() => window.location.href = 'https://github.com/Fernando9200'}>GitHub</div>
        </div>
    );
};