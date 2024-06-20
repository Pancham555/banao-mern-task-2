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
// import useRegister from "../../../../hooks/useRegister";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserInputs {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [inputs, setInputs] = useState<UserInputs>();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const onSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:5000/api/auth/register", {
        username: inputs?.username,
        email: inputs?.email,
        password: inputs?.password,
      });

      alert(data.data?.message);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create an account!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                type="text"
                onChange={(e) =>
                  // @ts-ignore
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@email.com"
                type="email"
                onChange={(e) =>
                  // @ts-ignore
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="******"
                type="password"
                onChange={(e) =>
                  // @ts-ignore
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div className="flex gap-1">
              <span>Already have an account!</span>
              <Link
                className="inline cursor-pointer text-blue-500 hover:underline"
                href="/auth/login"
              >
                Login
              </Link>
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

export default Register;
