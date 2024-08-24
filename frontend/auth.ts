import { saltAndHashPassword } from "@/lib/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const CredentialsSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        const { username, password } =
          await CredentialsSchema.parseAsync(credentials);

        const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.username, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
