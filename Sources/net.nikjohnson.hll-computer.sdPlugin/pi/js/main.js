function renderActionTemplate(name, selectedOption) {
  const elem = document.getElementById("piwrapper");
  const template = document.getElementById("template-" + name);
  
  // Build the template and select the active option
  const newElements = template.content.cloneNode(true);
  const divElem = newElements.childNodes[1];
  const selectElem = divElem.childNodes[3];
  for (const elem of selectElem.childNodes) {
    if (elem.nodeName != "OPTION") {
      continue;
    }

    if (parseInt(elem.getAttribute('value')) == parseInt(selectedOption)) {
      elem.setAttribute('selected', '');
    }
  }

  // Append to UI
  elem.appendChild(newElements);
}

var actions = {
  "net.nikjohnson.hll-computer.actionnumberinput": {
    register(uuid, settings) {
      renderActionTemplate("actionnumberinput", settings.value);

      const actionnumberinputValue = document.getElementById("actionnumberinput-value");
      actionnumberinputValue.onchange = function(evt) {
        window.$SD.api.setSettings(uuid, {value: parseInt(evt.target.value)});
      };
    }
  },
  "net.nikjohnson.hll-computer.actioncomputedvalue": {
    register(uuid, settings) {
      renderActionTemplate("actioncomputedvalue", settings.historyLevel);

      const actioncomputedvalueHistoryLevel = document.getElementById("actioncomputedvalue-historylevel");
      actioncomputedvalueHistoryLevel.onchange = function(evt) {
        window.$SD.api.setSettings(uuid, {historyLevel: parseInt(evt.target.value)});
      };
    }
  }
}

window.$SD.on('connected', function(data) {
  console.log("hll-connector PI connected", data);
  api = actions[data.actionInfo.action];
  api.register(data.uuid, data.actionInfo.payload.settings);
});
