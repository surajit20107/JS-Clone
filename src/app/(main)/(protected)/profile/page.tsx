"use client"
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "@/components/SessionProvider";

export default function Profile() {
  const session = useSession();
  return (
    <>
    <div>welcome, {session?.user?.name}</div>
    <div>
      <LogoutButton />
    </div>
    </>
  );
}
