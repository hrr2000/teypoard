import { MouseEvent as MouseEventReact, useEffect, useState } from "react"
import useStatementGenerator from "./useStatementGenerator";


export default function useTyper() {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [buffer, setBuffer] = useState<string>('');
    const [bufferHistory, setBufferHistory] = useState<string[]>([]);
    const [caretPosition, setCaretPosition] = useState<{top: string; left: string}>({top: '0px', left: '0px'});
    const [displayCaret, setDisplayCaret] = useState<boolean>(false);
    const [statement, setStatement] = useState<string[]>([]);
    const [testsCount, setTestsCount] = useState<number>(0); 

    const {generateStatement} = useStatementGenerator();

    const focusAction = (state: boolean) => (e: MouseEventReact | MouseEvent | null) => {
        e?.stopPropagation();
        if(typeof document !== "undefined") 
            document.querySelector('body')?.setAttribute('data-active', state ? 'true' : 'false')  
        return setIsActive(state);
    }

    useEffect(() => {
        // @ts-ignore
        document.querySelector("#hdn-in").focus();
        setStatement(generateStatement({type: 'dictionary', limit: 30}));
        setBuffer('');
        setBufferHistory([]);
        setActiveIndex(0);
        window.focus();
    }, [testsCount])

    useEffect(() => {
        if(!isActive) {
            setDisplayCaret(false);
            return;
        }
        setTimeout(() => {
            setDisplayCaret(true);
        }, 100);
    }, [isActive])

    // flag that guarentees that events are set once
    let isEventsSet = false;

    useEffect(() => {
        if(!isEventsSet) {
            // mark as true so the events are set once
            isEventsSet = true;

            // blurring the typer box
            window.addEventListener("click", focusAction(false))
            window.addEventListener("resize", () => focusAction(false)(null))

            // handling keyboard inputs
            window.addEventListener("keydown", async (e) => {
                if(!e.key || !e.code) return;
                e.stopPropagation();

                // defingin the variables storing the states "beacuse I can't access the states after setting the event"
                let currentBuffer = '', 
                    wordIdx = 0,
                    isActive = (typeof document !== "undefined") && document.querySelector('body')?.getAttribute('data-active') === 'true', 
                    bufferHistory: string[] = [];

                // storing the states values inside variables 
                await setBuffer(buffer => currentBuffer = buffer);
                await setActiveIndex(idx => wordIdx = idx);
                await setBufferHistory(h => bufferHistory = h);

                // if clicekd backspace or ctrl + backspace
                if(e.code === 'Backspace') {
                    // clear the full word
                    if(e.ctrlKey) setBuffer('');

                    // delete the last character
                    if(currentBuffer.length) setBuffer(buffer => currentBuffer = buffer.slice(0, -1).trim())

                    // if free buffer go back to the last word
                    if(bufferHistory.length && !currentBuffer.length) {
                        await setActiveIndex(idx => idx - 1)
                        await setBuffer(bufferHistory?.slice(-1)?.[0] || '');
                        await setBufferHistory(h => h.slice(0, -1));
                    }
                }

                // if letter add it
                if(e.key != ' ' && e.key.length === 1) {
                    if(!isActive) return focusAction(true)(null);  
                    setBuffer((buffer) => {
                        return buffer + e.key
                    });
                }
                
                // if clicked space
                if(e.key === ' ') {
                    await setBufferHistory(list => [...list, currentBuffer || '']);
                    await setBuffer('');
                    await setActiveIndex(idx => idx + 1)
                }
            })
        }
    }, [typeof window !== "undefined"])

    return {
        isActive, 
        activeIndex,
        buffer,
        bufferHistory,
        caretPosition,
        displayCaret,
        statement,
        testsCount,
        setTestsCount,
        setStatement,
        setBuffer,
        setIsActive,
        focusAction,
        setActiveIndex,
        setCaretPosition
    }
}