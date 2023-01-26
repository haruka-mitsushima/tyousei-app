import { Preahvihear } from "@next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Tyousei () {
  const [formDate, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [text, setText] = useState(['']);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const exactDate = new Date(formDate);
    const month = exactDate.getMonth() + 1;
    const date = exactDate.getDate()
    const dayCode = exactDate.getDay();
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayCode] ;
    
    console.log(exactDate)
    const data = `${month}月${date}日(${dayOfWeekStr}) ${startTime}～${endTime}`;
    setText((prev) => [...prev, data])
    
  }
  return (
    <>
    <p>日程調整返信作成フォーム</p>
    <form action="post" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="date">日付</label>
      <input type="date" name="date" id="data" onChange={(e) => setDate(e.target.value)} />
      <br />
      <label htmlFor="startTime">開始時間</label>
      <input type="time" name="startTime" id="startTime" onChange={(e) => setStartTime(e.target.value)} />
      <br />
      <label htmlFor="endTime">開始時間</label>
      <input type="time" name="endTime" id="endTime" onChange={(e) => setEndTime(e.target.value)} />
      <br />
      <button>決定</button>
    </form>
    <div>入力結果</div>
    <div>{text.map((item)=>(<div key={item}>{item}</div>))}</div>
    </>
  )
}
