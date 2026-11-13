# Flight Seat Booking

A simple React app for picking flight seats and meals for multiple passengers. After selecting seats for everyone, it shows a boarding pass view with the total price.

## Features
- Add or remove passengers (up to 6)
- Switch between 3-2 and 2-3-2 plane layouts
- Color-coded seats (Standard, Premium, Extra Legroom, Occupied)
- Pick a meal for each passenger
- Live price breakdown for seats and meals
- Boarding pass summary page after submitting

## Tech Used
- React JS
- Vite
- Plain CSS

## How to Run

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Folder Structure

```text
src/
├── assets/
│   └── barcode.svg
├── components/
│   ├── BoardingPass.jsx
│   ├── Passengers.jsx
│   ├── SeatMap.jsx
│   └── Summary.jsx
├── data/
│   └── data.js
├── pages/
│   └── Tickets.jsx
├── App.css
├── App.jsx
└── main.jsx
```

## Author
- Name: Prashant Pathania
- GitHub: https://github.com/yourusername
- Email: prashantpathania0@gmail.com

