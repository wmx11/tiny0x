import { GlassCard, StatCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import Table from '@/components/Table';
import { DEFAULT_URL } from '@/utils/config';
import { Rating, Title } from '@mantine/core';
import { useAddress } from '@thirdweb-dev/react';

const AuthenticatedProfile = () => {
  const address = useAddress();
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-wrap gap-6 mb-16">
          <StatCard value={172} label="Links" />
          <StatCard value="$152" label="Ad shares" />
          <StatCard value="9,051" label="Profile Impressions" />
          <StatCard value="8,003" label="Profile Link Clicks" />
          <StatCard value={186} label="Profile Reviews" />
        </div>
        <GlassCard>
          <ProfileCard />
        </GlassCard>

        <GlassCard>
          <Title className="mb-4">Recent reviews</Title>
          <Table
            header={['Review', 'Rating', 'Reviewer']}
            rows={[
              {
                row: [
                  'Good boi',
                  <Rating defaultValue={5} value={5} />,
                  <>0xcd...{Math.trunc(100 * 2 * Math.random())}e7</>,
                ],
              },
              {
                row: [
                  'Good boi',
                  <Rating defaultValue={5} value={5} />,
                  <>0xcd...{Math.trunc(100 * 2 * Math.random())}e7</>,
                ],
              },
              {
                row: [
                  'Good boi',
                  <Rating defaultValue={5} value={5} />,
                  <>0xcd...{Math.trunc(100 * 2 * Math.random())}e7</>,
                ],
              },
              {
                row: [
                  'Good boi',
                  <Rating defaultValue={5} value={5} />,
                  <>0xcd...{Math.trunc(100 * 2 * Math.random())}e7</>,
                ],
              },
            ]}
          />
        </GlassCard>
        <GlassCard>
          <Title className="mb-4">Recent Links</Title>
          <Table
            style={{
              gridTemplateColumns: '250px repeat(3, 1fr)',
            }}
            header={['URL', 'NFT ID', 'Clicks', 'Running Ads']}
            rows={[
              {
                row: [
                  <>
                    {DEFAULT_URL}/0x{678678}
                  </>,
                  <>#{Math.round(Math.random() * 10) + 1 + 1}</>,
                  <>{Math.trunc(100 * 2 * Math.random())}</>,
                  <>{[true, false][Math.round(Math.random())].toString()}</>,
                ],
              },
              {
                row: [
                  <>
                    {DEFAULT_URL}/0x{678678}
                  </>,
                  <>#{Math.round(Math.random() * 10) + 1 + 1}</>,
                  <>{Math.trunc(100 * 2 * Math.random())}</>,
                  <>{[true, false][Math.round(Math.random())].toString()}</>,
                ],
              },
              {
                row: [
                  <>
                    {DEFAULT_URL}/0x{678678}
                  </>,
                  <>#{Math.round(Math.random() * 10) + 1 + 1}</>,
                  <>{Math.trunc(100 * 2 * Math.random())}</>,
                  <>{[true, false][Math.round(Math.random())].toString()}</>,
                ],
              },
              {
                row: [
                  <>
                    {DEFAULT_URL}/0x{678678}
                  </>,
                  <>#{Math.round(Math.random() * 10) + 1 + 1}</>,
                  <>{Math.trunc(100 * 2 * Math.random())}</>,
                  <>{[true, false][Math.round(Math.random())].toString()}</>,
                ],
              },
            ]}
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthenticatedProfile;
