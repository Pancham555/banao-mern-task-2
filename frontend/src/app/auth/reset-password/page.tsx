"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const [newPassword, setNewPassword] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = async () => {
    console.log(searchParams, "SearchParams");
    const params = new URLSearchParams(searchParams);
    try {
      const sendMail = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          `/api/auth/forgot-password/reset-password/${params.get("token")}`,
        {
          newPassword,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      alert(sendMail.data?.message);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Wecome back</CardTitle>
        <CardDescription>Set your new password! </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                onChange={(e) =>
                  // @ts-ignore
                  setNewPassword(e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </>
  );
};

export default ResetPassword;
