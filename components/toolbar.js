import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/academic')}>Formação</div>
            <div onClick={() => router.push('/projects')}>Projetos</div>
            <div onClick={() => router.push('/contact')}>Contact</div>
        </div>
    );
};