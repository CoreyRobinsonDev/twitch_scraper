
export default function(chat: string): { raw: string[], messages: {raw: string[], formatted: Object[]}} {
    const lines = formatLines(chat);
    const messages = formatMessages(lines);

    return {raw: lines, messages} 
}

function formatLines(chat: string) {
    const lines: string[] = [];
    const arr = chat.split("");
    let line = "";
    let fillTag = false;
    let fillMsg = false;

    for (let i = 0; i < arr.length; i++) {
        const ch = arr[i];
        if (ch === "<") {
            fillTag = true;
            if (fillMsg) {
                fillMsg = false;
                lines.push(line);
                line = "";
            }
        } else if (ch === ">") {
            fillTag = false;
            line += ch;
            lines.push(line);
            line = "";
            if (arr[i+1] !== "<") fillMsg = true;
            continue;
        }

        if (fillTag || fillMsg) {
            line += ch;
        } else {
            lines.push(line);
            line = "";
        }
    }
    return lines;
}

function formatMessages(lines: string[]) {
    const messageArr = lines.filter((line) => {
            const linearr = line.split("");
            let keep = false;
            for (let i = 0; i < linearr.length; i++) {
                if (linearr[i] === ">" || linearr[i] === "<") break;
                if(i === linearr.length - 1) keep = true;
            }
            return keep;
        });

    let formatted: Object[] = [];
    for (let i = 1; i < messageArr.length; i++) {
        if (messageArr[i+1] === undefined) break;
        if (messageArr[i] === ": ") {
            formatted.push({
                chatter: messageArr[i-1],
                message: messageArr[i+1]
            })
        }
    }

    return {raw: messageArr, formatted };
}
