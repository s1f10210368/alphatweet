import { gptUseCase } from '$/useCase/gptUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => gptUseCase.fetchGPT().then((gpt) => ({ status: 200, body: gpt })),
}));
