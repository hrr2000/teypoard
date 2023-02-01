'use client'
import SubmitButton from "@/components/common/buttons/SubmitButton";
import InputGroup from "@/components/common/forms/InputGroup";
import { Formik } from "formik";
import useLoginForm from "./hooks/useLoginForm";

export default function LoingForm() {
    const {submitForm, initialValues} = useLoginForm();

    return (
        <Formik onSubmit={submitForm} initialValues={initialValues}>
            <form method="POST" className="flex flex-col gap-5 w-full lg:w-1/3">
                <h2 className="font-black text-gray-400">Login</h2>
                <InputGroup>
                    <label htmlFor="input_username">Username: </label>
                    <input type="text" name="username" id="login-username" placeholder="ex: unsalek" />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="input_username">Password: </label>
                    <input type="password" name="username" id="login-password" placeholder="••••••••••••" />
                </InputGroup>
                <SubmitButton text={'Login'} />
            </form>
        </Formik>
    )
}