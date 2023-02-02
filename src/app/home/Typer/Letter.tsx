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

function Letter({id, value, state, setCaretPosition, isActive}: {id:string, value?: string; state: string | undefined; setCaretPosition: Function, isActive: boolean}) {
    // if(!value) return <></>

    useEffect(() => {
        if(isActive && typeof document !== 'undefined') {
            const offset = getOffset(document.querySelector(`#${id}`));
            setCaretPosition(offset)
        }
    }, [])

    return (
        <span id={id} style={{color: state || undefined}}>
            {value}
        </span>
    )
}

export default memo(Letter);