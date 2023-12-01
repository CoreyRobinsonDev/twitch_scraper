"use client"
import type { Message } from "@/util/types";
import { useEffect, useState } from "react";
import Chatbox from "@/components/Chatbox/Chatbox";
import styles from "./page.module.css";

export default function Home() {
    const streamer = "janifest";
    const [count, setCount] = useState(0);
    const [results, setResults] = useState<Message[]>([]);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        if (count > 10) return;
        const i = setInterval(() => {
            setCount(count+1);
            setPending(true);
            fetch(`http://localhost:3000/api/chat?streamer=${streamer}`)
                .then(res => res.json())
                .then(data => {
                    setPending(false);
                    setResults(result => [...result, ...data]);
                    console.log(data);
                })
                .catch(err => {
                    setPending(false);
                    setError(err)
                    console.error(err);
                })
        },6000)

        return () => clearInterval(i);
    }, [count])

    return <main className={styles.main}>
        <Chatbox 
            streamer={streamer}
            pending={pending} 
            messages={results} 
        />
        <b>{error}</b>
    </main>
}
