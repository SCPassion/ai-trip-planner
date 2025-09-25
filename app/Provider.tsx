"use client";
import { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Doc } from "@/convex/_generated/dataModel";

type UserDetails = Omit<Doc<"UserTable">, "_id" | "_creationTime">;

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.users.CreateNewUser);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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
    setUserDetails(result);
  }
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  );
}

export const useUserDetails = () => {
  return useContext(UserDetailContext);
};
