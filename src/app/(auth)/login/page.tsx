"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { LoginActionData, loginAction } from "../actions";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginPage />
    </div>
  );
}

export function LoginPage() {
  return (
    <main className="max-w-sm p-8 border rounded-md shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-neutral-800">Login</h1>
      <LoginForm />
      <div className="mt-3">
        <span className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </span>
      </div>
    </main>
  );
}

function LoginForm() {
  const [state, formAction] = useFormState(loginAction, {});

  return (
    <form action={formAction} className="space-y-3">
      <LoginFormFields {...state} />
    </form>
  );
}

function LoginFormFields({ error }: LoginActionData) {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  // focus on the input only if there is an error,
  // and there wasn't an error before
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      //  only select if the input is not already focused
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.select();
      }
    }
  }, [error]);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="block text-neutral-700 mb-1" htmlFor="email">
          Email
        </label>
        <Input
          className="w-full text-base"
          autoFocus
          ref={inputRef}
          autoCapitalize="off"
          id="email"
          type="text"
          name="email"
          disabled={pending}
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2 relative">
        <label className="block text-neutral-700 mb-1" htmlFor="password">
          Password
        </label>
        <Input
          className="w-full text-base pr-8"
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          disabled={pending}
          autoComplete="current-password"
          required
        />
        {showPassword ? (
          <EyeOff
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-neutral-700 h-5 w-5 absolute right-2 top-[2.125rem] cursor-pointer"
            aria-label="hide password"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-neutral-700 h-5 w-5 absolute right-2 top-[2.125rem] cursor-pointer"
            aria-label="show password"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 items-start">
        <Button className="p-0 h-8 px-4" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        {error && !pending && (
          <span className="text-red-500 text-sm"> {error.message}</span>
        )}
      </div>
    </div>
  );
}
