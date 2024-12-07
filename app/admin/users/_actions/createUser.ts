import { clerkClient } from "@clerk/nextjs/server";
export async function createUser(email: string) {
  try {
 const client = await clerkClient()
      emailAddress: [email],
    });
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
