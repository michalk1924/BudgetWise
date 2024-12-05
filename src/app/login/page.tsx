"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import authService from "@/services/auth";
import { googleSignup } from "../../services/signInWithGoogle";
import { useRouter } from "next/navigation";
import { showSuccessAlert, showErrorAlert } from "../../services/alerts";
import useUserStore from "../../store/userStore";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {

    const router = useRouter();
    const { setUser } = useUserStore();

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
            const user = await authService.login(data);
            setUser(user);
            await showSuccessAlert("You have logged in successfully!");
            router.push("/home");
        } catch (error: any) {
            console.error("Error creating user:", error);
            showErrorAlert("Could not login");
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

    const goToSignup = () => {
        router.push("/signup");
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                    <button className={styles.googleButton} onClick={loginWithGoogle}> Login with Google</button>
                </div>
                <div className={styles.movePage}>
                    <p>Don't have an account? Sign up <span className={styles.link} onClick={goToSignup}>here</span>.</p>
                </div>
            </div>
        </div>
    );
}
