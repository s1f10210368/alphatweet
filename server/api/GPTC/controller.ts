import { gptUseCase } from '$/useCase/gptUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => gptUseCase.fetchGPTC().then((GPT) => ({ status: 200, body: GPT })),
}));
