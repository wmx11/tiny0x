import { useAddress, useUser } from '@thirdweb-dev/react';
import AuthenticatedProfile from './AuthenticatedProfile';
import UnauthenticatedProfile from './UnauthenticatedProfile';

const Profile = () => {
  const address = useAddress();
  const { user, isLoggedIn, isLoading } = useUser();

  return (
    <>
      {!isLoggedIn || !address ? (
        <UnauthenticatedProfile />
      ) : (
        <AuthenticatedProfile />
      )}
    </>
  );
};

export default Profile;
