export default function howLongAgo({ day, month, year }, moment) {
  const dateObject = new Date(
    `${year}/${month}/${day}`,
  );
  const dateString = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return moment(dateString).fromNow();
}
