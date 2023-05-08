import UpdatePassword from "@/components/auth/UpdatePassword";
import UserProfileLayout from "@/components/layouts/UserProfileLayout";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default function UpdatePasswordPage({ session }) {
  return (
    <UserProfileLayout>
      <UpdatePassword session={session} />
    </UserProfileLayout>
  );
}
