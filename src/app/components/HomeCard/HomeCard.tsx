import React from "react";
import { IconType } from "react-icons";
import styles from "./HomeCard.module.css";

type CardProps = {
    title: string;
    amount: number;
    hoverColor: string;
};

export default function HomeCard({ title, amount, hoverColor }: CardProps) {
    return (
        <div
            className={styles.card}
            style={{ color: hoverColor, boxShadow: `0px 4px 6px ${hoverColor}` }}
        >
            <h2>{title}</h2>
            <p className={styles.text}>${amount.toFixed(2)}</p>
        </div>
    );
}
