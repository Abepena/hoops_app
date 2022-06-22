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
    async jwt({ token, user, account, profile }) {
      // Handle Credentials Log in
      console.log(profile);

      //handle credential login
      if (account && account.type === "credentials" && user) {
        return {
          ...token,
          user: user.data,
          accessToken: user.jwt,
        };
      }

      // Handle OAuth Provider Log in
      if (account && user) {
        token.providerImage = user.image;
        token.name = user.name
        //get database user
        const res = await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
          )
          .catch((error) => {
            if (error.response) {
              throw Error(error.response.data.error.message);
            }
          });
        const { data } = res;

        token.user = data.user;
        
        // Set user first and last name in database if this is the first time (google)
        if (!token.user.firstName && profile.given_name){
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`)
        }
        
          token.accessToken = data.jwt;

      }

      return token;
    },

    async session({ session, token }) {
      session.user = { ...token.user, name: };
      session.providerImage = token.providerImage;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
