import { Rating, Title } from '@mantine/core';

const Reviews = () => {
  return (
    <div>
      <Title className="mb-8" color="white">
        My Reviews
      </Title>
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
    </div>
  );
};

export default Reviews;
