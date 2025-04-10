"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { AppbarClient } from "../components/AppbarClient";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      User app
   </div>
  );
}
