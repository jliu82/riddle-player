import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RiddlePlayer from './components/RiddlePlayer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Riddle/Brain teaser</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <RiddlePlayer></RiddlePlayer>
      </main>
    </div>
  )
}
