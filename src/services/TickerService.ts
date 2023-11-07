// noinspection SpellCheckingInspection
const API_COINDESK_CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice.json';

/**
 * The current BTC price in EUR and USD.
 */
export interface TickerPrice {
  updated: Date,
  rateEUR: number,
  rateUSD: number
}

// noinspection SpellCheckingInspection
/**
 * Part of the Coindesk API response.
 *
 * https://www.coindesk.com/coindesk-api
 * https://www.coindesk.com/price/bitcoin
 */
interface CoinDeskBpiCurrentPrice {
  time: {
    /** Time in format '2013-09-18T17:27:00+00:00'. */
    updatedISO: string
  },
  bpi: {
    EUR: {rate_float: number},
    USD: {rate_float: number}
  }
}


/**
 * Moved to separate service, so we can have a promise with return types (when using TypeScript).
 */
export class TickerService {

  public static fetchCoinDeskCurrentPrice():Promise<TickerPrice> {
    return fetch(API_COINDESK_CURRENT_PRICE)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Error reading remote service ${API_COINDESK_CURRENT_PRICE}, status: ${response.status}`);
        }
        return response.json() as Promise<CoinDeskBpiCurrentPrice>;
      })
      .then((data) => ({
        updated: new Date(data.time.updatedISO),
        rateEUR: data.bpi.EUR.rate_float,
        rateUSD: data.bpi.USD.rate_float,
      }));
  }
}
