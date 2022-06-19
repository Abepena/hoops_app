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
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplier
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/api/auth/local",
          {
            identifier: credentials.email,
            papssword: credentials.password,
          }
        );

        console.log(res.data);
        const { jwt, user } = res.data;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("isNewUser: ", isNewUser)
      if (isNewUser) {
        console.log(user);
        // create user in database from credentials
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/`, {
            username: user.email,
            email: user.email,
          })
          .then((res) => {
            console.log("Well done!");
            console.log("User profile", res.data.user);
            console.log("User token", res.data.jwt);
          })
          .catch((err) => {
            console.log("An error occurred:", err.response);
          });
      }

      if (account) {
        token.accessToken = account.access_token;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`;
        const res = await axios.get(url);
        const { data } = res;
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.jwt = token.jwt;
      session.user_id = token.id;
      return session;
    },
  },
});
