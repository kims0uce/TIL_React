import { calculateInvestmentResults, formatter } from "@/util/investment.js";

export default function ResultTable({ values }) {
  console.log(values);
  console.log(calculateInvestmentResults(values));
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
        {calculateInvestmentResults(values).map((data) => (
          <tr key={data.year}>
            <td>{data.year}</td>
            <td>{formatter.format(data.valueEndOfYear)}</td>
            <td>{formatter.format(data.interest)}</td>
            <td>{formatter.format(data.year)}</td>
            <td>{formatter.format(data.annualInvestment)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
