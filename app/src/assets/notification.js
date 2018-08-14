var path = require('path');
const notifier = require('node-notifier');
function notification(title,message){
  notifier.notify(
          {
            title: title,
            message: message,
            icon: path.join(__dirname + '/src/assets/img/favicon/8-layer-logo-v3.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true, // Wait with callback, until user action is taken against notification
            type: 'info'
          },
          function (err, response) {
            // Response is response from notification
          }
        );

        notifier.on('click', function (notifierObject, options) {

        });

        notifier.on('timeout', function (notifierObject, options) {
          // Triggers if `wait: true` and notification closes
        });
}

