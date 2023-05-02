import axios from 'axios';
import fetch from 'node-fetch';

const getBitcoinPrice = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
  );
  const { bitcoin } = response.data;
  if (bitcoin.usd > 0) {
    console.log('\x1b[32m%s\x1b[0m', 'Test 1 Passed');
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'Test 1 Failed');
  }
};

const getTrendingCoins = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  );
  const coins = response.data;
  if (coins.length > 0) {
    console.log('\x1b[32m%s\x1b[0m', 'Test 2 Passed');
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'Test 2 Failed');
  }
};

const testSingleCoin = async () => {
  try {
    const result = await fetchCoinData('bitcoin', 'usd', 7);
    console.log('\x1b[32m%s\x1b[0m', 'Test 3 Passed');
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Test 3 Failed');
  }
};

const fetchCoinData = async (coinId, currency, days) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  const data = await response.json();
  return data.data;
};

(async () => {
  try {
    await getBitcoinPrice();
    await getTrendingCoins();
    await testSingleCoin();
    const result = await fetchCoinData('bitcoin', 'usd', 7);
    console.log('\x1b[32m%s\x1b[0m', 'Test 4 Passed');
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Test 4 Failed');
  }
})();