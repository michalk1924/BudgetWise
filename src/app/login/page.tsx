"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "../styles/auth.module.css";
import authService from "@/services/auth";
import { googleSignup } from "../../services/signInWithGoogle";
import { useRouter } from "next/navigation";
import {
  showSuccessAlert,
  showErrorAlert,
  showInfoAlert,
} from "../../services/alerts";
import useUserStore from "../../store/userStore";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const user = await authService.login(data);
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

  const loginWithGoogle = async () => {
    try {
      const user = await googleSignup();
      if (user) {
        setUser(user);
        await showSuccessAlert("Welcome", "You have logged in successfully!", 1000);
        router.push("/home");
      } else {
        await showErrorAlert("Failed to login with Google.");
      }
    }
    catch (error: any) {
      console.error("Error signing up with Google:", error);
      await showErrorAlert("Failed to login with Google.");
    }
  };

  const goToSignup = () => {
    router.push("/signup");
  };

  const handleForgotPassword = async () => {
    if (errors.email) {
      await showErrorAlert("Please provide a valid email.");
      return;
    }
    try {
      const email = getValues("email");
      localStorage.setItem("emailToSendCode", email);
      showInfoAlert("we sent a password reset email to your account");
      const result = await authService.forgotPassword(email);
      if (result) {
        router.push("/forgotpassword");
      } else {
        showErrorAlert("Could not send password reset code.");
      }
    } catch (error: any) {
      console.error("Error sending password reset code:", error);
      showErrorAlert("Could not send password reset code.");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
      <Image src="/logo.png" alt="Logo" width={190} height={55} />
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.emailContainer}>

            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className={styles.input}
            />
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.inputWrapper}>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                ></i>
              </button>
            </div>
          </div>
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

        <div className={styles.forgotPassword}>
          <p onClick={handleForgotPassword}>Forgot Password?</p>
        </div>

        <div className={styles.googleButtonContainer}>
          <button className={styles.googleButton} onClick={loginWithGoogle}>
            {" "}
            Login with Google
          </button>
        </div>

        <div className={styles.movePage}>
          <p onClick={goToSignup}>
            Don't have an account? Sign up{" "}
            <span className={styles.link}>here</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

