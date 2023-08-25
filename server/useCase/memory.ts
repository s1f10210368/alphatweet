import axios from 'axios';
import { ConversationChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { buy } from '../useCase/buy';
import { sell } from '../useCase/sell';

const getStockPrice = async () => {
  const apiKey = 'L9ZH7B1TW75Z7VZE '; // Alpha VantageのAPIキーに置き換えてください
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=USDJPY&interval=15min&apikey=${apiKey}`;

  const response = await axios.get(url);
  const timeSeries = response.data['Time Series (15min)'];
  const timestamps = Object.keys(timeSeries);
  const latesttimestamps = timestamps.slice(0, 8);

  // Create an object to store all prices
  const prices: { [key: string]: any } = {};

  latesttimestamps.forEach((timestamp) => {
    prices[timestamp] = {
      time: timestamp,
      open: timeSeries[timestamp]['1. open'],
      high: timeSeries[timestamp]['2. high'],
      low: timeSeries[timestamp]['3. low'],
      close: timeSeries[timestamp]['4. close'],
    };
  });

  // Return the prices object instead of array
  return prices;
};

export const run = async () => {
  // LLMの準備
  const llm = new OpenAI({ temperature: 0 });
  // ConversationChainの準備
  const chain = new ConversationChain({ llm });

  const fxprice = await getStockPrice();

  // 会話の実行
  const input1 = `$${JSON.stringify(
    fxprice,
    null,
    2
  )}は直近2時間の証券取引所の価格データです。${buy}`; //例として直近２時間で一番安かったときのものを買うようにしてみてる
  const res1 = await chain.call({ input: input1 });
  console.log('Human:', input1);
  console.log('AI:', res1);
  /*
  // 会話の実行
  const input2 = character; //戦略入力
  const res2 = await chain.call({ input: input2 });
  console.log("Human:", input2);
  console.log("AI:", res2["response"]); 
*/
  // 会話の実行
  const input3 = sell; //売却、収支と日時出力
  const res3 = await chain.call({ input: input3 });
  console.log('Human:', input3);
  console.log('AI:', res3);
};
run();
