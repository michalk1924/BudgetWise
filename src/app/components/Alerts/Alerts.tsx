import React from 'react';
import styles from './Alerts.module.css'; // ייבוא הקובץ CSS

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
    return (
        <div className={`${styles.alertItem} ${alert.isActive ? styles.active : styles.inactive}`}>
            <div className={styles.alertHeader}>
                <span className={styles.alertType}>{alert.type}</span>
                <span className={styles.alertDate}>{new Date(alert.createdAt).toLocaleString()}</span>
            </div>
            <div className={styles.alertBody}>
                <p><strong>Condition:</strong> {alert.triggerCondition}</p>
            </div>
        </div>
    );
};

export default Alert;
