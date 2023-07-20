import Link from "next/link";

export default function PlayButton() {
  return (
    <div>
      <Link href="/" className={`bg-pink-800 p-2 rounded-lg text-xl px-5`}>
        Play
      </Link>
    </div>
  )
}