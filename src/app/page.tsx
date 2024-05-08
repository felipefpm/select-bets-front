'use client'

import { useState } from "react";

export default function Home() {
  const [totalBets, setTotalBets] = useState(0)

  fetch('http://localhost:3333/bet/count')
    .then(response => response.json())
    .then(data => setTotalBets(data.count))

  return (
    <>
      <h1>Select Bets</h1>
      <h2>Total de apostas: {totalBets}</h2>
    </>
  );
}
