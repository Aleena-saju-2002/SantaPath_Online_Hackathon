function Progress() {
  const day = Number(localStorage.getItem("day") || 1);

  return (
    <div>
      <h3>Your Progress 🎄</h3>
      <p>Completed: {day - 1} / 24 days</p>
    </div>
  );
}

export default Progress;
