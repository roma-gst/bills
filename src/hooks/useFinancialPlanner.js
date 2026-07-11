import { useState } from "react";
import yearData from "../data/yearData";

function useFinancialPlanner() {
  const [monthsData, setMonthsData] = useState(yearData);

  function addRevenue({ description, value, month }) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
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
      }),
    );
  }

  function addFixedExpense({ description, value, month }) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
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
      }),
    );
  }

  function updateRevenue(monthName, revenueIndex, updatedRevenue) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
        if (item.nome !== monthName) return item;

        return {
          ...item,
          receitas: item.receitas.map((revenue, index) => {
            if (index !== revenueIndex) return revenue;

            return {
              descricao: updatedRevenue.description,
              valor: Number(updatedRevenue.value),
            };
          }),
        };
      }),
    );
  }

  function updateFixedExpense(monthName, expenseIndex, updatedExpense) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
        if (item.nome !== monthName) return item;

        return {
          ...item,
          despesasFixas: item.despesasFixas.map((expense, index) => {
            if (index !== expenseIndex) return expense;

            return {
              descricao: updatedExpense.description,
              valor: Number(updatedExpense.value),
            };
          }),
        };
      }),
    );
  }

  function removeRevenue(monthName, revenueIndex) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
        if (item.nome !== monthName) return item;

        return {
          ...item,
          receitas: item.receitas.filter((_, index) => index !== revenueIndex),
        };
      }),
    );
  }

  function removeFixedExpense(monthName, expenseIndex) {
    setMonthsData((currentMonths) =>
      currentMonths.map((item) => {
        if (item.nome !== monthName) return item;

        return {
          ...item,
          despesasFixas: item.despesasFixas.filter(
            (_, index) => index !== expenseIndex,
          ),
        };
      }),
    );
  }

  return {
    monthsData,
    addRevenue,
    addFixedExpense,
    updateRevenue,
    updateFixedExpense,
    removeRevenue,
    removeFixedExpense,
  };
}

export default useFinancialPlanner;
