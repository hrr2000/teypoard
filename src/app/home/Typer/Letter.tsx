import { memo, useEffect } from "react";

function getOffset(el: any) {
  const rect = el?.getClientRects()[0];
  const parent = document?.querySelector('#typer')?.getClientRects()[0];
  return {
    left: rect?.left + window.scrollX - (parent?.left || 0),
    top: rect?.top + window.scrollY - (parent?.top || 0)
  };
}

function Letter({
  id,
  value,
  state,
  setCaretPosition,
  isActive
}: {
  id: string;
  value?: string;
  state: string | undefined;
  setCaretPosition: Function;
  isActive: boolean;
}) {
  useEffect(() => {
    if (isActive && typeof document !== 'undefined') {
      const offset = getOffset(document.querySelector(`#${id}`));
      setCaretPosition(offset)
    }
  }, [])

  return (
    <span id={id} style={{ color: state || undefined }}>
      {value}
    </span>
  )
}

export default memo(Letter);