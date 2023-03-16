import { GlassCard, StatCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import apiRoutes from '@/routes/api';
import { GET_PROFILE_STATS_BY_USER, ProfileStats } from '@/services/profile';
import { signedRequest } from '@/utils/api/signedRequest';
import { useUser } from '@thirdweb-dev/react';
import useSWR from 'swr';
import Links from './Links';
import Reviews from './Reviews';

const AuthenticatedProfile = () => {
  const { user } = useUser<UserSession, Session>();

  const { data, isLoading } = useSWR<{ data: { data: ProfileStats } }>(
    user ? '/profile_stats' : null,
    () =>
      signedRequest({
        type: 'post',
        url: apiRoutes.profile.profile,
        data: {
          type: GET_PROFILE_STATS_BY_USER,
          userId: user?.session?.id,
        },
      })
  );

  const stats = data?.data.data;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-wrap gap-6 mb-16">
          <StatCard value={stats?.linksCount} label="Total Links" />
          <StatCard
            value={stats?.totalLinkClicksCount}
            label="Total Link Clicks"
          />
          <StatCard
            value={stats?.profileImpressionsCount}
            label="Total Profile Impressions"
          />
          <StatCard
            value={stats?.profileReviewsCount}
            label="Total Profile Reviews"
          />
        </div>
        <GlassCard className="flex justify-center">
          <ProfileCard userId={user?.session?.id} />
        </GlassCard>
        <GlassCard>
          <Links
            isRecent={true}
            title="Recently Tinyfied Links"
            subtitle="Showing 10 most recent links"
          />
        </GlassCard>
        <GlassCard>
          <Reviews
            isRecent={true}
            title="Recent Tiny Profile Reviews"
            subtitle="Showing 10 most recent reviews"
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthenticatedProfile;
