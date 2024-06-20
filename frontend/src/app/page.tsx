"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface authorizedUserProps {
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const [loginStatus, setLoginStatus] = useState<boolean>();
  const [authData, setAuthData] = useState<authorizedUserProps>();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const checkLogin = async () => {
    axios.defaults.withCredentials = true;
    try {
      const check = await axios.get("http://localhost:5000/api/check-auth");
      console.log("check auth", check.data);

      if (!check.data.authorized) {
        return setLoginStatus(false);
      }

      setLoginStatus(true);
      setAuthData(check.data.authorized);
    } catch (error) {
      console.log("check auth", error);
    }
  };

  const Logout = async () => {
    axios.defaults.withCredentials = true;
    try {
      const log_out = await axios.post("http://localhost:5000/api/auth/logout");

      alert(log_out.data.message);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <main className="w-full min-h-screen h-full flex justify-center flex-col items-center">
      <h1>
        {loginStatus ? `Logged in as ${authData?.username}` : "Not logged in!"}
      </h1>
      {!loginStatus && (
        <>
          <Link href={"/auth/login"}>Login here</Link>
        </>
      )}

      {loginStatus && (
        <div className="flex justify-center my-6">
          <Button variant="destructive" onClick={Logout}>
            Logout
          </Button>
        </div>
      )}
    </main>
  );
}
