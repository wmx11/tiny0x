import { GlassCard } from '@/components/Cards/Cards';
import ProfileCrud from '@/components/Profile/ProfileCrud';
import styles from '@/styles/styles';
import { Text, Title } from '@mantine/core';

const CreateOrUpdateProfile = () => {
  return (
    <div className={styles.profileCardWidth}>
      <div className="mb-4 text-white">
        <Title>Create your new Tiny Profile!</Title>
        <Text>
          You will mint a unique Tiny0x Profile NFT with your profile metadata.
          Think Linktree but Web3!
        </Text>
      </div>
      <GlassCard>
        <ProfileCrud />
      </GlassCard>
    </div>
  );
};

export default CreateOrUpdateProfile;
