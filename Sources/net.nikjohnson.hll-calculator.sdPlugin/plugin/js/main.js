function log(msg) {
  console.log(msg);
  window.$SD.api.logMessage(null, {message: msg});
}

function loadImages() {
  const futures = ["zero.svg", "one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg", "seven.svg", "eight.svg", "nine.svg"].map(name => {
    return Utils.getData("images/" + name).then(value => {
      return [name, "data:image/svg+xml;charset=utf8," + value];
    });
  });
  return Promise.all(futures)
    .then((values) => {
      return Object.fromEntries(values);
    })
    .catch((err) => console.error("error loading images:", err));
}

function initializePlugin(imageCache) {
   // Cache all active contexts.
   let contexts = {};

   // Initialize Computer
   let computer = new Computer();

  // Register all event handlers
  window.$SD.on('willAppear', function(event) {
    console.log("willAppear", event);
    // If this is a new object, create it and cache it.
    if (!contexts.hasOwnProperty(event.context)) {
      switch (event.action) {
        case 'net.nikjohnson.hll-calculator.actionnumberinput':
          contexts[event.context] = new ActionNumberValue(event.context, {}, computer, imageCache);
          break;
        case 'net.nikjohnson.hll-calculator.actioninputbuffer':
          contexts[event.context] = new ActionInputBuffer(event.context, {}, computer);
          break;
        case 'net.nikjohnson.hll-calculator.actioncomputedvalue':
          contexts[event.context] = new ActionComputedValue(event.context, {}, computer);
          break;
        case 'net.nikjohnson.hll-calculator.actionmodechange':
          contexts[event.context] = new ActionModeChange(event.context, {}, computer);
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
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onDidReceiveSettings(event.payload);
  });

  window.$SD.on('sendToPlugin', function(event) {
    if (!contexts.hasOwnProperty(event.context)) {
      log('WARN -- Looks like unknown context ' + event.context + 'got event' + event.event);
      return;
    }
    const action = contexts[event.context];
    action.onSendToPlugin(event.payload);
  });
  console.log('finish init hll');
}

(function () {
  console.log('init hll');
  loadImages().then((imageCache) => {
    initializePlugin(imageCache);
  });
})();
