import { useRouter } from 'next/router';

const useIsActivePath = (href: string) => {
  const router = useRouter();
  const isActive =
    router.pathname.lastIndexOf('/') > 0
      ? href.includes(router.pathname.split('/').at(-1) || '')
      : href === router.pathname;

  return isActive;
};

export default useIsActivePath;
