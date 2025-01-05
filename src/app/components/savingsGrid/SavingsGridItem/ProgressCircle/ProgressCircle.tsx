import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./ProgressCircle.module.css";

interface ProgressCircleProps {
  percentage: number;
  current?: number;
  target?: number;
  isEditing?: boolean; // New prop to enable edit mode
  onTargetChange?: (value: number) => void; // Callback for target amount change
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  current = 0,
  target = 0,
  isEditing = false,
  onTargetChange,
}) => {
  const safeCurrent = Number(current); // Ensure current is a number
  const safeTarget = Number(target);  // Ensure target is a number

  return (
    <div className={styles.progressCircleContainer}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#6ac488" : "#EF5A6F",
          trailColor: "#ddd",
          strokeLinecap: "round",
        })}
      />
      {/* Details in the center of the circle */}
      <div className={styles.progressCircleDetails}>
        <div className={styles.current}>${safeCurrent.toFixed(2)}</div>
        {isEditing ? (
          <input
            type="number"
            value={safeTarget}
            onChange={(e) => onTargetChange?.(Number(e.target.value))}
            className={styles.editInput}
          />
        ) : (
          <div className={styles.target}>Target: ${safeTarget.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};


export default ProgressCircle;
