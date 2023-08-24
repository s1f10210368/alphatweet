import { gptRepository } from '$/repository/gptRepository';

export const gptUseCase = {
  // fetchTrends: async () => {
  //   const trends = await twitterRepository.fetchTrends();

  //   return trends;
  // },

  // fetchTweet: async () => {
  //   const tweet = await twitterRepository.fetchTweet();

  //   return tweet;
  // },
  fetchGPT: async () => {
    const GPT = await gptRepository.fetchGPT();

    return GPT;
  },
};
