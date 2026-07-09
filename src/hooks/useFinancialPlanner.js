import { useState } from "react";
import yearData from "../data/yearData";

function useFinancialPlanner() {
  const [monthsData, setMonthsData] = useState(yearData);

  function addRevenue({ description, value, month }) {
    const updatedMonths = monthsData.map((item) => {
      if (item.nome !== month) return item;

      return {
        ...item,
        receitas: [
          ...item.receitas,
          {
            descricao: description,
            valor: Number(value),
          },
        ],
      };
    });

    setMonthsData(updatedMonths);
  }

  function addFixedExpense({ description, value, month }) {
    const updatedMonths = monthsData.map((item) => {
      if (item.nome !== month) return item;

      return {
        ...item,
        despesasFixas: [
          ...item.despesasFixas,
          {
            descricao: description,
            valor: Number(value),
          },
        ],
      };
    });

    setMonthsData(updatedMonths);
  }

  function removeRevenue(monthName, revenueIndex) {
    const updatedMonths = monthsData.map((item) => {
      if (item.nome !== monthName) return item;

      return {
        ...item,
        receitas: item.receitas.filter((_, index) => index !== revenueIndex),
      };
    });

    setMonthsData(updatedMonths);
  }

  function removeFixedExpense(monthName, expenseIndex) {
    const updatedMonths = monthsData.map((item) => {
      if (item.nome !== monthName) return item;

      return {
        ...item,
        despesasFixas: item.despesasFixas.filter(
          (_, index) => index !== expenseIndex,
        ),
      };
    });

    setMonthsData(updatedMonths);
  }

  return {
    monthsData,
    addRevenue,
    addFixedExpense,
    removeRevenue,
    removeFixedExpense,
  };
}

export default useFinancialPlanner;
