import Head from 'next/head';
import styles from '/styles/Contact.module.css';
import { Toolbar } from '/components/toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer } from '/components/footer';

export default function Contact({ contacts }) {
    const router = useRouter();
    const [mappedContacts, setMappedContacts] = useState([]);
  
    useEffect(() => {
      if (contacts.length) {
        const imgBuilder = imageUrlBuilder({
          projectId: 'b547fsql',
          dataset: 'production',
      });
      
      setMappedContacts(
        contacts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
        setMappedContacts([]);
      }
    }, [contacts]);
  
    return (
      <div>
        <Toolbar />
        <div className={styles.main}>
          <h1>Welcome to my blog</h1>
  
          <h3>Recent posts: </h3>
  
          <div className={styles.feed}>
            {mappedContacts.length ? mappedContacts.map((p, index) => (
              <div onClick={() => router.push(`/contact/${p.slug.current}`)} key={index} className={styles.contact}>
                <h3>{p.title}</h3>
                <img className={styles.mainImage} src={p.mainImage}/>
              </div>
            )) : <>No Posts Yet</>}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export const getServerSideProps = async pageContext => {
    const query = encodeURIComponent('*[ _type == "contact" ]');
    const url = `https://b547fsql.api.sanity.io/v1/data/query/production?query=${query}`;
    const result = await fetch(url).then(res => res.json());
  
    if (!result.result || !result.result.length) {
      return {
        props: {
          contacts: [],
        }
      }
    } else {
      return {
        props: {
          contacts: result.result,
        }
      }
    }
  };