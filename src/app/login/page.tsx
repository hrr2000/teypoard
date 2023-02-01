import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage () {
    return (
        <section>
            <header>
            </header>
            <main className="py-10 flex flex-col md:flex-row gap-10 justify-around">
                <LoginForm />
                <RegisterForm />
            </main>
        </section>
    )  
}