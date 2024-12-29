import React from "react";
import styles from "./FixedExpensesManager.module.css";
import { FixedExpenseCard, FixedExpenseForm } from "../index";
import useUserStore from "@/store/userStore";

interface SlideInFormProps {
    onClose: () => void;
    isVisible: boolean;
}

const FixedExpensesManager: React.FC<SlideInFormProps> = ({ onClose, isVisible }) => {
    const { user } = useUserStore();

    return (
        <div className={`${styles.slideInForm} ${isVisible ? styles.open : ""}`}>
            <button className={styles.closeButton} onClick={onClose}>
                ✖ סגור
            </button>
            <div className={styles.content}>
                <h2 className={styles.title}>Manage Your Fixed Expenses</h2> {/* הוספת כותרת באנגלית */}
                <section className={styles.fixedExpensesSection}>
                    {user?.fixedExpenses?.map((exp) => (
                        <FixedExpenseCard expense={exp} key={exp._id} />
                    ))}
                </section>
                <FixedExpenseForm />
            </div>
        </div>
    );
};

export default FixedExpensesManager;
