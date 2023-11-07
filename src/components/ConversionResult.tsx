import '../css/ConversionResult.css';
import {CONVERT_DIR, CURRENCY, LOADING_STATUS} from '../domain/enums';
import {TickerPrice, TickerService} from '../services/TickerService';
import {dateFilter, timeFilter} from '../filters/date-filters';
import {roundFilter} from '../filters/number-filters';
import {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

interface Props {
  amount: number,
  currency: CURRENCY;
  direction: CONVERT_DIR;
}

export function ConversionResult({amount, currency, direction}: Props) {

  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUS.NOT_LOADING);
  const [loadingError, setLoadingError] = useState<string>();
  const [tickerPrice, setTickerPrice] = useState<TickerPrice>();


  // noinspection JSUnusedLocalSymbols
  /**
   * Load the ticker prices.
   */
  async function loadPrices(): Promise<void> {
    setLoadingStatus(LOADING_STATUS.LOADING);
    try {
      setTickerPrice(await TickerService.fetchCoinDeskCurrentPrice());
      setLoadingError(undefined);
      setLoadingStatus(LOADING_STATUS.NOT_LOADING);
    } catch (error) {
      setLoadingError(`${error}`);
      setLoadingStatus(LOADING_STATUS.ERROR);
    }
  }

  /**
   * Component initialization. Update the BTC price on interval.
   */
  useEffect(() => {
    loadPrices();
    const cancelId = setInterval(loadPrices, 60000 /* One minute. */);
    return () => clearInterval(cancelId);
  }, []);

  /**
   * Determine and cache the ticker price for the active currency.
   */
  const tickerPriceActiveCurrency = useMemo(() => {
    if (!tickerPrice) {
      return 0;
    }
    return currency === CURRENCY.EUR ? tickerPrice.rateEUR : tickerPrice.rateUSD;
  }, [currency, tickerPrice]);

  /**
   * Calculate and cache new price when something changes.
   */
  const calculatedResult = useMemo(() => {
    if (!amount || !tickerPriceActiveCurrency) {
      return 0;
    }
    return direction === CONVERT_DIR.FROM_BTC ? amount * tickerPriceActiveCurrency : amount / tickerPriceActiveCurrency;
  }, [amount, direction, tickerPriceActiveCurrency]);


  return (
    <div className="converter-block-result bg-white text-center px-3 py-3 my-3">
      {!!tickerPrice &&
        (<div>
          <h3>
            {direction === CONVERT_DIR.TO_BTC && <>{currency === 'EUR' ? '€' : '$'} {amount} = {roundFilter(calculatedResult, 5, 'en')} BTC</>}
            {direction !== CONVERT_DIR.TO_BTC && <>{amount} BTC
              = {roundFilter(calculatedResult, 2, 'en')} {currency === 'EUR' ? '€' : '$'}</>}
          </h3>
          <p className="mb-0">
            <small className="text-muted"></small>
          </p>
          <p className="mb-0">
            <small className="text-muted">
              Last update at
              {timeFilter(tickerPrice.updated)} {dateFilter(tickerPrice.updated, 'en')}, 1 BTC =
              {currency}
              {roundFilter(tickerPriceActiveCurrency, 2, 'en')} (buy)
            </small>
          </p>
        </div>)}

      {loadingStatus === LOADING_STATUS.LOADING && (<div>
        Loading/updating exchange rates...
      </div>)}

      {loadingError && (<div className="alert alert-danger mb-0" role="alert">
        {loadingError}
      </div>)}
    </div>
  );
}

ConversionResult.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  direction: PropTypes.object.isRequired
};
