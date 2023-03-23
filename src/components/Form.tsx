import React, { FormEvent } from "react";
import styles from "@/styles/Top.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setDateError,
  setEndTime,
  setError,
  setStartTime,
  setTimeError,
} from "@/features/form/FormSlice";
import { setId, addItem } from "@/features/item/ItemSlice";
import { State } from "types/State";

const Form = () => {
  const { formDate, startTime, endTime, error, dateError, timeError } =
    useSelector((state: State) => state.form);
  const { id } = useSelector((state: State) => state.item);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formDate === "" || startTime === "" || endTime === "") {
      dispatch(setError(true));
      return;
    }
    if (new Date() > new Date(formDate)) {
      dispatch(setDateError(true));
      return;
    }
    if (startTime > endTime) {
      dispatch(setTimeError(true));
      return;
    }
    dispatch(setError(false));
    dispatch(setDateError(false));
    dispatch(setTimeError(false));
    dispatch(setId(id));
    const exactDate = new Date(formDate);
    const month = exactDate.getMonth() + 1;
    const date = exactDate.getDate();
    const dayCode = exactDate.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayCode];
    const data = {
      id: id,
      text: `${month}月${date}日(${dayOfWeekStr}) ${startTime}～${endTime}`,
    };
    dispatch(addItem(data));
  };
  return (
    <div className={styles.formWrapper}>
      <form action="post" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formTytleWrapper}>
          <div className={styles.formTitle}>入力フォーム</div>
          {error ? (
            <div className={styles.errorMessage}>
              入力されていない項目があります
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={styles.inputArea}>
          <div className={styles.dateFormWrapper}>
            <div className={styles.dateTitleWrapper}>
              <label htmlFor="date" className={styles.formLabel}>
                日付
              </label>
              {dateError ? (
                <div className={styles.dateErrorMessage}>
                  未来日付を選択してください
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <input
              type="date"
              name="date"
              id="data"
              onChange={(e) => dispatch(setDate(e.target.value))}
            />
          </div>
          <div className={styles.timeFormWrapper}>
            <div className={styles.timeTitleWrapper}>
              <div className={styles.formLabel}>時間</div>
              {timeError ? (
                <div className={styles.timeErrorMessage}>
                  終了時刻が開始時刻よりも早いです
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              <label htmlFor="startTime" className={styles.timeFormTitle}>
                開始時刻
              </label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                onChange={(e) => dispatch(setStartTime(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="endTime" className={styles.timeFormTitle}>
                終了時刻
              </label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                onChange={(e) => dispatch(setEndTime(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.submitBtn}>決定</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
