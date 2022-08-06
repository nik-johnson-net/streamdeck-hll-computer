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

    onKeyUp(_) {}
    
    onKeyDown(_) {}
    
    onWillAppear(payload) {
        this.settings = payload.settings;
    }

    onWillDisappear(_) {}

    onDidReceiveSettings(payload) {
        this.settings = payload.settings;
    }
} 