import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/login" className="flex text-lg items-center gap-3 font-normal px-2">
      <span className="block w-5 h-5 border-2 rounded-full border-pink-600 text-gl"></span>
      <span>Account</span>
    </Link>
  )
}