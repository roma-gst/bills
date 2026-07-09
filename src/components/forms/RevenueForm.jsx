import TransactionForm from "./TransactionForm";

function RevenueForm({
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
}) {
  return (
    <TransactionForm
      buttonText="Salvar Receita"
      months={months}
      onSave={onSave}
      onCancel={onCancel}
      showMonthSelect={showMonthSelect}
      defaultMonth={defaultMonth}
    />
  );
}

export default RevenueForm;
