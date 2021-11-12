import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';


export const Toolbar = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/academic')}>Formação</div>
            <div onClick={() => router.push('/projects')}>Projetos</div>
            <div onClick={() => router.push('/contact')}>Contato</div>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Redes Sociais</button>
                <div className={styles.dropdowncontent}>
                    <a onClick={() => window.location.href = 'https://www.workana.com/freelancer/0e4ed7aa5719ac3e8e4835b4dd4a9c92'}>Workana</a>
                    <a onClick={() => window.location.href = 'https://www.linkedin.com/in/fernando-carretto/'}>LinkedIn</a>
                    <a onClick={() => window.location.href = 'https://github.com/Fernando9200/novo-site'}>GitHub</a>
                </div>
            </div>
        </div>

        
    );
};