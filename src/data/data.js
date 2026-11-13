export const rows = [1, 2, 3, 4, 5, 6];
export const exitRows = [1, 4]; // 1st and 4th row are exit rows
export const maxPassengers = 6;

// seat groups split by aisle + seats that are free in each layout
export const layouts = {
  '3-2': {
    label: '3-2 Layout',
    groups: [
      ['A', 'B', 'C'],
      ['D', 'E'],
    ],
    freeSeats: ['2B', '3B', '5B', '5C', '6B', '6D'],
  },
  '2-3-2': {
    label: '2-3-2 Layout',
    groups: [
      ['A', 'B'],
      ['D', 'E', 'F'],
      ['G', 'H'],
    ],
    freeSeats: ['2E', '3E', '5E', '5F', '6B', '6E', '6G'],
  },
};

export const meals = [
  { name: 'No Meal', price: 0 },
  { name: 'Complimentary Snack (Free)', price: 0 },
  { name: 'Veg Thali', price: 200 },
  { name: 'Chicken Biryani', price: 250 },
  { name: 'Fruit Platter', price: 150 },
];

export function getSeatInfo(seatId, layout = '3-2') {
  const row = parseInt(seatId);

  // exit rows always cost extra regardless of column
  if (exitRows.includes(row)) {
    return { type: 'Extra Legroom', price: 350 };
  }

  const free = layouts[layout].freeSeats;
  if (free.includes(seatId)) {
    return { type: 'Standard', price: 0 };
  }

  return { type: 'Premium', price: 250 };
}

// pick 10 random seats on page load so some seats look already booked
export function getBookedSeats() {
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const list = [];

  for (let r of rows) {
    for (let c of cols) list.push(r + c);
  }

  const booked = [];

  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * list.length);

    booked.push(list.splice(idx, 1)[0]);
  }

  return booked;
}
