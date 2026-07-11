import TransactionForm from "./TransactionForm";

function ExpenseForm({
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
  initialValues = null,
}) {
  return (
    <TransactionForm
      buttonText={initialValues ? "Salvar alterações" : "Salvar Despesa"}
      months={months}
      onSave={onSave}
      onCancel={onCancel}
      showMonthSelect={showMonthSelect}
      defaultMonth={defaultMonth}
      initialValues={initialValues}
    />
  );
}

export default ExpenseForm;
