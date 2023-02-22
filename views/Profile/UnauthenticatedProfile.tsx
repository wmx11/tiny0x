import WalletConnect from '@/components/WalletConnect';
import { Container, Text, Title } from '@mantine/core';
import React from 'react';

const UnauthenticatedProfile = () => {
  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 text-white items-center">
        <Title>Welcome to a profile page</Title>
        <Text>
          To access your profile you need to connect and authenticate your
          wallet
        </Text>
        <WalletConnect />
      </div>
    </Container>
  );
};

export default UnauthenticatedProfile;
