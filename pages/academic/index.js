import Head from 'next/head';
import styles from '/styles/Academic.module.css';
import { Toolbar } from '/components/toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer } from '/components/footer';


export default function Academic({ academics }) {
  const router = useRouter();
  const [mappedAcademics, setMappedAcademics] = useState([]);

  useEffect(() => {
    if (academics.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'b547fsql',
        dataset: 'production',
    });
    
    setMappedAcademics(
      academics.map(p => {
        return {
          ...p,
          mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
        }
      })
    );
  } else {
      setMappedAcademics([]);
    }
  }, [academics]);

  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>Welcome to my blog</h1>

        <div className={styles.feed}>
          {mappedAcademics.length ? mappedAcademics.map((p, index) => (
            <div onClick={() => router.push(`/academic/${p.slug.current}`)} key={index} className={styles.academic}>
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
  const query = encodeURIComponent('*[ _type == "academic" ]');
  const url = `https://b547fsql.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        academics: [],
      }
    }
  } else {
    return {
      props: {
        academics: result.result,
      }
    }
  }
};