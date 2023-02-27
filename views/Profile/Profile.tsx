import { useAddress, useUser } from '@thirdweb-dev/react';
import AuthenticatedProfile from './AuthenticatedProfile';

const Profile = () => {
  const address = useAddress();
  const { isLoggedIn } = useUser();

  return (
    <>
      <AuthenticatedProfile />
      {/* {!isLoggedIn || !address ? (
        <UnauthenticatedProfile />
      ) : (
        <AuthenticatedProfile />
      )} */}
    </>
  );
};

export default Profile;
