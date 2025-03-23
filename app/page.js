import { Theme } from "@radix-ui/themes";
import Image from "next/image";
import Register from "./auth/register";

export default function Home() {
  return (
    <Theme>
      <Register />
    </Theme>
  );
}
