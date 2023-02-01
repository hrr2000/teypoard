'use client'
import { GRK } from "@/utils/functions";
import useTyper from "./hooks/useTyper";
import Word from "./Word";

const statement = "Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features";

export default function Typer() {
    const {
        isActive, 
        activeIndex, 
        focusAction, 
        buffer, 
        bufferHistory, 
        caretPosition, 
        setCaretPosition, 
        displayCaret
    } = useTyper();

    return (
        <div className="w-full break-words text-3xl relative overflow-hidden" onClick={focusAction(true)}>
            {displayCaret && (
                <span   id="typer-caret" 
                        className={`w-[2px] h-8 rounded-lg duration-100 bg-pink-500 block fixed`} style={{
                    top: caretPosition.top,
                    left: caretPosition.left
                }}></span>
            )}
            {isActive && (<h3 className="text-pink-600 py-5 text-center">Active</h3>)}
            {statement.split(' ').map((word, idx) => {
                if(activeIndex > idx) {
                    return <Word 
                                caretPosition={caretPosition} 
                                setCaretPosition={setCaretPosition} 
                                key={GRK('word')} 
                                isActive={false} 
                                isPassed={true} 
                                word={word} 
                                buffer={bufferHistory?.[idx]} />
                }
                return (<Word 
                            caretPosition={caretPosition} 
                            setCaretPosition={setCaretPosition} 
                            key={GRK('word')} 
                            isActive={idx === activeIndex} 
                            isPassed={activeIndex > idx} 
                            word={word} 
                            buffer={activeIndex > idx ? bufferHistory?.[idx] : buffer} />)
            })}
        </div>
    )
}