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
  const [deleteId, setDeleteId] = useState<string>();

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

  const deletePost = async () => {
    try {
      const delete_post = await axios.patch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/posts",
        {
          _id: deleteId,
        }
      );

      if (delete_post.status === 200) {
        alert("Post has been deleted");
        setDeleteId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [posts, deleteId]);

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
        return (
          <Post
            key={index}
            // @ts-ignore
            _id={data._id}
            // @ts-ignore
            username={data.username}
            // @ts-ignore
            comments={data.comments}
            // @ts-ignore
            likedby={data.likedby}
            // @ts-ignore
            likes={data.likes}
            // @ts-ignore
            post={data.post}
            setDeleteId={setDeleteId}
            // {...data}
            deletePost={(e: string) => {
              return deletePost();
            }}
          />
        );
      })}
    </main>
  );
}
