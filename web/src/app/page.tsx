'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'


export default function Home() {
  // const router = useRouter()
  const router = useRouter()

  return (<div>
    <div>
      <button className="btn btn-primary" onClick={()=>{
        // console.log('click me...')
        router.push('/crud')
      }}>add</button>
    </div>
    <div></div>
  </div>
  );
}
