const API_ENDPOINT = '/api';

const apiRoutes = {
  tinify: `${API_ENDPOINT}/tinify`,
  token: `${API_ENDPOINT}/token`,
  profile: {
    profile: `${API_ENDPOINT}/profile`,
    createOrUpdate: `${API_ENDPOINT}/profile/create-update`,
  },
};

export default apiRoutes;
