import { SecondaryButton } from '../Buttons/Buttons';
import ProfileHeader from './ProfileHeader';
import ProfileImage from './ProfileImage';

const ProfileCard = () => {
  return (
    <div>
      <ProfileHeader />
      <div className="translate-y-[-60px] ml-6">
        <ProfileImage title="John Doe" subtitle="Some Title" />
      </div>
      <div className="mb-8">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem
      </div>
      <div className="flex flex-col gap-4">
        <SecondaryButton
          size="lg"
          className="hover:-translate-y-1 hover:scale-105 transition"
        >
          Discord
        </SecondaryButton>
        <SecondaryButton
          size="lg"
          className="hover:-translate-y-1 hover:scale-105 transition"
        >
          Telegram
        </SecondaryButton>
        <SecondaryButton
          size="lg"
          className="hover:-translate-y-1 hover:scale-105 transition"
        >
          Twitter
        </SecondaryButton>
        <SecondaryButton
          size="lg"
          className="hover:-translate-y-1 hover:scale-105 transition"
        >
          LinkedIn
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ProfileCard;
