import { meals, maxPassengers, getSeatInfo } from '../data/data.js';

function Passengers({
  passengers,
  activeIdx,
  layout,
  onCountChange,
  onSelect,
  onRemoveSeat,
  onMealChange,
}) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Passengers</h3>
        <div className="stepper">
          <button
            disabled={passengers.length <= 1}
            onClick={() => onCountChange(passengers.length - 1)}
          >
            -
          </button>
          <span>{passengers.length}</span>
          <button
            disabled={passengers.length >= maxPassengers}
            onClick={() => onCountChange(passengers.length + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="passengers-list">
        {passengers.map((p, idx) => {
          const isSelected = activeIdx === idx;
          const seatInfo = p.seat ? getSeatInfo(p.seat, layout) : null;

          return (
            <div
              key={idx}
              className={`pax-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelect(idx)}
            >
              <div className="pax-top">
                <strong>Passenger {idx + 1}</strong>
                {isSelected ? (
                  <span className="badge-active">Selecting Seat...</span>
                ) : (
                  <span className="badge-hint">Click to Select</span>
                )}
              </div>

              <div className="pax-info">
                <div className="info-row">
                  <span>Seat:</span>
                  {p.seat ? (
                    <span>
                      <strong>{p.seat}</strong> ({seatInfo.type} -{' '}
                      {seatInfo.price === 0 ? 'Free' : `₹${seatInfo.price}`})
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          // stop click from selecting the card underneath
                          e.stopPropagation();
                          onRemoveSeat(idx);
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ) : (
                    <span className="muted">Not selected</span>
                  )}
                </div>

                <div className="info-row">
                  <span>Meal:</span>
                  <select
                    value={p.meal.name}
                    // keep dropdown click from switching active passenger
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onMealChange(idx, e.target.value)}
                  >
                    {meals.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name} {item.price > 0 ? `(+₹${item.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Passengers;
