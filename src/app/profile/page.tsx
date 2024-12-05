"use client"
import { useState } from "react";
import styles from './profile.module.css';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("MICHAL KASTNER");
    const [email, setEmail] = useState("MICHALK1924@GMAIL.COM");

    const handleSave = () => {
        setIsEditing(false); 
        console.log("Saved data:", { name, email }); // אופציונלי - שמירת המידע
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgtitle}>
            <h1 className={styles.title}>USER PROFILE</h1>
            </div>
            <div className={styles.info}>
                <div className={styles.row}>
                    <img src="/name-removebg-preview.png" alt="User Icon" className={styles.icon} />
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{name}</span>
                        )}
                    </div>
                </div>
                <div className={styles.row}>
                    <img src="/email-removebg-preview.png" alt="Email Icon" className={styles.icon} />
                    <div>
                        {isEditing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{email}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {isEditing ? (
                    <button onClick={handleSave} className={`${styles.button} ${styles.save}`}>
                        <img src="/save-icon.png" alt="Save Icon" className={styles.saveIcon} />
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className={`${styles.button} ${styles.edit}`}>
                        Edit
                    </button>
                )}
                <button className={`${styles.button} ${styles.logout}`}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
