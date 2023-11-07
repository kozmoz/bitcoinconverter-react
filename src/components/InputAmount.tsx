import PropTypes from "prop-types";
import {FormEvent, useState} from 'react';
import {UtilityService} from '../services/UtilityService.ts';

interface Props {
  currency: string;
  amount: number;
  onAmountUpdate: (value: number) => void;
}

export function InputAmount({currency, amount, onAmountUpdate}: Props) {

  // Store amount as string to allow for invalid input.
  const [tmpAmount, setTmpAmount] = useState(`${amount}`);

  /**
   * Convert amount to number/0 and emit an update event.
   * @param event Input event
   */
  function updateAmount(event: FormEvent<HTMLInputElement>): void {
    const newValue = (event.target as HTMLInputElement).value;
    setTmpAmount(newValue);
    onAmountUpdate(UtilityService.isNumeric(newValue) || 0);
  }

  /**
   * Test if given value is valid.
   */
  function isInvalid(): boolean {
    return !!(tmpAmount && !UtilityService.isNumeric(tmpAmount));
  }

  return (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label" htmlFor="amount">Amount</label>
      <div className="col-sm-9">
        <div className="input-group w-75">
          <div className="input-group-prepend">
            <span className="input-group-text">{currency === 'EUR' ? '€' : '$'}</span>
          </div>

          <input
            id="amount"
            type="text"
            value={tmpAmount}
            maxLength={10}
            className={`form-control ${isInvalid() && 'is-invalid'}`}
            onInput={updateAmount}
          />

          {isInvalid() && <div className="invalid-feedback">
            Only numbers are allowed
          </div>}

        </div>
        <small className="form-text text-muted">The amount should be an integer</small>
      </div>
    </div>
  );
}

InputAmount.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};
