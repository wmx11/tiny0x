import prisma from '@/prisma/prisma';
import Home from '@/views/Home';

export default function HomePage() {
  return <Home />;
}

export const getServerSideProps = async () => {
  const data = await prisma.user.findUnique({
    where: {
      address: '0xb3A7Ab89c3a0e209b45338f1eCe30Dc246C0c4c0',
    },
    include: {
      profile: true,
    },
  });

  return {
    props: {},
  };
};
