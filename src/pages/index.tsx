import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [formDate, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(false)
  const [timeError, setTimeError] = useState(false)
  const [text, setText] = useState(['']);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(formDate === '' || startTime === '' || endTime === '') {
      setError(true);
      return
    }
    if(startTime > endTime){
      setTimeError(true);
      return
    }
    setError(false)
    setTimeError(false)
    const exactDate = new Date(formDate);
    const month = exactDate.getMonth() + 1;
    const date = exactDate.getDate();
    const dayCode = exactDate.getDay();
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayCode] ;
    const data = `${month}月${date}日(${dayOfWeekStr}) ${startTime}～${endTime}`;
    setText((prev) => [...prev, data]);
  }

  const copy = () => {
    const copyText = text.slice(1).join('\n')
    navigator.clipboard.writeText(copyText.toString())
  }
  return (
    <>
    <Head>
      <title>日程調整返信作成</title>
    </Head>
    <p>日程調整返信作成フォーム</p>
    {error? (<div>入力されていない項目があります</div>): (<div></div>)}
    <form action="post" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="date">日付</label>
      <br />
      <input type="date" name="date" id="data" onChange={(e) => setDate(e.target.value)} />
      <br />
      <div>時間</div>
      {timeError?(<div>終了時刻が開始時刻よりも早いです</div>):(<div></div>)}
      <label htmlFor="startTime">開始時刻</label>
      <input type="time" name="startTime" id="startTime" onChange={(e) => setStartTime(e.target.value)} />
      <br />
      <label htmlFor="endTime">終了時刻</label>
      <input type="time" name="endTime" id="endTime" onChange={(e) => setEndTime(e.target.value)} />
      <br />
      <button>決定</button>
    </form>
    <div>入力結果</div>
    <div>{text.slice(1).map((item)=>(<div key={item}>{item}</div>))}</div>
    <button onClick={() => copy()}>コピー</button>
    </>
  )
}
