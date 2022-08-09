import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'

export default function GiphyLoader() {
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY)
const getRandomGif = async () => {
    const {data} = await gf.random({ tag: 'funny', rating: 'pg'})
    setGifData(data)
};

useEffect(() => {  
    getRandomGif();
    const interval = setInterval(getRandomGif, 10000);
    return () => {
        clearInterval(interval);
    };
  }, []);

const [gifData, setGifData] = useState();

return (
    <>
    <div onClick={getRandomGif} className={styles.gifLoader}>
        {gifData?.id && <Gif gif={gifData} width={300} height={250}/>}
    </div>
    </>
)
}
