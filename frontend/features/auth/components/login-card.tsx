"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type FormData = z.infer<typeof loginSchema>;

export function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isError, isPending, reset } = useLogin();
  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle variant="center">Login</CardTitle>
        <CardDescription variant="center">
          Enter your username below <br />
          to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onFocus={reset}
                {...register("username")}
                placeholder="Enter your username"
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onFocus={reset}
                {...register("password")}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          {isError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Invalid credentials</AlertDescription>
            </Alert>
          )}
          <CardFooter className="mt-4 flex justify-between px-0">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
