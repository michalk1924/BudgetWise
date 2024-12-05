import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{
          width: `${Math.min(percentage, 100)}%`,
          backgroundColor: '#4caf50',
        }}
      >
        {percentage > 100 && <span className={styles.tooltip}>well done</span>}
        {percentage > 90 && percentage <= 100 && <span className={styles.tooltip}>you almost there</span>}

      </div>
    </div>
  );
};

export default ProgressBar;
