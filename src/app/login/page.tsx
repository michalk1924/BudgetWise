"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "../styles/auth.module.css";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        reset();
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
                    <button className={styles.googleButton}>Login with Google</button>
                </div>
            </div>
        </div>
    );
}
