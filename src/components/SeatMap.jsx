import { rows, exitRows, layouts, getSeatInfo } from '../data/data.js';

function SeatMap({ layout, passengers, activeIdx, bookedSeats, onSeatClick }) {
  const groups = layouts[layout].groups;

  return (
    <>
      <div className="legend">
        <span className="legend-item seat-standard">Standard (₹0)</span>
        <span className="legend-item seat-premium">Premium (₹250)</span>
        <span className="legend-item seat-legroom">Extra Legroom (₹350)</span>
        <span className="legend-item seat-current">Selected</span>
        <span className="legend-item seat-occupied">Occupied</span>
      </div>

      <div className="plane-wrap">
        <div className="plane">
          <div className="cockpit">FRONT / COCKPIT</div>

          {/* column letters at the top like A B C | D E */}
          <div className="seat-row col-labels">
            {groups.map((group, gIdx) => (
              <div key={gIdx} className="group-wrap">
                {gIdx > 0 && <div className="aisle" />}
                <div className="seat-group">
                  {group.map((col) => (
                    <span key={col}>{col}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {rows.map((row) => {
            const isExit = exitRows.includes(row);

            return (
              <div key={row} className="row-wrap">
                {/* show exit divider above exit rows */}
                {isExit && (
                  <div className="exit-bar">
                    <span className="exit-line" />
                    <span className="exit-tag">EXIT</span>
                    <span className="exit-line" />
                  </div>
                )}

                <div className="seat-row">
                  {groups.map((group, gIdx) => (
                    <div key={gIdx} className="group-wrap">
                      {gIdx > 0 && <div className="aisle">{row}</div>}
                      <div className="seat-group">
                        {group.map((col) => {
                          const seatId = `${row}${col}`;
                          const isBooked = bookedSeats.includes(seatId);
                          const paxIdx = passengers.findIndex((p) => p.seat === seatId);
                          const isPicked = paxIdx !== -1;
                          const isCurrent = isPicked && paxIdx === activeIdx;
                          const info = getSeatInfo(seatId, layout);

                          // pick color class depending on seat type or booking status
                          let seatClass = 'seat-standard';
                          if (info.type === 'Premium') seatClass = 'seat-premium';
                          if (info.type === 'Extra Legroom') seatClass = 'seat-legroom';
                          if (isBooked) seatClass = 'seat-occupied';
                          if (isPicked) seatClass = isCurrent ? 'seat-current' : 'seat-selected';

                          // show P1/P2 if selected, X if booked, otherwise seat price
                          let label = info.price === 0 ? 'Free' : `₹${info.price}`;
                          if (isBooked) label = 'x';
                          if (isPicked) label = `P${paxIdx + 1}`;
                          return (
                            <button
                              key={seatId}
                              disabled={isBooked}
                              className={`seat ${seatClass}`}
                              onClick={() => onSeatClick(seatId)}
                              title={`${seatId} - ${info.type}`}
                            >
                              <span className="seat-id">{seatId}</span>
                              <span className="seat-cost">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="tail">BACK OF AIRCRAFT</div>
        </div>
      </div>
    </>
  );
}

export default SeatMap;
