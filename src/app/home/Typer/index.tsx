'use client'
import { GRK } from "@/utils/functions";
import useStatementGenerator from "./hooks/useStatementGenerator";
import useTyper from "./hooks/useTyper";
import Word from "./Word";

// const statement = "Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features Hello Guys, I am trying to build a new typing racing website that contains all the needed features";

export default function Typer() {
    const {
        isActive, 
        activeIndex, 
        focusAction, 
        buffer, 
        bufferHistory, 
        caretPosition, 
        handleLetterCaretChange, 
        displayCaret,
        statement,
        setTestsCount,
        testsCount
    } = useTyper();

    return testsCount > -1 ? (
        <div id="typer" data-id={GRK('typer')} className="w-full flex flex-wrap overflow-auto text-3xl relative my-28" onClick={focusAction(true)}>
            {displayCaret && isActive && (
                <span id="typer-caret" 
                      className={`w-[3px] h-8 rounded-lg duration-100 bg-pink-500 block absolute`} style={{
                        top: caretPosition.top,
                        left: caretPosition.left
                      }}></span>
            )}
            {/* {isActive && (<h3 className="text-pink-600 py-5 text-center">Active</h3>)} */}
            {statement.map((word, idx) => {
                if(activeIndex > idx) {
                    return <Word 
                                setCaretPosition={handleLetterCaretChange} 
                                key={'word' + word + idx} 
                                isActive={false} 
                                isPassed={true} 
                                word={word} 
                                buffer={bufferHistory?.[idx]} />
                }
                return (<Word 
                            setCaretPosition={handleLetterCaretChange} 
                            key={'word' + word + idx} 
                            isActive={idx === activeIndex} 
                            isPassed={activeIndex > idx} 
                            word={word} 
                            buffer={activeIndex === idx ? buffer : ''} />)
            })}
            <div className="w-full text-center my-14">
                <input type="text" id="hdn-in" className="w-0 p-0 outline-0 focus:outline-0" style={{boxShadow: 'none !important', border: 'none !important'}}/>
                <button onClick={(e) => setTestsCount(cnt => cnt + 1)} className="px-5 py-2 bg-secondary rounded-lg duration-200 hover:bg-gray-300 focus:bg-gray-300 outline-0 m-auto">Next</button>
            </div>
        </div>
    ) : <></>
}