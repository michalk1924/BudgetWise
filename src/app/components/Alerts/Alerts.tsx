import React from 'react';
import styles from './Alerts.module.css'; 
import { Alert } from '../../../types/types';

interface AlertProps {
    alert: Alert;
    onMarkAsDone: (alert: Alert) => void;
    onDeactivateAlert: (alert: Alert) => void;

}

const Alerts: React.FC<AlertProps> = ({ alert, onMarkAsDone, onDeactivateAlert  }) => {
    const handleMarkAsDone = () => {
        onMarkAsDone(alert);
    };

    const handleMouseEnter = () => {
        if (alert.isActive) {
            onDeactivateAlert(alert);
        }
    };

        const severityClass = 
        alert.severityLevel === 'critical' 
            ? (alert.isActive ? styles.criticalActive : styles.criticalInactive) :
        alert.severityLevel === 'warning' 
            ? (alert.isActive ? styles.warningActive : styles.warningInactive) :
        (alert.isActive ? styles.payAttentionActive : styles.payAttentionInactive);
return (
        <div className={`${styles.alertItem} ${severityClass}`} onMouseEnter={handleMouseEnter}>
            <div className={styles.alertHeader}>
                <span className={styles.alertSeverity}>{alert.severityLevel}</span>
                <span>{alert.type}</span>
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
