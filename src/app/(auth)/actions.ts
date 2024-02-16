"use server";

import { redirect } from "next/navigation";
import z from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .transform((v) => v.trim().toLowerCase()),
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
  const input = UserSchema.safeParse({
    username: formData.get("username"),
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
