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
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>();
  axios.defaults.withCredentials = true;
  const onSubmit = async () => {
    try {
      const sendMail = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      alert(sendMail.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Wecome back</CardTitle>
        <CardDescription>Please enter your email!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@email.com"
                type="text"
                onChange={(e) =>
                  // @ts-ignore
                  setEmail(e.target.value)
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

export default ForgotPassword;
