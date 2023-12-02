
export default function randomColor(): string {
    const c1 = Math.floor(Math.random() * 255);
    const c2 = Math.floor(Math.random() * 255);
    const c3 = Math.floor(Math.random() * 255);

    return `rgba(${c1}, ${c2}, ${c3})`
}
