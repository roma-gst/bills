import TransactionForm from "./TransactionForm";

function ExpenseForm({
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
}) {
  return (
    <TransactionForm
      buttonText="Salvar Despesa"
      months={months}
      onSave={onSave}
      onCancel={onCancel}
      showMonthSelect={showMonthSelect}
      defaultMonth={defaultMonth}
    />
  );
}

export default ExpenseForm;
