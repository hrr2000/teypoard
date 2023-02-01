import { ReactNode } from "react";

export default function InputGroup({children}: {children: ReactNode}) {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    )
}