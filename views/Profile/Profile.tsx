import { OrangeBackdrop } from '@/components/Backdrop';
import { Section } from '@/components/Section';
import { useAddress, useUser } from '@thirdweb-dev/react';
import AuthenticatedProfile from './AuthenticatedProfile';
import UnauthenticatedProfile from './UnauthenticatedProfile';

const Profile = () => {
  const address = useAddress();
  const { isLoggedIn } = useUser();

  return (
    <Section backdrop={<OrangeBackdrop />} className="min-h-screen">
      <AuthenticatedProfile />
      {/* {!isLoggedIn || !address ? (
        <UnauthenticatedProfile />
      ) : (
        <AuthenticatedProfile />
      )} */}
    </Section>
  );
};
 
export default Profile;
