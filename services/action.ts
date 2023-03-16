import prisma from '@/prisma/prisma';

type ActionTypes = {
  ip?: string;
  country?: string;
  country_code?: string;
  city?: string;
  timezone?: string;
  referer?: string;
  user_agent?: string;
  device?: string;
  profileId?: string;
  linkId?: string;
};

export const SET_IMPRESSION_ACTION = 'setImpressionAction';
export const setImpressionAction = async (data: ActionTypes) => {
  try {
    const impression = await prisma?.action.create({
      data: {
        ...data,
        type: 0,
      },
    });

    return impression;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const SET_CLICK_ACTION = 'setClickAction';
export const setClickAction = async (data: ActionTypes) => {
  try {
    const click = await prisma?.action.create({
      data: {
        ...data,
        type: 1,
      },
    });

    return click;
  } catch (error) {
    console.log(error);
    return error;
  }
};
