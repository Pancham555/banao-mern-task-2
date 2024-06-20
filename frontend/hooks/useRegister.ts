import { useState } from "react";
import axios from "axios";
interface useRegisterProps {
  url: string;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const useRegister = async ({
  url,
  username,
  email,
  password,
}: useRegisterProps) => {
  const [data, setData] = useState();
  const [error, setError] = useState<unknown>();

  try {
    const getData = await axios.post(url, {
      username,
      email,
      password,
    });
    setData(await getData.data);
  } catch (error) {
    setError(error);
  }

  return [data, error];
};

export default useRegister;
