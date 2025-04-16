export function sendNotifications(title, message, requestId) {
  fetch(
    'https://pushnotificationsserver-production.up.railway.app/send-specific-notification?title= ' +
      title +
      ' &message=' +
      message +
      '&requestId=' +
      requestId
  );
}
