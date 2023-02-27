import { DEFAULT_URL } from '@/utils/config';
import { Title } from '@mantine/core';

const Links = () => {
  return (
    <div>
      <Title className="mb-8" color="white">
        My Links
      </Title>
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
    </div>
  );
};

export default Links;
