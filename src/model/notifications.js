export function sendNotifications(requestId) {
  fetch('https://pushnotificationsserver-production.up.railway.app/send-specific-notification?requestId=' + requestId);
}
