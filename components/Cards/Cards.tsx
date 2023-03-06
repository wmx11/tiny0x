import { Code, Text, Title } from '@mantine/core';
import React, { FC, PropsWithChildren } from 'react';

type NFTCardTypes = {
  code?: string;
  image?: string;
};

export const NFTCard: FC<NFTCardTypes> = ({ code, image }) => {
  return (
    <div className="bg-gradient-to-br from-pink-500/50 to-purple-500/50 backdrop-filter backdrop-blur-xl rounded-xl w-[350px] p-4 shadow-md">
      <div className="h-[250px] rounded-xl bg-gradient-to-br from-white/20 to-purple-500/50 mb-4 overflow-hidden shadow-md">
        <img
          src="https://i.seadn.io/gae/HZuqeRrZpjxe_MQkHLWTPHeGaKGsz7DK7hjih4QyvhqrA3Oy4hebmlAn6-rsPintCfB6z3hn7AMq5y5rPDYsaOcqogSDe3u9nJ2Vcw?auto=format&w=350"
          alt="blob"
          className="object-fill"
        />
      </div>
      {code ? (
        <Code block className="shadow-md">
          {code}
        </Code>
      ) : null}
    </div>
  );
};

export const GlassCard: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl px-4 py-7 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export const StatCard: FC<
  PropsWithChildren & { value?: string | number; label?: string }
> = ({ value, label, children }) => {
  return (
    <GlassCard className="w-[300px] text-center hover:shadow-xl transition flex flex-col justify-center items-center">
      <div className="w-full">
        <Title className="text-5xl mb-2">{value}</Title>
        <Text>{label}</Text>
        {children ? children : null}
      </div>
    </GlassCard>
  );
};
