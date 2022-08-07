class Action {
    constructor(context, settings) {
        this.context = context;
        this.settings = {
            ...this.defaultSettings(),
            ...settings
        };
    }

    defaultSettings() {
        return {};
    }

    showOk() {
        window.$SD.api.showOk(this.context);
    }

    showAlert() {
        window.$SD.api.showAlert(this.context);
    }

    setTitle(title) {
        window.$SD.api.setTitle(this.context, title);
    }

    onKeyUp(_) {}
    
    onKeyDown(_) {}
    
    onWillAppear(payload) {
        this.settings = {
            ...this.defaultSettings(),
            ...payload.settings
        };
    }

    onWillDisappear(_) {}

    onDidReceiveSettings(payload) {
        this.settings = {
            ...this.defaultSettings(),
            ...payload.settings
        };
    }
}