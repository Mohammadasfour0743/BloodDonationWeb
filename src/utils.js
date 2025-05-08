export function sortByDate(requests) {
  function compareDates(a, b) {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  }
  return requests.sort(compareDates);
}
