const generalRoutes = {
  about: '/about',
  leaderboard: '/leaderboard',
  campaigns: '/campaigns',
  profiles: '/profiles',
  reviews: '/reviews/${profile}',
  profile: {
    profile: '/profile',
    campaigns: '/profile/campaigns',
    links: '/profile/links',
    reviews: '/profile/reviews',
    edit: '/profile/edit',
  },
  analytics: {
    alias: '/analytics/${alias}',
  },
};

export default generalRoutes;
