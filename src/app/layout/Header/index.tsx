import LoginButton from "./LoginButton";
import Logo from "./Logo";
import PlayButton from "./PlayButton";
import UserInformation from "./UserInformation";

export default function Header() {
  return (
    <header>
      <div className="container text-gray-200 flex justify-between items-center w-full m-auto py-10">
        <div className={`flex items-center gap-2`}>
          <PlayButton />
          <Logo />
        </div>
          {false ? <UserInformation /> : <LoginButton />}
        {/* <ThemeOptions /> */}
      </div>
    </header>
  )
}