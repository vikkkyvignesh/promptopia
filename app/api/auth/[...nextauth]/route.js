import NextAuth from "@node_modules/next-auth";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.log(error.message);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        //check if a user already exists

        const userExists = await User.findOne({ email: profile.email });

        //if not user exists

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
