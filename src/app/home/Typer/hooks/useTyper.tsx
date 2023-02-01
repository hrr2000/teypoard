import { MouseEvent as MouseEventReact, useEffect, useState } from "react"

let isEventsSet = false;

export default function useTyper() {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [buffer, setBuffer] = useState<string>('');
    const [bufferHistory, setBufferHistory] = useState<string[]>([]);
    const [caretPosition, setCaretPosition] = useState<{top: string; left: string}>({top: '0px', left: '0px'});
    const [displayCaret, setDisplayCaret] = useState<boolean>(false);

    const focusAction = (state: boolean) => (e: MouseEventReact | MouseEvent | null) => {
        e?.stopPropagation();
        if(typeof document !== "undefined") document.querySelector('body')?.setAttribute('data-active', state ? 'true' : 'false')  
        return setIsActive(state);
    }

    useEffect(() => {
        setTimeout(() => {
            setDisplayCaret(true);
        }, 500);
    }, [])


    useEffect(() => {
        if(!isEventsSet) {
            isEventsSet = true;
            window.addEventListener("click", focusAction(false))
            window.addEventListener("keydown", (e) => {
                if(!e.key || !e.code) return;
                e.stopPropagation();
                let currentBuffer = '', 
                    wordIdx = 0,
                    isActive = (typeof document !== "undefined") && document.querySelector('body')?.getAttribute('data-active') === 'true', 
                    bufferHistory: string[] = [];
                setBuffer(buffer => currentBuffer = buffer);
                setActiveIndex(idx => wordIdx = idx);
                setBufferHistory(h => bufferHistory = h);

                // if clicekd backspace or ctrl + backspace
                if(e.code === 'Backspace') {
                    if(wordIdx > 0 && !currentBuffer.length) {
                        setBuffer(bufferHistory?.[wordIdx - 1] || '');
                        setBufferHistory(h => h.slice(0, -1));
                        setActiveIndex(idx => idx - 1); 
                    }
                    if(e.ctrlKey) {
                        return setBuffer('');
                    }
                    return setBuffer(buffer => buffer.slice(0, -1))
                }

                // if letter add it
                if(e.key != ' ' && e.key.length === 1) {
                    if(!isActive) return focusAction(true)(null);  
                    setBuffer((buffer) => buffer + e.key);
                }
                
                // if clicked space
                if(e.key === ' ') {
                    setBufferHistory(list => [...list, currentBuffer || '']);
                    setBuffer('');
                    setActiveIndex(idx => idx + 1)
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
        setBuffer,
        setIsActive,
        focusAction,
        setActiveIndex,
        setCaretPosition
    }
}