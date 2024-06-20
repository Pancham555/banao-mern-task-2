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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface UserInputs {
  email_or_username: string;
  password: string;
}
const Login = () => {
  const [inputs, setInputs] = useState<UserInputs>();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const onSubmit = async () => {
    try {
      // http://localhost:5000
      const data = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email_or_username: inputs?.email_or_username,
          password: inputs?.password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          // withCredentials: ,
        }
      );
      console.log(data.data);

      alert(data.data?.message);
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Wecome back</CardTitle>
        <CardDescription>Login into your account!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email_or_username">Email or username</Label>
              <Input
                id="email_or_username"
                placeholder="johndoe@email.com | johndoe"
                type="text"
                onChange={(e) =>
                  // @ts-ignore
                  setInputs({ ...inputs, email_or_username: e.target.value })
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
            <div className="flex flex-col space-y-1.5">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
            <div className="flex gap-1">
              <span>No account!</span>
              <Link
                className="inline cursor-pointer text-blue-500 hover:underline"
                href="/auth/register"
              >
                Register
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

export default Login;
