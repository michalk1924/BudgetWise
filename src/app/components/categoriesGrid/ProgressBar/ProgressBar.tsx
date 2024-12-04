import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const progressColor = percentage > 100 ? "#EF5A6F" : "#A1D6B2";
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{
          width: `${Math.min(percentage, 100)}%`,
          backgroundColor: progressColor,
        }}
      >
        {percentage > 100 && <span className={styles.tooltip}>Over 100%</span>}
        {percentage > 90 && percentage <= 100 && <span className={styles.tooltip}>Over 90%</span>}

      </div>
    </div>
  );
};

export default ProgressBar;
