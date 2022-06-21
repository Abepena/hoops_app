import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Pure Hoops Login",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          identifier: credentials.email,
          password: credentials.password,
        };
        const res = await axios
          .post(process.env.NEXT_PUBLIC_API_URL + "/api/auth/local", payload)
          .catch((error) => {
            //Handle invalid credentials
            if (error.response) {
              throw Error(error.response.data.error.message);
            }
          });

        const { user: data, jwt } = res.data;
        if (!res.ok) {
        }
        // If no error and we have user data, return it
        if (res.statusText === "OK" && data) {
          return { jwt, data };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`;
    //     const res = await axios.get(url);
    //     const { data } = res;
    //     token.jwt = data.jwt;
    //     token.id = data.user.id;
    //   }

    //   //runs if logging in by email
    //   if (user && "jwt" in user) {
    //     token.jwt = user.jwt;
    //     token.id = user.id;
    //   }

    //   return token;
    // },

    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          user: user.data,
          accessToken: user.jwt,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
