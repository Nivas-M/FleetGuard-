function todayISODate() {
  return new Date().toISOString().split('T')[0];
}

function addDaysISODate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

module.exports = { todayISODate, addDaysISODate };