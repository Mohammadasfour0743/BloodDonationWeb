export function sendNotifications(userid, title, message, requestId) {
  fetch(
    'https://pushnotificationsserver-production.up.railway.app/send-notification?userid=' +
      userid +
      '&title= ' +
      title +
      ' &message=' +
      message +
      '&requestId=' +
      requestId
  );
}
