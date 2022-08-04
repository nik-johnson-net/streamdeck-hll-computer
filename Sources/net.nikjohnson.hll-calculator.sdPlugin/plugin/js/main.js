function log(msg) {
  console.log(msg);
  window.$SD.api.logMessage(null, {message: msg});
}

(function () {
  // Cache all active contexts.
  let contexts = {}
  console.log('init hll');

  // Register all event handlers
  window.$SD.on('willAppear', function(event) {
    console.log("willAppear", event);
    // If this is a new object, create it and cache it.
    if (!contexts.hasOwnProperty(event.context)) {
      switch (event.action) {
        case 'net.nikjohnson.hll-calculator.actionnumberinput':
          contexts[event.context] = new ActionNumberValue(event.context, {});
          break;
        default:
          log('WARN -- Looks like unknown action', event.action);
          return;
      }
    }
    const action = contexts[event.context];
    action.onWillAppear(event.payload);
  });

  window.$SD.on('willDisappear', function(event) {
    console.log("willDisappear", event);
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onWillDisappear(event.payload);
  });

  window.$SD.on('keyDown', function(event) {
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onKeyDown(event.payload);
  });

  window.$SD.on('keyUp', function(event) {
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onKeyUp(event.payload);
  });

  window.$SD.on('didReceiveSettings', function(event) {
    console.log('didReceiveSettings', event);
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onDidReceiveSettings(event.payload);
  });

  window.$SD.on('sendToPlugin', function(event) {
    console.log("sendToPlugin", event);
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onSendToPlugin(event.payload);
  });
  console.log('finish init hll');
})();
