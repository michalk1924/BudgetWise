import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './ProgressCircle.module.css';

interface ProgressCircleProps {
  percentage: number;
  current: number;
  target: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage, current, target }) => {
  return (
    <div className={styles.progressCircleContainer}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={5} 
        styles={buildStyles({
          pathColor: percentage >= 100 ? '#A1D6B2':'#EF5A6F' , 
          trailColor: '#ddd',
          strokeLinecap: 'round'
        })}
      />
      {/* Details in the center of the circle */}
      <div className={styles.progressCircleDetails}>
        <div className={styles.current}>${current.toFixed(2)}</div>
        <div className={styles.target}>Target: ${target.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProgressCircle;