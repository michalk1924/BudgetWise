import styles from './profile.module.css';

const Profile: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>USER PROFILE</h1>
            <div className={styles.info}>
                <div className={styles.row}>
                    <img src="/name-removebg-preview.png" alt="User Icon" className={styles.icon} />
                    <div>
                        <span className={styles.label}>NAME</span>
                        <span className={styles.value}>MICHAL KASTNER</span>
                    </div>
                </div>
                <div className={styles.row}>
                    <img src="/email-removebg-preview.png" alt="Email Icon" className={styles.icon} />
                    <div>
                        <span className={styles.label}>EMAIL</span>
                        <span className={styles.value}>MICHALK1924@GMAIL.COM</span>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.edit}`}>Edit</button>
                <button className={`${styles.button} ${styles.logout}`}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
