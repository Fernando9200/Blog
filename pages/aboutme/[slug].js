import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';
import BlockContent from '@sanity/block-content-to-react';
import { Toolbar } from '../../components/toolbar';
import { Footer } from '../../components/footer';

export const Aboutme = ({ title, body, image }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId: 'b547fsql',
            dataset: 'production',
        });
        setImageUrl(imgBuilder.image(image));
    }, [image]);


    return (
        <div>
            <Toolbar />
            <div className={styles.main}>
                <div className={styles.title}>
                <h1>{title}</h1>
                </div>
        {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

        <div className={styles.body}>
            <BlockContent blocks={body} />
        </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
};

export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug;
    
    if (!pageSlug) {
        return {
            notFound: true
        }
        
    }
    const query = encodeURIComponent(`*[ _type == "aboutme" && slug.current == "${pageSlug}" ]`);
    const url = `https://b547fsql.api.sanity.io/v1/data/query/production?query=${query}`;

    const result = await fetch(url).then(res => res.json());
    const aboutme = result.result[0];

    if (!aboutme) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {
                body: aboutme.body,
                title: aboutme.title,
                image: aboutme.mainImage,
            }
        }
    }
};

export default Aboutme;