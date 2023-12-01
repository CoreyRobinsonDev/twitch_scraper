"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [count, setCount] = useState(0);
    const [results, setResults] = useState<Object[]>([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        setPending(true);
        fetch("http://localhost:3000/api/chat")
            .then(res => res.json())
            .then(data => {
                setPending(false);
                setResults(result => [...result, data]);
                console.log(data);
            })
            .catch(err => {
                setPending(false);
                setError(err)
                console.error(err);
            })
        const i = setInterval(() => {
            setCount(count+1);
        },10000)

        return () => clearInterval(i);
    }, [])
    return <main>
        <h1>{count}</h1>
        <p>{pending ? "Fetching chat..." : JSON.stringify(results)}</p>
        <b>{error}</b>
    </main>
}
