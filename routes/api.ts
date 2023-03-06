const API_ENDPOINT = '/api';

const apiRoutes = {
  tinify: `${API_ENDPOINT}/tinify`,
  token: `${API_ENDPOINT}/token`,
  profile: {
    profile: `${API_ENDPOINT}/profile/profile`,
    createOrUpdate: `${API_ENDPOINT}/profile/create-update`,
    links: `${API_ENDPOINT}/profile/links`,
    reviews: `${API_ENDPOINT}/profile/reviews`,
  },
};

export default apiRoutes;
