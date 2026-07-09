function SummaryItem({ label, value, className = "" }) {
  return (
    <p className={`text-sm ${className}`}>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

export default SummaryItem;
