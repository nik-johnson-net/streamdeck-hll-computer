function ActionNumberValue(initContext, initSettings) {
    let instance = this;
    let context = initContext;
    let settings = initSettings;

    this.context = function() {
        return context;
    }

    this.settings = function() {
        return settings;
    }

    this.onKeyUp = function(payload) {
        payload.settings
    }

    this.onKeyDown = function(payload) {}

    this.onWillAppear = function(payload) {
        settings = payload.settings;
    }

    this.onWillDisappear = function(payload) {}

    this.onDidReceiveSettings = function(payload) {
        settings = payload.settings;
        window.$SD.api.setTitle(context, settings.value);
    }
}
