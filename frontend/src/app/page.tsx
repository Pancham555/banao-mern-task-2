"use client";
import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  axios.defaults.withCredentials = true;
  const router = useRouter();
  const [posts, setPosts] = useState<object[]>();

  const getPosts = async () => {
    axios.defaults.withCredentials = true;
    try {
      const getData = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/posts"
      );

      setPosts(getData.data?.posts);
    } catch (error) {
      // @ts-ignore
      if (error.response.status === 401) {
        return router.push("/auth/login");
      }
      console.log(error);
    }
  };
  // const checkLogin = async () => {
  //   axios.defaults.withCredentials = true;
  //   try {
  //     const check = await axios.get("http://localhost:5000/api/check-auth");
  //     console.log("check auth", check.data);

  //     if (!check.data.authorized) {
  //       return setLoginStatus(false);
  //     }

  //     setLoginStatus(true);
  //     // setAuthData(check.data.authorized);
  //   } catch (error) {
  //     console.log("check auth", error);
  //   }
  // };

  const Logout = async () => {
    axios.defaults.withCredentials = true;
    try {
      const log_out = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/logout"
      );

      alert(log_out.data.message);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="flex p-5 flex-col gap-5">
      <div className="my-2 flex gap-5 justify-between">
        <Link href="/post">
          <Button>Create Your own post</Button>
        </Link>
        <Button variant="destructive" onClick={Logout}>
          Logout
        </Button>
      </div>
      {posts?.map((data, index) => {
        // @ts-ignore
        return <Post key={index} {...data} />;
      })}
    </main>
  );
}
