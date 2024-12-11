"use client";
import { useState, useEffect } from "react";
import styles from './profile.module.css';
import useUserStore from "@/store/userStore";
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
    const clearUser = useUserStore((state) => state.clearUser);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUserStore();
    const router = useRouter();

    // בדוק אם אנחנו בצד הלקוח בלבד לפני הפנייה ל-router
    if (typeof window !== "undefined" && !user) {
        router.push('/login');
        return null; // לא להציג את הקומפוננטה אם אין משתמש
    }

    const handleSave = () => {
        setIsEditing(false);
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
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.email}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;