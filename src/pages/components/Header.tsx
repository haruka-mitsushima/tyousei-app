import React from "react";
import styles from "@/styles/Top.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={styles.mainTitle}>日程調整返信作成フォーム</h1>
      <div className={styles.explanation}>
        面接や商談など、日程調整のやり取りの際に地味に面倒な日時の入力を手助けするアプリです。
        <br />
        希望の日付と時間帯を入力すると、入力結果欄に「〇月〇日(〇)
        〇:〇～〇:〇」という形式で出力します。
        <br />
        複数日程を追加することも可能です。コピーボタンを押してクリップボードにコピーすることができます。
      </div>
    </header>
  );
};

export default Header;
