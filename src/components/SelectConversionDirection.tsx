import { CONVERT_DIR, CURRENCY } from '../domain/enums';

const directions = Object.keys(CONVERT_DIR);

interface Props {
  currency: CURRENCY;
  direction: CONVERT_DIR;
  onDirectionUpdate: (direction: CONVERT_DIR) => void;
}

export function SelectConversionDirection({ currency, direction, onDirectionUpdate }:Props) {

  const labels = {
    [`${CONVERT_DIR.FROM_BTC}`]: `Convert from Bitcoin to ${currency}`,
    [`${CONVERT_DIR.TO_BTC}`]: `Convert from ${currency} to Bitcoin`
  }

  return (
    <div className="form-group row">
      <legend className="col-form-label col-sm-3 pt-0">Direction</legend>
      <div className="col-sm-9">
        {directions.map((d) => (
          <div key={d} className="form-check">
            <input
              type="radio"
              value={d}
              id={`direction-${d}`}
              checked={d === `${direction}`}
              className="form-check-input"
              onChange={(event) => onDirectionUpdate(event.currentTarget.value as CONVERT_DIR)}
            />
            <label htmlFor={`direction-${d}`} className="form-check-label">
              {labels[d]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
