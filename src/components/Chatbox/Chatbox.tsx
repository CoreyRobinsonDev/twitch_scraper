import styles from "./Chatbox.module.css";
import type { Message } from "@/util/types";
import Chat from "../Chat/Chat";

export default function Chatbox(
    {messages, pending, streamer}: 
    {messages: Message[], pending: boolean, streamer: string}) {
    return <section className={styles.section}>
        <h1 className={styles.streamer}>{streamer} 
            {!pending
                ? <span>
                    <div className={styles.hault} style={{left: `calc(calc(30.8vw + ${streamer.length}ch) - 3.2rem)`}}></div>
                    <div className={styles.hault} style={{left: `calc(calc(30.8vw + ${streamer.length}ch) - 1.6rem)`}}></div>
                    <div className={styles.hault} style={{left: `calc(calc(30.8vw + ${streamer.length}ch))`}}></div>
                </span>
                : <div className={styles.loading} style={{left: `calc(calc(30.8vw + ${streamer.length}ch) - 1.6rem)`}}></div>

            }
        </h1>
        <div className={styles.chat_container}>
            {messages.map((message, idx) => <Chat 
                key={`${message.chatter}-${idx}`} 
                chatter={message.chatter}
                message={message.message}
                />)
            }
        </div>
    </section>
}
