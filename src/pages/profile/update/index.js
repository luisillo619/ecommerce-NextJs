import UpdateProfile from "@/components/auth/UpdateProfile";
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

export default function UpdateProfilePage({session}) {
  return (
    <UserProfileLayout>
      <UpdateProfile session={session}/>
    </UserProfileLayout>
  );
}
