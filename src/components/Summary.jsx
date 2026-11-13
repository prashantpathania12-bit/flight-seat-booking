function Summary({
  seatTotal,
  mealTotal,
  total,
  assignedCount,
  passengerCount,
  allSelected,
  onSubmit,
}) {
  return (
    <div className="card summary-card">
      <h3>Price Summary</h3>
      <div className="price-row">
        <span>Seat Selection ({assignedCount}/{passengerCount}):</span>
        <span>₹{seatTotal}</span>
      </div>
      <div className="price-row">
        <span>Meal Charges:</span>
        <span>₹{mealTotal}</span>
      </div>
      <div className="divider"></div>
      <div className="price-row total">
        <strong>Total Amount:</strong>
        <strong>₹{total}</strong>
      </div>

      {/* turns green once all passengers have a seat */}
      <button
        className={`submit-btn ${allSelected ? 'ready' : ''}`}
        onClick={onSubmit}
      >
        {allSelected
          ? `Submit & View Tickets (₹${total})`
          : `Select Seats (${assignedCount}/${passengerCount} Assigned)`}
      </button>
    </div>
  );
}

export default Summary;
