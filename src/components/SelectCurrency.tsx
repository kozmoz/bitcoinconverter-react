import {CURRENCY} from '../domain/enums';
import PropTypes from 'prop-types';

// Currencies to choose from.
const currencies = [CURRENCY.EUR, CURRENCY.USD];
const labels = {
  [`${CURRENCY.EUR}`]: 'Euro €',
  [`${CURRENCY.USD}`]: 'Dollar $'
}

interface Props {
  currency: CURRENCY;
  onCurrencyUpdate: (currency: CURRENCY) => void;
}

export function SelectCurrency({currency, onCurrencyUpdate}: Props) {

  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label" htmlFor="currencyField">Currency</label>
      <div className="col-sm-9">
        <select id="currencyField" className="form-control" value={currency}
                onChange={(event) => onCurrencyUpdate(event.currentTarget.value as CURRENCY)}>
          {currencies.map(currency => <option value={currency} key={currency}>{labels[currency]}</option>)}
        </select>
      </div>
    </div>
  );
}

SelectCurrency.propTypes = {
  currency: PropTypes.string.isRequired,
  onCurrencyUpdate: PropTypes.func.isRequired
};

