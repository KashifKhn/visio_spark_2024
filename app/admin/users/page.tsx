import { UserManagement } from "@/components/users/user-management";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import React from "react";

const UserPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <SignedIn>
        <UserManagement />
      </SignedIn>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </SignedOut>
    </main>
  );
};

export default UserPage;
