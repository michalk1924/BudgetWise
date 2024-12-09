import React from 'react';
import styles from './Alerts.module.css'; // ייבוא הקובץ CSS
import { FaCheckCircle } from 'react-icons/fa'; // ייבוא אייקון מבוסס react-icons

// טיפוס ההתרעה
interface Alert {
    _id: string;
    type: string;
    triggerCondition: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// טיפוס עבור ה-props של הקומפוננטה
interface AlertProps {
    alert: Alert;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
    // פונקציה לטיפול בלחיצה על האייקון
    const handleMarkAsDone = () => {
        console.log(`Task completed:`, alert);
    };

    return (
        <div className={`${styles.alertItem} ${alert.isActive ? styles.active : styles.inactive}`}>
            <div className={styles.alertHeader}>
                <span className={styles.alertType}>{alert.type}</span>
                <span className={styles.alertDate}>{new Date(alert.createdAt).toLocaleDateString()}</span>
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

export default Alert;
