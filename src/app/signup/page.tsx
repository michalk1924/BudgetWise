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
import Image from "next/image";
import { EXAMPLE_USER } from "@/consts/consts";

type FormFields = z.infer<typeof schema>;

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export default function Home() {

    const router = useRouter();
    const { setUser } = useUserStore();

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
            const user = await authService.signup(data);
            setUser(user);
            await showSuccessAlert("Welcome!", "You Signed up successfully", 1000);
            router.push("/userDetailsForm");
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
            const { user, isNewUser } = await googleSignup();
            if (user) {
                setUser(user);
                await showSuccessAlert("Welcome", "You have logged in successfully!", 1000);
                if (isNewUser) {
                    router.push("/userDetailsForm");
                } else {
                    router.push("/home");
                }
            } else {
                await showErrorAlert("Failed to login with Google.");
            }
        }
        catch (error: any) {
            console.error("Error signing up with Google:", error);
            await showErrorAlert("Failed to login with Google.");
        }
    };

    const loginWithExampleUser = async () => {
        try {
            const user = await authService.login(EXAMPLE_USER);
            setUser(user);
            await showSuccessAlert("Welcome!", "You have logged in successfully!", 1000);
            router.push("/home");
        } catch (error: any) {
            console.error("Error creating user:", error);
            showErrorAlert("Could not login");
        } finally {
            reset();
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <Image src="/logo.png" alt="Logo" width={190} height={55} />
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

                <button className={styles.exampleUserButton} onClick={loginWithExampleUser}>exmaple user</button>

                <div className={styles.googleButtonContainer}>
                    <button className={styles.googleButton} onClick={loginWithGoogle}>Signup with Google </button>
                </div>

                <div className={styles.movePage}>
                    <p onClick={goToLogin}>Already have an account? <span >Login</span></p>
                </div>
            </div>
        </div>
    );
}
