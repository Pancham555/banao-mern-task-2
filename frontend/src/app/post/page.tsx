"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

const Post = () => {
  axios.defaults.withCredentials = true;
  const [post, setPost] = useState<string>();
  const onSend = async () => {
    try {
      const sendPost = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/posts",
        {
          post,
        }
      );

      if (sendPost.status === 200) {
        alert("Post created!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-3xl w-full font-bold">Write a post!</h1>
      <div className="mt-2 flex justify-between gap-2 items-center w-full">
        <Input
          type="text"
          placeholder="Write a post!"
          onChange={(e) => setPost(e.target.value)}
        />
        <Button variant="outline" onClick={onSend}>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default Post;
