import { InMemoryCache, IpregistryClient } from '@ipregistry/client';

const API_KEY = process.env.IP_REGISTRY_KEY || '';
const ipClient = new IpregistryClient(
  API_KEY,
  new InMemoryCache(16384, 3600 * 6 * 1000)
);

const getDataFromIp = async (
  ip: string
): Promise<
  | {
      ip: string;
      country: string;
      country_code: string;
      city: string;
      timezone: string;
    }
  | null
  | unknown
> => {
  try {
    if (!ip || ip === '::1') {
      return null;
    }

    const { data } = await ipClient.lookup(ip);

    if (!data) {
      return null;
    }

    const {
      security: { is_vpn, is_tor, is_attacker, is_abuser },
    } = data;

    if (is_vpn || is_tor || is_attacker || is_abuser) {
      return null;
    }

    return {
      ip,
      country: data?.location?.country?.name,
      country_code: data?.location?.country?.code,
      city: data?.location?.city,
      timezone: data?.time_zone?.id,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getDataFromIp;
