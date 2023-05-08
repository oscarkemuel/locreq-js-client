import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Entrega System</h1>
      <Link href="/dashboard">Acessar sistema</Link>
    </main>
  )
}
