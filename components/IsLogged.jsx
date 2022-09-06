import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';

const IsLogged = ({ children }) => {
  const { data } = useSession();

  const router = useRouter();

  if (data?.user?.accessToken) {
    return router.push('/dashboard');
  }

  return { children };
};

export default IsLogged;
