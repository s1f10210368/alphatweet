import type { TrendModel } from '$/commonTypesWithClient/models';
import { TWITTER_PASSWORD, TWITTER_USERNAME } from '$/service/envValues';
import type { Browser, BrowserContext, Page } from 'playwright';
import { chromium } from 'playwright';

// const openai = new OpenAI({
//   apiKey: OPENAIAPI,
// });

// const GPT = async () => {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: '簡単で面白いことを言ってください' }],
//     model: 'gpt-3.5-turbo',
//     max_tokens: 50,
//   });

//   const answerArray = completion.choices.map((choice) => choice.message.content);
//   const filteredAnswerArray = answerArray.filter((content) => content !== null);
//   const answer = filteredAnswerArray.join(' '); // 文字列を結合

//   console.log(answer);
//   return answer;
// };

const origin = 'https://twitter.com';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

const getLoggedInPage = async () => {
  if (page?.isClosed() === false) return page;

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ locale: 'ja-JP' });
  page = await context.newPage();

  await page.goto(origin);
  await page.getByTestId('loginButton').click();
  await page.locator('input[autocomplete="username"]').fill(TWITTER_USERNAME);
  await page.getByText('次へ').click();
  await page.locator('input[name="password"]').fill(TWITTER_PASSWORD);
  await page.getByTestId('LoginForm_Login_Button').click();
  await page.getByTestId('SideNav_NewTweet_Button').waitFor();

  return page;
};

export const twitterRepository = {
  fetchTrends: async (): Promise<TrendModel[]> => {
    const page = await getLoggedInPage();

    await page.goto(`${origin}/explore/tabs/trending`);

    const selector = '[data-testid="trend"] > div > div:nth-child(2)';
    await page.waitForSelector(selector);

    return page
      .locator(selector)
      .allInnerTexts()
      .then((trends) =>
        trends.map((t): TrendModel => ({ isHashtag: t.startsWith('#'), word: t.replace('#', '') }))
      );
  },

  // fetchTweet: async (): Promise<TrendModel[]> => {
  //   const page = await getLoggedInPage();

  //   await page.goto(`${origin}/home`);

  //   const tweetTextBox = await page.getByRole('textbox', { name: 'Tweet text' });
  //   await tweetTextBox.click();

  //   // const contents = 'aaa';

  //   const contents = await GPT();

  //   await tweetTextBox.fill(contents);

  //   await page.getByTestId('tweetButtonInline').click();

  //   return [{ isHashtag: false, word: contents }];
  // },
};
