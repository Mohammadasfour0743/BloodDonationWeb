const rows = [0, 1, 2, 3, 4, 5, 6];

export function DonationHistoryTableView() {
  return (
    <div>
      <h1>Donation History</h1>
      {rows
        .filter((val) => {
          return val % 2 === 0;
        })
        .map((value) => (
          <div>Row {value}</div>
        ))}
    </div>
  );
}
