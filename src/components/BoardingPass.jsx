import { getSeatInfo } from '../data/data.js';
import barcodeSvg from '../assets/barcode.svg';

function BoardingPass({ passenger, index, layout }) {

  const seatId = passenger.seat || 'N/A';
  const info = getSeatInfo(seatId, layout);
  const pnr = `6E${7410 + index}K`; // simple dummy PNR per passenger

  return (
    <div className="ticket">
      <div className="ticket-left">
        <div className="ticket-top">
          <div>
            <span className="airline">INDIGO</span>
            <span className="flight-no">6E-204</span>
          </div>
          <span className="pnr">
            PNR: <strong>{pnr}</strong>
          </span>
        </div>

        <div className="route-box">
          <div className="city">
            <h4>DEL</h4>
            <p>New Delhi</p>
          </div>
          <div className="route-mid">
            <span>✈</span>
            <small>2h 10m Non-stop</small>
          </div>
          <div className="city">
            <h4>BOM</h4>
            <p>Mumbai</p>
          </div>
        </div>

        <div className="ticket-info">
          <div>
            <label>PASSENGER</label>
            <strong>Passenger {index + 1}</strong>
          </div>
          <div>
            <label>GATE / TIME</label>
            <strong>T3 / 10:30 AM</strong>
          </div>
          <div>
            <label>MEAL</label>
            <strong>{passenger.meal.name}</strong>
          </div>
          <div>
            <label>CLASS</label>
            <strong>Economy ({layout})</strong>
          </div>
        </div>
      </div>

      {/* dotted tear line between main ticket and stub */}
      <div className="tear-line">
        <div className="notch top"></div>
        <div className="dashed"></div>
        <div className="notch bottom"></div>
      </div>

      {/* right side tear-off stub */}
      <div className="ticket-right">
        <span className="stub-label">BOARDING PASS</span>
        <div className="stub-seat">
          <span className="seat-big">{seatId}</span>
          <span className="seat-type">{info.type}</span>
        </div>
        <div className="stub-price">
          {info.price === 0 ? 'Seat: Free' : `Seat: ₹${info.price}`}
          {passenger.meal.price > 0 && <span> + Meal ₹{passenger.meal.price}</span>}
        </div>

        <div className="barcode-box">
          <img src={barcodeSvg} alt="barcode" className="barcode-img" />
          <span className="barcode-text">
            {seatId} • {pnr}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoardingPass;
