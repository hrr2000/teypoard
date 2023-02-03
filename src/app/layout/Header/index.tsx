import LoginButton from "./LoginButton";
import Logo from "./Logo";
import ThemeOptions from "./ThemeOptions";
import UserInformation from "./UserInformation";

export default function Header() {
  return (
    <header>
      <div className="container flex justify-between w-full m-auto py-5 px-10">
        {false ? <UserInformation /> : <LoginButton />}
        <Logo />
        <ThemeOptions />
      </div>
    </header>
  )
}