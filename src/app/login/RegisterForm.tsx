'use client'
import SubmitButton from "@/components/common/buttons/SubmitButton";
import InputGroup from "@/components/common/forms/InputGroup";
import { Formik } from "formik";
import useLoginForm from "./hooks/useLoginForm";

export default function RegisterForm() {
  const { submitForm, initialValues } = useLoginForm();

  return (
    <Formik onSubmit={submitForm} initialValues={initialValues}>
      <form method="POST" className="flex flex-col gap-5 w-full lg:w-1/3">
        <h2 className="font-black text-gray-400">Register</h2>
        <InputGroup>
          <label htmlFor="input_username">Username: </label>
          <input type="text" name="username" id="register-username" placeholder="ex: unsalek" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="input_username">Email: </label>
          <input type="text" name="email" id="register-email" placeholder="ex: example@domain.com" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="input_username">Password: </label>
          <input type="password" name="paswword" id="register-password" placeholder="••••••••••••" />
        </InputGroup>
        <InputGroup>
          <label htmlFor="input_username">Confirm Password: </label>
          <input type="password" name="confirm_password" id="register-confirm_password" placeholder="••••••••••••" />
        </InputGroup>
        <SubmitButton text={'Register'} />
      </form>
    </Formik>
  )
}