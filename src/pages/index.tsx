import Head from 'next/head'
import styles from '@/styles/Top.module.css'
import { FormEvent, useState } from 'react'

export default function Home() {
  const [formDate, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [id, setId] = useState(0);
  const [items, setItems] = useState([{id: id, text: ''}]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(formDate === '' || startTime === '' || endTime === '') {
      setError(true);
      return
    }
    if(new Date() > new Date(formDate)){
      setDateError(true);
      return
    }
    if(startTime > endTime){
      setTimeError(true);
      return
    }
    setError(false);
    setDateError(false);
    setTimeError(false);
    setId((prev) => prev + 1);
    const exactDate = new Date(formDate);
    const month = exactDate.getMonth() + 1;
    const date = exactDate.getDate();
    const dayCode = exactDate.getDay();
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayCode] ;
    const data = {id: id, text: `${month}月${date}日(${dayOfWeekStr}) ${startTime}～${endTime}`};
    setItems((prev) => [...prev, data]);
  }

  const deleteItem = (item: string) => {
    const newData = items.filter((element) => element.text !== item)
    setItems(newData)
  }

  const copy = () => {
    const copyText = items.slice(1).map((item) => item.text).join('\n')
    navigator.clipboard.writeText(copyText.toString())
  }
  return (
    <>
    <Head>
      <title>日程調整返信作成</title>
    </Head>
    <section className={styles.sectionWrapper}>
    <div className={styles.mainTitle}>日程調整返信作成フォーム</div>
    {error? (<div className={styles.errorMessage}>入力されていない項目があります</div>): (<div></div>)}
    <form action="post" onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.dateFormWrapper}>
      <div className={styles.dateTitleWrapper}>
      <label htmlFor="date" className={styles.formLabel}>日付</label>
      {dateError?(<div className={styles.dateErrorMessage}>未来日付を選択してください</div>):(<div></div>)}
      </div>
      <input type="date" name="date" id="data" onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className={styles.timeFormWrapper}>
      <div className={styles.timeTitleWrapper}>
      <div className={styles.formLabel}>時間</div>
      {timeError?(<div className={styles.timeErrorMessage}>終了時刻が開始時刻よりも早いです</div>):(<div></div>)}
      </div>
      <div>
      <label htmlFor="startTime" className={styles.timeFormTitle}>開始時刻</label>
      <input type="time" name="startTime" id="startTime" onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
      <label htmlFor="endTime" className={styles.timeFormTitle}>終了時刻</label>
      <input type="time" name="endTime" id="endTime" onChange={(e) => setEndTime(e.target.value)} />
      </div>
      </div>
      <div className={styles.btnWrapper}>
      <button className={styles.submitBtn}>決定</button>
      </div>
    </form>
    <div className={styles.resultArea}>
    <div>入力結果</div>
    <div>{items.slice(1).map((item)=>(<div key={item.id}><div key={id}>{item.text}</div><button onClick={() => deleteItem(item.text)}>削除</button></div>))}</div>
    <button onClick={() => copy()}>コピー</button>
    </div>
    </section>
    </>
  )
}
