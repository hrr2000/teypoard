import { useEffect, useState } from "react"
import { letterStates } from "../utils/constants";

export default function useWord ({word, buffer, isActive, isPassed}: {word: string; buffer: string; isActive: boolean, isPassed: boolean}) {

    const [content, setContent] = useState<string>((isActive || isPassed) && buffer.length > word.length ? buffer : word);

    const compareLetters = (letterIndex: number) => {   
        if(letterIndex > word.length) return letterStates.EXTRA;
        if(letterIndex >= buffer.length) return letterStates.IDLE;
        if(word[letterIndex] === buffer[letterIndex]) return letterStates.CORRECT;
        return letterStates.WRONG;
    }
    useEffect(() => {
        if(isActive && !isPassed) {
            if(!buffer.length) setContent(word);
            if(buffer.length >= word.length) {
                setContent(buffer)
            }
        }
    }, [buffer])

    return {
        content, isPassed, setContent, compareLetters
    }
}