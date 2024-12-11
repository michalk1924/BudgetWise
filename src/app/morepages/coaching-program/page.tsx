import React from "react";
import { Colors } from "../../../consts/enums";
import styles from "../../styles/styles.module.css";

const CoachingProgram: React.FC = () => {
  return (
    <div className={styles.page} style={{ backgroundColor: Colors.Primary }}>
      <h1>Coaching Program</h1>
      <p>Welcome to our coaching program! Stay motivated and achieve your goals.</p>
    </div>
  );
};

export default CoachingProgram;
