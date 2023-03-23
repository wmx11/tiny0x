const API_ENDPOINT = '/api';
const PROFILE = `${API_ENDPOINT}/profile`;
const CAMPAIGN = `${API_ENDPOINT}/campaign`;

const apiRoutes = {
  tinify: `${API_ENDPOINT}/tinify`,
  token: `${API_ENDPOINT}/token`,
  image: `${API_ENDPOINT}/image`,
  profile: {
    profile: `${PROFILE}/profile`,
    createOrUpdate: `${PROFILE}/create-update`,
    links: `${PROFILE}/links`,
    reviews: `${PROFILE}/reviews`,
    campaigns: `${PROFILE}/campaigns`,
  },
  campaign: {
    createOrUpdate: `${CAMPAIGN}/create-update`,
    campaigns: `${CAMPAIGN}/campaigns`,
  },
};

export default apiRoutes;
