"use client"
import type { Message } from "@/util/types";

import { useState } from "react";

import styles from "./Chat.module.css";
import randomColor from "@/util/functions/randomColor";

export default function Chat({chatter, message}: Message) {
    const [color] = useState(randomColor());

    return <p className={styles.line}>
        <span className={styles.chatter} style={{color}}>{chatter}</span>
        <span>: </span>
        <span className={styles.message}>{message}</span>
    </p>
}
