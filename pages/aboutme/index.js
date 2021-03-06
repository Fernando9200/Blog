import Head from 'next/head';
import styles from '/styles/Contact.module.css';
import { Toolbar } from '/components/toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer } from '/components/footer';

export default function Aboutme({ aboutmes }) {
    const router = useRouter();
    const [mappedAboutmes, setMappedAboutmes] = useState([]);
  
    useEffect(() => {
      if (aboutmes.length) {
        const imgBuilder = imageUrlBuilder({
          projectId: 'b547fsql',
          dataset: 'production',
      });
      
      setMappedAboutmes(
        aboutmes.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
        setMappedAboutmes([]);
      }
    }, [aboutmes]);
  
    return (
      <div>
        <Toolbar />
        <div className={styles.main}>
          <h1>Bem-vindo ao meu blog</h1>
  
  
          <div className={styles.feed}>
            {mappedAboutmes.length ? mappedAboutmes.map((p, index) => (
              <div onClick={() => router.push(`/aboutme/${p.slug.current}`)} key={index} className={styles.aboutme}>
                <h3>{p.title}</h3>
                <img className={styles.mainImage} src={p.mainImage}/>
              </div>
            )) : <>No Posts Yet</>}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  
  export const getServerSideProps = async pageContext => {
    const query = encodeURIComponent('*[ _type == "aboutme" ]');
    const url = `https://b547fsql.api.sanity.io/v1/data/query/production?query=${query}`;
    const result = await fetch(url).then(res => res.json());
  
    if (!result.result || !result.result.length) {
      return {
        props: {
          aboutmes: [],
        }
      }
    } else {
      return {
        props: {
          aboutmes: result.result,
        }
      }
    }
  };