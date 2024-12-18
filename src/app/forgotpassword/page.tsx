"use client"

import React, { useState, useEffect } from "react";
import styles from '../styles/auth.module.css';
import { FormEvent } from "react";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert } from "../../services/alerts";
import useUserStore from "../../store/userStore";

const CreateNewPassword = () => {

    const [code, setCode] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [checkOrcreate, setCheckOrcreate] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setEmail(localStorage.getItem("emailToSendCode") || "");
    }, []);

    const router = useRouter();
    const { setUser } = useUserStore();

    const handleSubmitCreateNewPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (error) return;
        try {
            setLoading(true);
            const user = await authService.CreateNewPassword(newPassword);
            setUser(user);
            await showSuccessAlert("Welcome!", "your password changed successfully!", 1000);
            router.push("/home");
        } catch (error: any) {
            console.error("Error creating user:", error);
            showErrorAlert("Error changing password");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitCheckCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await authService.checkCodeFromEmail(email, code);
            if (result.compareCode) {
                localStorage.setItem('userId', result.userId);
                setCheckOrcreate(false);
            } else {
                showErrorAlert("code not matching");
            }
        } catch (error: any) {
            console.error("Error checking code:", error);
            showErrorAlert("code not matching");
        } finally {
            setLoading(false);
        }
    };


    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewPassword(value);
        if (value.length < 8) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCode(value);
    };

    return (
        <div>
            {checkOrcreate && <form className={styles.container} onSubmit={handleSubmitCheckCode}>
                <h2>{`email with code sent to ${email}`}</h2>
                <h1>Check Code</h1>
                <input type="text" className={styles.input} onChange={(e) => handleChangeCode(e)} />
                <button
                    disabled={loading}
                    type="submit"
                    className={styles.submitButton}
                >
                    {loading ? "Loading..." : "Check Code"}
                </button>
            </form>}
            {!checkOrcreate && <form className={styles.container} onSubmit={handleSubmitCreateNewPassword}>
                <h1>Create a New Password</h1>
                <input type="text" className={styles.input} onChange={(e) => handleChangePassword(e)} />
                {error && <h3>password need to have a leat 8 characters</h3>}
                <button
                    disabled={loading}
                    type="submit"
                    className={styles.submitButton}
                >
                    {loading ? "Loading..." : "Change Password"}
                </button>
            </form>}
        </div>
    )

};

export default CreateNewPassword;
