import React, { useState } from 'react';
import styles from './AlertComp.module.css';
import { Alert } from '../../../types/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


interface AlertProps {
    alert: Alert;
    onMarkAsDone: (alert: Alert) => void;
    onDeleteAlert: () => void;
}

const AlertComp: React.FC<AlertProps> = ({ alert, onMarkAsDone, onDeleteAlert }) => {

    const [showSolutions, setShowSolutions] = useState(false); 

    const handleToggleSolutions = () => {
        setShowSolutions((prev) => !prev);
    };

    const handleMarkAsDone = () => {
        onMarkAsDone(alert);
    };

    const handleMouseEnter = () => {
        if (alert.isActive) {
            onMarkAsDone(alert);
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
                        onClick={onDeleteAlert}
                        style={{ cursor: 'pointer' }}
                    />
                </button>
            </div>
            <div className={styles.alertBody}>
                <p><strong>Condition:</strong> {alert.triggerCondition}</p>
            </div>
            <div className={styles.solutions}>
                <p onClick={handleToggleSolutions}>
                    <strong>
                        optional solutions {showSolutions ? '<<' : '>>'}
                    </strong>
                </p>
                {showSolutions && (
                    <div className={styles.solutionsList}>
                        {alert.solutions?.map((solution, index) => (
                            <div key={index} className={styles.solution}>
                                <p>{solution.description} <FontAwesomeIcon icon={faArrowRight} className={styles.iconStyles} /> </p>
                                {solution.actionLink && (
                                    <a href={solution.actionLink} target="_blank" rel="noopener noreferrer">
                                       {'\t'} solve
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertComp;
