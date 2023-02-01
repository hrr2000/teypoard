export default function SubmitButton({text}: {text: string}) {
    return (
        <button type="submit" className="bg-red w-full border-[1px] rounded-lg p-1.5 border-gray-400 text-gray-400 hover:border-pink-500 hover:text-pink-500 duration-300 focus:text-pink-500 focus:outline-pink-500 focus:border-pink-500 active:text-primary active:border-primary focus:outline-0">
            {text}
        </button>
    )
}