import BoardingPass from '../components/BoardingPass';

function Tickets({ passengers, layout, total, onBack }) {
  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <span className="status-tag">BOOKING CONFIRMED</span>
        <h2>Boarding Pass Issued</h2>
        <p>Flight 6E-204 | New Delhi (DEL) -&gt; Mumbai (BOM)</p>
      </div>

      {/* render one boarding pass card per passenger */}
      <div className="tickets-grid">
        {passengers.map((p, idx) => (
          <BoardingPass key={idx} passenger={p} index={idx} layout={layout} />
        ))}
      </div>

      <div className="bottom-bar">
        <div className="fare-box">
          <span className="fare-label">TOTAL FARE PAID</span>
          <div className="fare-row">
            <span className="fare-total">₹{total}</span>
            <span className="paid-tag">Confirmed</span>
          </div>
        </div>

        <button className="back-btn" onClick={onBack}>
          ← Change Seats
        </button>
      </div>
    </div>
  );
}

export default Tickets;
