"use client";
import { useEffect } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.users.CreateNewUser);
  const { user } = useUser(); // Get user from Clerk

  useEffect(() => {
    // Create new user if not exists when user is loaded
    CreateNewUser();
  }, [user]);

  async function CreateNewUser() {
    // Save new user if not exists

    if (!user) return;
    const result = await CreateUser({
      name: user.fullName || "",
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    });
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
