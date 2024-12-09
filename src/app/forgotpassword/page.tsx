"use client"

import React, { useState } from "react";
import styles from '../styles/auth.module.css';
import { FormEvent } from "react";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert } from "../../services/alerts";
import useUserStore from "../../store/userStore";

const CreateNewPassword = () => {

    const [newPassword, setNewPassword] = useState<string>("");

    const router = useRouter();
    const { setUser } = useUserStore();

    const email = "mk@gmail.com";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = await authService.CreateNewPassword(email, newPassword);
            setUser(user);
            await showSuccessAlert("your password changed successfully! welcome!");
            router.push("/home");
        } catch (error: any) {
            console.error("Error creating user:", error);
            showErrorAlert("Error changing password");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewPassword(value);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Create a New Password</h1>
            <input type="text" className={styles.input} onChange={(e) => handleChange(e)} />
            <button className={styles.submitButton} type="submit">
                Change Password
            </button>
        </form>
    )
};

export default CreateNewPassword;
