import Icons from '@/utils/icons';
import { profileNavigation } from '@/utils/navigation';
import { truncateAddress } from '@/utils/utils';
import {
  Button,
  CSSObject,
  Divider,
  Grid,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  useAddress,
  useCoinbaseWallet,
  useDisconnect,
  useLogin,
  useLogout,
  useMetamask,
  useNetworkMismatch,
  useUser,
  useNetwork,
  ChainId,
  useWalletConnect,
} from '@thirdweb-dev/react';
import Image from 'next/image';
import Link from 'next/link';
import CoinbaseLogo from 'public/images/wallets/coinbase.jpg';
import MetamaskLogo from 'public/images/wallets/metamask.jpg';
import WalletConnectLogo from 'public/images/wallets/walletconnect.jpg';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../Buttons/Buttons';

const styledConnectButton: CSSObject = {
  borderRadius: '15px',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 0 10px #6741d9',
  },
};

const WalletConnect = () => {
  const MODAL_ID = 'wallet_connect';
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnect = useDisconnect();
  const address = useAddress();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();
  const isNetworkMismatched = useNetworkMismatch();
  const [{}, switchNetwork] = useNetwork();

  useEffect(() => {
    if (address && !isLoggedIn) {
      login();
    }

    if (address && isLoggedIn) {
      modals.close(MODAL_ID);
    }

    if (isNetworkMismatched) {
      switchNetwork?.(ChainId.BinanceSmartChainMainnet);
    }
  }, [address, isLoggedIn, user, isNetworkMismatched]);

  return (
    <>
      {address ? (
        <Menu shadow="md" width={200} withinPortal={true} withArrow>
          <Menu.Target>
            <div className="relative">
              <Button
                size="md"
                rightIcon={<Icons.ChevronDown className="text-xs" />}
                leftIcon={<Icons.Wallet className="text-xs" />}
                variant="gradient"
                gradient={{ from: 'pink', to: 'violet' }}
              >
                {truncateAddress(address)}
              </Button>
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>My Profile</Menu.Label>
            {profileNavigation &&
              profileNavigation.map((item, index) => {
                return (
                  <Link
                    key={`profile_navigation_menu_${index}`}
                    href={item.href}
                  >
                    <Menu.Item icon={<item.icon />}>{item.label}</Menu.Item>
                  </Link>
                );
              })}
            <Menu.Item icon={<Icons.Login />} onClick={() => login()}>
              Login
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              icon={<Icons.Logout />}
              color="red"
              onClick={() => {
                logout();
                disconnect();
              }}
            >
              Disconnect
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <PrimaryButton
          size="md"
          rightIcon={<Icons.Wallet className="text-xs" />}
          onClick={() =>
            modals.open({
              centered: true,
              withinPortal: false,
              modalId: MODAL_ID,
              title: (
                <Title order={2} color="white">
                  Connect your wallet
                </Title>
              ),
              children: (
                <>
                  <Text size="sm" color="white">
                    Start by connecting with one of the wallets below. Be sure
                    to store your private keys or seed phrase securely. Never
                    share them with anyone.
                  </Text>

                  <Divider size={1} my={20} color="dimmed" />

                  <Grid gutter={30}>
                    <Grid.Col span={3}>
                      <UnstyledButton
                        onClick={connectWithMetamask}
                        sx={styledConnectButton}
                      >
                        <Image
                          src={MetamaskLogo}
                          alt="Metamask logo"
                          width={90}
                          height={90}
                        />
                      </UnstyledButton>
                      <Text size="xs" align="center">
                        Metamask
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <UnstyledButton
                        onClick={connectWithWalletConnect}
                        sx={styledConnectButton}
                      >
                        <Image
                          src={WalletConnectLogo}
                          alt="Walletconnect logo"
                          width={90}
                          height={90}
                        />
                      </UnstyledButton>
                      <Text size="xs" align="center">
                        Wallet Connect
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <UnstyledButton
                        onClick={connectWithCoinbaseWallet}
                        sx={styledConnectButton}
                      >
                        <Image
                          src={CoinbaseLogo}
                          alt="Coinbase logo"
                          width={90}
                          height={90}
                        />
                      </UnstyledButton>
                      <Text size="xs" align="center">
                        Coinbase
                      </Text>
                    </Grid.Col>
                  </Grid>
                </>
              ),
            })
          }
        >
          Connect
        </PrimaryButton>
      )}
    </>
  );
};

export default WalletConnect;
