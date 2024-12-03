"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import authService from "@/services/auth";
import { googleSignup } from "../../services/signInWithGoogle";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert } from "../../services/alerts";

type FormFields = z.infer<typeof schema>;

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export default function Home() {

    const router = useRouter();

    const goToLogin = () => {
        router.push("/login");
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await authService.signup(data);
            await showSuccessAlert("You Signed up successfully");
            router.push("/home");
        } catch (error: any) {
            console.error("Error creating user:", error);
            showErrorAlert("Error creating user");
        }
        finally {
            reset();
        }
    };

    const loginWithGoogle = async () => {
        try {
            await googleSignup();
            await showSuccessAlert("You have logged in successfully!");
            router.push("/home");
        }
        catch (error: any) {
            console.error("Error signing up with Google:", error);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Create Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                    />
                    {errors.name && (
                        <div className={styles.error}>{errors.name.message}</div>
                    )}
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                    />
                    {errors.email && (
                        <div className={styles.error}>{errors.email.message}</div>
                    )}
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />
                    {errors.password && (
                        <div className={styles.error}>{errors.password.message}</div>
                    )}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className={styles.submitButton}
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                </form>
                <div className={styles.googleButtonContainer}>
                    <button className={styles.googleButton} onClick={loginWithGoogle}>Signup with Google </button>
                </div>
                <div className={styles.movePage}>
                    <p>Already have an account? <span onClick={goToLogin}>Login</span></p>
                </div>
            </div>
        </div>
    );
}
