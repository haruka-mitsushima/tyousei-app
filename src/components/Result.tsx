import React from "react";
import styles from "@/styles/Top.module.css";
import { useDispatch, useSelector } from "react-redux";
import { State } from "types/State";
import { deleteItem } from "@/features/item/ItemSlice";

const Result = () => {
  const { items } = useSelector((state: State) => state.item);
  const dispatch = useDispatch();
  const copy = () => {
    const copyText = items.map((item) => item.text).join("\n");
    navigator.clipboard.writeText(copyText.toString());
  };
  return (
    <div className={styles.resultArea}>
      <div className={styles.resultLabel}>入力結果</div>
      <div className={styles.result}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemWrapper}>
            <div key={item.id}>{item.text}</div>
            <button onClick={() => dispatch(deleteItem(item.id))}>削除</button>
          </div>
        ))}
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={() => copy()} className={styles.submitBtn}>
          コピー
        </button>
      </div>
    </div>
  );
};

export default Result;
