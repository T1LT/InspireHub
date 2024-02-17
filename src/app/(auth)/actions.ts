"use server";

import { redirect } from "next/navigation";
import z from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .transform((v) => v.trim().toLowerCase()),
  email: z.string().min(3).email("Not a valid email."),
  password: z
    .string()
    .min(8)
    .max(256)
    .transform((v) => v.trim()),
});

export type LoginActionData = {
  error?: {
    code: "AUTH_ERROR" | "INTERNAL_ERROR";
    message: string;
  };
};

export async function loginAction(
  _prevState: any,
  formData: FormData,
): Promise<LoginActionData | void> {
  const input = UserSchema.pick({ email: true, password: true }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!input.success) {
    return {
      error: {
        code: "AUTH_ERROR",
        message: "Check your credentials.",
      },
    };
  }

  try {
    // API call to backend here
  } catch (err) {
    // check if auth error or server error
  }

  // TODO: change this
  redirect("/user");
}

export type SignUpActionData = {
  error?:
    | {
        code: "INTERNAL_ERROR";
        message: string;
      }
    | {
        code: "AUTH_ERROR";
        message: string;
      }
    | {
        code: "VALIDATION_ERROR";
        fieldErrors: {
          [key: string]: string[];
        };
      };
};

export async function signUpAction(
  _prevState: any,
  formData: FormData,
): Promise<SignUpActionData | void> {
  const input = UserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      error: {
        code: "VALIDATION_ERROR",
        fieldErrors,
      },
    };
  }

  try {
    // API call to sign up the user
  } catch (err) {
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: "Server error. Please try again later.",
      },
    };
  }

  try {
    // API call to login the user
  } catch (err) {
    console.error("signIn error", err);
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: "Server error. Please try again later.",
      },
    };
  }

  redirect("/user");
}
