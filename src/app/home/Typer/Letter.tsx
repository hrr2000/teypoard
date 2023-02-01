import { GRK } from "@/utils/functions";
import { memo, useEffect, useMemo } from "react";

function getOffset(el: any) {
    const rect = el?.getBoundingClientRect();
    const parent = document?.querySelector('#typer')?.getBoundingClientRect();
    return {
      left: rect?.left + window.scrollX - (parent?.left || 0),
      top: rect?.top + window.scrollY - (parent?.top || 0)
    };
  }

function Letter({id, value, state, setCaretPosition, isActive, caretPosition}: {id:string, value?: string; state: string | undefined; setCaretPosition: Function, isActive: boolean, caretPosition: any}) {
    // if(!value) return <></>

    useEffect(() => {
        if(isActive && typeof document !== 'undefined') {
            const offset = getOffset(document.querySelector(`#${id}`));
            if (`${offset.left}px` === caretPosition.left) return;
            setCaretPosition?.({
                left: `${offset.left}px`,
                top: `${offset.top}px`
            })
        }
    }, [])

    return (
        <span id={id} style={{color: state || undefined}}>
            {value}
        </span>
    )
}

export default memo(Letter);