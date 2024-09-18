
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongodb';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const client = await clientPromise;
      const db = client.db('IdeaSphereBlog');
      const userCollection = db.collection('users');
      // console.log(user)
      // Check if the user already exists in the database
      const existingUser = await userCollection.findOne({ email: user.email });

      if (!existingUser) {
        // If the user doesn't exist, insert their data into the database
        await userCollection.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          blogs: [], // Initialize the blogs field as an empty array
        });
      }

      return true; // Allow the user to sign in
    },
  },
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  ...authOptions, // Spread the authentication options here
});

export { handler as GET, handler as POST, authOptions };

