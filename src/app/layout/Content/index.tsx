import { ReactNode } from "react";

export default function Content ({children}: {children: ReactNode}) {
    return (
        <div className="content text-lg w-full lg:10/12 xl:w-8/12 my-10 m-auto bg-primary p-10 rounded-2xl">
            {children}
        </div>
    )
}