import { gptUseCase } from '$/useCase/gptUseCase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async (req) => {
    const result = await gptUseCase.fetchGptTweet(req.body.message);
    return { status: 200, body: result };
  },
}));
