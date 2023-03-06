import { GlassCard, StatCard } from '@/components/Cards/Cards';
import ProfileCard from '@/components/Profile/ProfileCard';
import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import { useUser } from '@thirdweb-dev/react';
import Links from './Links';
import Reviews from './Reviews';

const AuthenticatedProfile = () => {
  const { user } = useUser<UserSession, Session>();
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-wrap gap-6 mb-16">
          <StatCard value={172} label="Links" />
          <StatCard value="$152" label="Ad shares" />
          <StatCard value="9,051" label="Profile Impressions" />
          <StatCard value="8,003" label="Profile Link Clicks" />
          <StatCard value={186} label="Profile Reviews" />
        </div>
        <GlassCard>
          <ProfileCard userId={user?.session?.id} />
        </GlassCard>
        <GlassCard>
          <Reviews
            isRecent={true}
            title="Recent Tiny Profile Reviews"
            subtitle="Showing 10 most recent reviews"
          />
        </GlassCard>
        <GlassCard>
          <Links
            isRecent={true}
            title="Recently Tinyfied Links"
            subtitle="Showing 10 most recent links"
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthenticatedProfile;
