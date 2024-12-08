"use client"
import { useState } from "react";
import styles from './profile.module.css';
import useUserStore from "@/store/userStore";

const Profile: React.FC = () => {

    const clearUser = useUserStore((state) => state.clearUser);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUserStore();

    const handleSave = () => {
        setIsEditing(false);
        // console.log("Saved data:", { user, email }); // אופציונלי - שמירת המידע
    };

    const handleLogout = () => {
        clearUser();
        window.location.href = '/about'; 
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
                                value={user?.username}
                                // onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.username}</span>
                        )}
                    </div>
                </div>
                <div className={styles.row}>
                    <img src="/email-removebg-preview.png" alt="Email Icon" className={styles.icon} />
                    <div>
                        {isEditing ? (
                            <input
                                type="email"
                                value={user?.email}
                                // onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.email}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {/* {isEditing ? (
                    <button onClick={handleSave} className={`${styles.button} ${styles.save}`}>
                        <img src="/save-icon.png" alt="Save Icon" className={styles.saveIcon} />
                    </button>
                ) : 
                (
                    <button onClick={() => setIsEditing(true)} className={`${styles.button} ${styles.edit}`}>
                        Edit
                    </button>
                )
                } */}
                <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
