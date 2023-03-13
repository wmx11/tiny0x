export type LinkPriceEntries = {
  default?: number;
  trackMetrics?: number;
  doesAcceptAds?: number;
  slug?: number;
};

const config = {
  links: {
    freePerIp: 5,
    prices: {
      default: 0.06,
      trackMetrics: 0.04,
      doesAcceptAds: 0.02,
      slug: 0.06,
      /**
       * @desc - This function calculates the total price of the Link NFT based on LinkPrice parameters (Corresponding to the Link schema)
       * @param options - Link Schema object
       * @param linksCountForMonth - The number of links the user has minted this month
       * @returns - Total price of the Link NFT
       */
      calculatePrice(options: LinkPriceEntries, linksCountForMonth?: number) {
        return Object.entries(options)
          .filter((item) => item?.at(1) && this.hasOwnProperty(item[0]))
          .map((item) => (item ? item[0] : ''))
          .reduce(
            (acc, curr) => acc + this[curr as keyof LinkPriceEntries],
            linksCountForMonth && linksCountForMonth > config.links.freePerIp
              ? this.default
              : 0
          );
      },
    },
  },
  profile: {
    prices: {
      default: 1,
    },
  },
  images: {
    supportedFormats: ['svg', 'png', 'jpg', 'jpeg'],
    checkSupport(format: string) {
      return this?.supportedFormats?.includes(format);
    },
    getImageData(image: Blob) {
      return `data:image/png;base64,${image}`;
    },
    profile: {
      header: {
        width: 40,
        height: 40,
      },
      avatar: {
        width: 150,
        height: 150,
      },
    },
  },
};

export default config;
