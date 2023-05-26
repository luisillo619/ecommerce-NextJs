import UploadImages from "@/components/admin/UploadImages";
import AdminProfileLayout from "@/components/layouts/AdminProfileLayout";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const { id } = context.params;

  return {
    props: {
      id,
      session,
    },
  };
};

export default function UploadProductImagesPage({ id, session }) {
  return (
    <AdminProfileLayout>
      <UploadImages id={id} session={session} />;
    </AdminProfileLayout>
  );
}
