import { Session, UserSession } from '@/pages/api/auth/[...thirdweb]';
import { requestProfileByUser } from '@/services/profile';
import { useUser } from '@thirdweb-dev/react';
import useSWR from 'swr';
import { SecondaryButton } from '../Buttons/Buttons';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';

const ProfileCard = () => {
  const { user } = useUser<UserSession, Session>();
  const { data, error, isLoading } = useSWR('/profile', () =>
    requestProfileByUser(user?.session?.id as string)
  );

  return (
    <div className="max-w-[720px]">
      <ProfileHeader />
      <div className="translate-y-[-60px] ml-6">
        <ProfileImage title={data?.name} subtitle={data?.subtitle as string} />
      </div>
      <div className="mb-8">{data?.description}</div>
      <div className="flex flex-col gap-4">
        {data?.profile_links &&
          data?.profile_links?.map((item, index) => {
            return (
              <SecondaryButton
                size="lg"
                className="hover:-translate-y-1 hover:scale-105 transition"
                href={item.target}
                component="a"
              >
                {item.label}
              </SecondaryButton>
            );
          })}
      </div>
    </div>
  );
};

export default ProfileCard;
