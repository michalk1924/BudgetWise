import React from 'react';
import styles from './Alerts.module.css'; // ייבוא הקובץ CSS
import {Alert} from '../../../types/types'




// טיפוס עבור ה-props של הקומפוננטה
interface AlertProps {
    alert: Alert;
    onMarkAsDone: (alert: Alert) => void; // פונקציה שנשלחת כפרופס
}

const Alerts: React.FC<AlertProps> = ({ alert, onMarkAsDone }) => {
    // פונקציה לטיפול בלחיצה על התמונה, שהיא גם קוראת לפונקציה שנשלחה כפרופס
    const handleMarkAsDone = () => {
        onMarkAsDone(alert); // קריאה לפונקציה שנשלחה כפרופס
    };

    return (
        <div className={`${styles.alertItem} ${alert.isActive ? styles.active : styles.inactive}`}>
            <div className={styles.alertHeader}>
                <span className={styles.alertType}>{alert.type}</span>
                <span className={styles.alertDate}>
                    {new Date(alert.createdAt).toLocaleDateString()}
                </span>
                <button
                    className={styles.completeButton}
                    onClick={handleMarkAsDone}
                    title="Mark as done"
                >
                    <img
                        src="/complete.png"
                        alt="Mark as done"
                        className={styles.completeImage}
                    />
                </button>
            </div>
            <div className={styles.alertBody}>
                <p><strong>Condition:</strong> {alert.triggerCondition}</p>
            </div>
        </div>
    );
};

export default Alerts;
