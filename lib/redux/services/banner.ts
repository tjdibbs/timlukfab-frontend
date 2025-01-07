import { BannerController } from '@/types/banner';
import { api } from '../api';

const bannerApi = api.injectEndpoints({
  endpoints: build => ({
    getBanners: build.query<BannerController.GET, void>({
      query: () => '/banners',
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;
