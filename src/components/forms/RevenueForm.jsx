import TransactionForm from "./TransactionForm";

function RevenueForm({
  months,
  onSave,
  onCancel,
  showMonthSelect = true,
  defaultMonth = "Janeiro",
  initialValues = null,
}) {
  return (
    <TransactionForm
      buttonText={initialValues ? "Salvar alterações" : "Salvar Receita"}
      months={months}
      onSave={onSave}
      onCancel={onCancel}
      showMonthSelect={showMonthSelect}
      defaultMonth={defaultMonth}
      initialValues={initialValues}
    />
  );
}

export default RevenueForm;
