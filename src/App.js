import React, { useState } from 'react';
import './App.css';

function App() {
  const [distance, setDistance] = useState('');
  const [gasolineConsumption, setGasolineConsumption] = useState('');
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [etanolConsumption, setEtanolConsumption] = useState('');
  const [etanolPrice, setEtanolPrice] = useState('');
  const [calculationResult, setCalculationResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    const distanceValue = parseFloat(distance);
    const gasolineConsumptionValue = parseFloat(gasolineConsumption);
    const gasolinePriceValue = parseFloat(gasolinePrice);
    const etanolConsumptionValue = parseFloat(etanolConsumption);
    const etanolPriceValue = parseFloat(etanolPrice);

    const compensationCalculationGasoline =
      gasolinePriceValue * (distanceValue / gasolineConsumptionValue);
    const compensationCalculationEtanol =
      etanolPriceValue * (distanceValue / etanolConsumptionValue);

    let calculatePercentage = 0;
    let chosenFuel = '';

    if (compensationCalculationGasoline > compensationCalculationEtanol) {
      calculatePercentage =
        ((compensationCalculationGasoline - compensationCalculationEtanol) /
          compensationCalculationGasoline) *
        100;
      chosenFuel = 'Etanol';
    } else {
      calculatePercentage =
        ((compensationCalculationEtanol - compensationCalculationGasoline) /
          compensationCalculationEtanol) *
        100;
      chosenFuel = 'Gasolina';
    }

    const resultMessage = (
      <>
        Gasolina: {compensationCalculationGasoline.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br />
        Etanol: {compensationCalculationEtanol.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br />
        Economia de {calculatePercentage.toFixed(0)}% com {chosenFuel}
      </>
    );    

    clearInputs();
    setCalculationResult(resultMessage);
    setShowResult(true);
  };

  const clearInputs = () => {
    setDistance('');
    setGasolineConsumption('');
    setGasolinePrice('');
    setEtanolConsumption('');
    setEtanolPrice('');
  };

  return (
    <main className="app">
      <h1 className="title-app">
        Calculadora de Eficiência de Combustível: Etanol e Gasolina
      </h1>

      <div className="input-group">
        <label htmlFor="distance">Informe a Distância a Percorrer (em Km)</label>
        <input
          id="distance"
          type="number"
          placeholder="Digite os Km"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          min={1}
        />
      </div>

      <div className="content">
        <div className="content-group">
          <div className="input-group">
            <label htmlFor="gasoline-consumption">
              Consumo de Gasolina (km/l)
            </label>
            <input
              id="gasoline-consumption"
              type="number"
              placeholder="Digite os (km/l)"
              value={gasolineConsumption}
              onChange={(e) => setGasolineConsumption(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="gasoline-price">Preço da Gasolina</label>
            <input
              id="gasoline-price"
              type="number"
              placeholder="Digite o preço"
              value={gasolinePrice}
              onChange={(e) => setGasolinePrice(e.target.value)}
            />
          </div>
        </div>

        <div className="content-group">
          <div className="input-group">
            <label htmlFor="etanol-consumption">
              Consumo de Etanol (km/l)
            </label>
            <input
              id="etanol-consumption"
              type="number"
              placeholder="Digite os (km/l)"
              value={etanolConsumption}
              onChange={(e) => setEtanolConsumption(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Preço do Etanol</label>
            <input
              id="etanol-price"
              type="number"
              placeholder="Digite o preço"
              value={etanolPrice}
              onChange={(e) => setEtanolPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {showResult && (
        <p id="calculation-result" className="calculation-result">
          {calculationResult}
        </p>
      )}
  
      <div className="box-button">
        <button
          className="button-calculate"
          id="button-calculate"
          onClick={handleCalculate}
        >
          Calcular
        </button>
      </div>
    </main>
  );
}

export default App;
