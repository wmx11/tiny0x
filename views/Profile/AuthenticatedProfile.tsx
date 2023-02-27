import { PrimaryButton } from '@/components/Buttons/Buttons';
import { GlassCard, StatCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import styles from '@/styles/styles';
import { DEFAULT_URL } from '@/utils/config';
import { Button, Rating, Text, Title } from '@mantine/core';
import { useAddress } from '@thirdweb-dev/react';

const AuthenticatedProfile = () => {
  const address = useAddress();
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-16">
        <StatCard value={172} label="Links" />
        <StatCard value="$152" label="Ad shares">
          <PrimaryButton fullWidth className="mt-4">
            Claim
          </PrimaryButton>
        </StatCard>
        <StatCard value="9,051" label="Profile Impressions" />
        <StatCard value="8,003" label="Profile Link Clicks" />
        <StatCard value={186} label="Profile Reviews" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <GlassCard className={styles.profileCardWidth}>
            <ProfileCard />
          </GlassCard>
        </div>
        <div className="flex flex-col gap-6">
          <GlassCard>
            <Title className="mb-4">Recent reviews</Title>
            <div className="rounded-md bg-white/10 backdrop-blur mb-4 p-4 flex gap-4">
              <div className="w-[380px]">Review</div>
              <div className="w-[280px]">Rating</div>
              <div className="w-[280px]">Reviewer</div>
            </div>
            {[
              'A good boi',
              'He does a lot of stuff',
              'Interesting man to work with',
              'He provides a lot of cheese to the community',
              'Never ever had I meowed so loud',
            ].map((item, index) => (
              <div
                className="rounded-md bg-white/10 backdrop-blur mb-4 p-4 flex gap-4"
                key={index}
              >
                <div className="w-[380px]">{item}</div>
                <div className="w-[280px]">
                  <Rating defaultValue={5} value={5} />
                </div>
                <div className="w-[280px]">
                  0xcd...{Math.trunc(100 * 2 * Math.random())}e7
                </div>
              </div>
            ))}
          </GlassCard>
          <GlassCard>
            <Title className="mb-4">Recent Links</Title>
            <div className="rounded-md bg-white/10 backdrop-blur mb-4 p-4 flex gap-4">
              <div className="w-[500px]">URL</div>
              <div className="w-[100px]">NFT ID</div>
              <div className="w-[200px]">Clicks</div>
              <div className="w-[280px]">Running Ads</div>
            </div>
            {[13123, 3453456, 345345, 123123, 645675476, 678678].map(
              (item, index) => (
                <div
                  className="rounded-md bg-white/10 backdrop-blur mb-4 p-4 flex gap-4"
                  key={index}
                >
                  <div className="w-[500px]">
                    {DEFAULT_URL}/0x{item}
                  </div>
                  <div className="w-[100px]">
                    #{Math.round(Math.random() * 10) + index + 1}
                  </div>
                  <div className="w-[200px]">
                    {Math.trunc(100 * 2 * Math.random())}
                  </div>
                  <div className="w-[280px]">
                    {[true, false][Math.round(Math.random())].toString()}
                  </div>
                </div>
              )
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedProfile;
