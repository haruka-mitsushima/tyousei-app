import Head from "next/head";
import styles from "@/styles/Top.module.css";
import { useState } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import Result from "../components/Result";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Home() {
  const [formDate, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [id, setId] = useState(0);
  const [items, setItems] = useState([{ id: id, text: "" }]);

  return (
    <>
      <Head>
        <title>日程調整返信作成</title>
      </Head>
      <Header />
      <Provider store={store}>
        <section className={styles.sectionWrapper}>
          <div className={styles.contentWrapper}>
            <Form />
            <Result />
          </div>
        </section>
      </Provider>
    </>
  );
}
