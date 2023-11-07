import './css/App.css'
import {InputAmount} from './components/InputAmount.tsx';
import {useState} from 'react';
import {SelectCurrency} from './components/SelectCurrency.tsx';
import {CONVERT_DIR, CURRENCY} from './domain/enums.ts';
import {SelectConversionDirection} from './components/SelectConversionDirection.tsx';
import {ConversionResult} from './components/ConversionResult.tsx';

const TITLE: string = "React TypeScript Bitcoin Converter";

export function App() {

  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(CURRENCY.EUR);
  const [direction, setDirection] = useState(CONVERT_DIR.FROM_BTC);

  return (
    <div className="container">
      <div className="row">
        <div className="col converter-block-title text-center text-white">
          <h2>{TITLE}</h2>
        </div>
      </div>

      <div className="row py-3 bg-light">
        <div className="col-sm-12 col-md-6">
          <form noValidate autoComplete="off">

            <SelectCurrency currency={currency} onCurrencyUpdate={newCurrency => setCurrency(newCurrency)}/>

            <SelectConversionDirection currency={currency} direction={direction}
                                       onDirectionUpdate={newDirection => setDirection(newDirection)}/>

            <InputAmount currency={currency} amount={amount} onAmountUpdate={(value) => setAmount(value)}/>

          </form>
        </div>

        <div className="col-sm-12 col-md-6 m-auto bg-light">
          <ConversionResult amount={amount} currency={currency} direction={direction}/>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p>
            Example React TypeScript web application.
          </p>
        </div>
      </div>
    </div>);
}
