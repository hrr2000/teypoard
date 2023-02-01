import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href="/login" className="flex items-center gap-3 font-black min-w-[250px]">
            <span className="block w-5 h-5 border-2 rounded-full border-pink-600"></span>
            <span>Login</span>
            <span>/</span>
            <span>Reigster</span>
        </Link>
    )
}