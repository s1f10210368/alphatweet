import { twitterRepository } from '$/repository/twitterRepository';

export const twitterUseCase = {
  fetchTrends: async () => {
    const trends = await twitterRepository.fetchTrends();

    return trends;
  },

  fetchTweet: async () => {
    const tweet = await twitterRepository.fetchTweet();

    return tweet;
  },
};
