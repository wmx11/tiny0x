import generalRoutes from '@/routes/general';
import icons from './icons';

export const navigation = [
  {
    label: 'Home',
    mobileLabel: '',
    href: '/',
    icon: icons.Home,
  },
  {
    label: 'About',
    mobileLabel: '',
    href: generalRoutes.about,
    icon: icons.Info,
  },
  // {
  //   label: 'Campaigns',
  //   mobileLabel: '',
  //   href: generalRoutes.campaigns,
  //   icon: icons.Campaign,
  // },
  {
    label: 'Discover Profiles',
    mobileLabel: 'Discover',
    href: generalRoutes.profiles,
    icon: icons.MagnifyingGlass,
  },
];

export const profileNavigation = [
  {
    label: 'Profile',
    mobileLabel: '',
    href: generalRoutes.profile.profile,
    icon: icons.User,
  },
  {
    label: 'Links',
    mobileLabel: '',
    href: generalRoutes.profile.links,
    icon: icons.Link,
  },
  {
    label: 'Reviews',
    mobileLabel: '',
    href: generalRoutes.profile.reviews,
    icon: icons.Review,
  },
  // {
  //   label: 'Campaigns',
  //   mobileLabel: '',
  //   href: generalRoutes.profile.campaigns,
  //   icon: icons.Campaign,
  // },
];

export const footerNavigation = [
  {
    label: 'Tiny0x',
    items: [
      {
        label: 'About',
        href: generalRoutes.about,
      },
      {
        label: 'Discover Profiles',
        href: generalRoutes.profiles,
      },
    ],
  },
  {
    label: 'Legal',
    items: [
      {
        label: 'Privacy Policy',
        href: '',
      },
      {
        label: 'Terms of Service',
        href: '',
      },
      {
        label: 'Cookie Policy',
        href: '',
      },
      {
        label: 'Disclaimer',
        href: '',
      },
    ],
  },
];
