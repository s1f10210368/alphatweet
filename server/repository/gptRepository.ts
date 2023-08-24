import { OPENAIAPI } from '$/service/envValues';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: OPENAIAPI,
});

const GPT = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: '簡単で面白いことを言ってください' }],
    model: 'gpt-3.5-turbo',
    max_tokens: 50,
  });

  const answerArray = completion.choices.map((choice) => choice.message.content);
  const filteredAnswerArray = answerArray.filter((content) => content !== null);
  const answer = filteredAnswerArray.join(' '); // 文字列を結合

  console.log(answer);
  return answer;
};

export const gptRepository = {
  fetchGPT: async (): Promise<string[]> => {
    const contents = await GPT();

    return [contents];
  },
};
