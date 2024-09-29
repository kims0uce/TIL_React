import { calculateInvestmentResults, formatter } from "@/util/investment.js";
import { useState } from "react";

export default function ResultTable({ values }) {
  const resultData = calculateInvestmentResults(values);
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Investment Value</th>
          <th scope="col">Interest (Year)</th>
          <th scope="col">Total Interest</th>
          <th scope="col">Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultData.map((data) => {
          const totalInterest =
            data.valueEndOfYear -
            data.annualInvestment * data.year -
            initialInvestment;
          const totalAmountInvested = data.valueEndOfYear - totalInterest;

          // 왜 여기서 리턴 한번 더 해주는지 ,, ? ?
          return (
            <tr key={data.year}>
              <td>{data.year}</td>
              <td>{formatter.format(data.valueEndOfYear)}</td>
              <td>{formatter.format(data.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
