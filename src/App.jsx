import { useState } from 'react';
import { layouts, meals, maxPassengers, getSeatInfo, getBookedSeats } from './data/data.js';
import Passengers from './components/Passengers';
import SeatMap from './components/SeatMap';
import Summary from './components/Summary';
import Tickets from './pages/Tickets';
import './App.css';

function App() {
  const [passengers, setPassengers] = useState([
    { seat: null, meal: meals[0] },
    { seat: null, meal: meals[0] },
  ]);
  const [activeIdx, setActiveIdx] = useState(0); // which passenger is picking a seat right now
  const [layout, setLayout] = useState('3-2');
  const [showTickets, setShowTickets] = useState(false);
  const [bookedSeats] = useState(getBookedSeats);
  // TODO: add passenger name field later
  const changeCount = (count) => {
    if (count < 1 || count > maxPassengers) return;

    const copy = [...passengers];
    if (count < copy.length) {
      copy.length = count;
    } else {
      while (copy.length < count) {
        copy.push({ seat: null, meal: meals[0] });
      }
    }
    setPassengers(copy);

    // if we removed the active passenger, reset back to the first one
    if (activeIdx >= count) {
      setActiveIdx(0);
    }
  };

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
    const cols = layouts[newLayout].groups.flat();
    // clear seat if that column letter doesn't exist in the switched layout
    const updated = passengers.map((p) => {
      if (!p.seat) return p;
      const col = p.seat.slice(-1); // e.g. '4A' -> 'A'
      if (cols.includes(col)) return p;
      return { ...p, seat: null };
    });
    setPassengers(updated);
  };

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    // unselect if clicking the same seat again
    if (passengers[activeIdx].seat === seatId) {
      const updated = passengers.map((p, i) =>
        i === activeIdx ? { ...p, seat: null } : p
      );
      setPassengers(updated);
      return;
    }

    // give seat to active passenger, and clear it from anyone else who had it
    const updated = passengers.map((p, i) => {
      if (i === activeIdx) return { ...p, seat: seatId };
      if (p.seat === seatId) return { ...p, seat: null };
      return p;
    });
    setPassengers(updated);

    // move focus to next passenger without a seat
    const next = updated.findIndex((p) => !p.seat);
    if (next !== -1) {
      setActiveIdx(next);
    }
  };

  const removeSeat = (index) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], seat: null };
    setPassengers(updated);
  };

  const changeMeal = (index, mealName) => {
    const meal = meals.find((m) => m.name === mealName) || meals[0];
    const updated = [...passengers];
    updated[index] = { ...updated[index], meal };
    setPassengers(updated);
  };

  // add up seat and meal charges for all passengers
  let seatTotal = 0;
  let mealTotal = 0;
  for (let p of passengers) {
    if (p.seat) {
      seatTotal += getSeatInfo(p.seat, layout).price;
    }
    mealTotal += p.meal.price;
  }

  const total = seatTotal + mealTotal;
  const assignedCount = passengers.filter((p) => p.seat !== null).length;
  const allSelected = assignedCount === passengers.length;

  const handleSubmit = () => {
    if (!allSelected) {
      alert(`Please select seats for all ${passengers.length} passengers first.`);
      return;
    }
    setShowTickets(true);
  };

  // show boarding passes once booking is submitted
  if (showTickets) {
    return (
      <Tickets
        passengers={passengers}
        layout={layout}
        total={total}
        onBack={() => setShowTickets(false)}
      />
    );
  }

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <h2>✈️ Flight Seat Selection</h2>
          <p>Flight 6E-204 | New Delhi (DEL) -&gt; Mumbai (BOM)</p>
        </div>

        <div className="tabs">
          {Object.keys(layouts).map((key) => (
            <button
              key={key}
              className={`tab-btn ${layout === key ? 'active' : ''}`}
              onClick={() => changeLayout(key)}
            >
              {layouts[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="main-grid">
        <div className="passengers-area">
          <Passengers
            passengers={passengers}
            activeIdx={activeIdx}
            layout={layout}
            onCountChange={changeCount}
            onSelect={setActiveIdx}
            onRemoveSeat={removeSeat}
            onMealChange={changeMeal}
          />
        </div>

        <div className="seats-area">
          <SeatMap
            layout={layout}
            passengers={passengers}
            activeIdx={activeIdx}
            bookedSeats={bookedSeats}
            onSeatClick={handleSeatClick}
          />
        </div>

        <div className="summary-area">
          <Summary
            seatTotal={seatTotal}
            mealTotal={mealTotal}
            total={total}
            assignedCount={assignedCount}
            passengerCount={passengers.length}
            allSelected={allSelected}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
