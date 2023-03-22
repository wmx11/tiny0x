const generalRoutes = {
  about: '/about',
  leaderboard: '/leaderboard',
  campaigns: '/campaigns',
  campaign: '/campaign/${id}',
  profiles: '/profiles',
  reviews: '/reviews/${profile}',
  profile: {
    profile: '/profile',
    campaigns: '/profile/campaigns',
    editCampaign: '/profile/campaigns/edit/${id}',
    createCampaign: '/profile/campaigns/create',
    links: '/profile/links',
    reviews: '/profile/reviews',
    edit: '/profile/edit',
  },
  analytics: {
    alias: '/analytics/${alias}',
  },
};

export default generalRoutes;
