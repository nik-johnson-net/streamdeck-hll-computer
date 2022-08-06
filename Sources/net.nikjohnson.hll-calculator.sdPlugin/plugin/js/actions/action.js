class Action {
    constructor(context, settings) {
        this.context = context;
        this.settings = {
            ...defaultSettings(),
            ...settings
        };
    }

    defaultSettings() {
        return {};
    }

    onKeyUp(_) {}
    
    onKeyDown(_) {}
    
    onWillAppear(payload) {
        settings = payload.settings;
    }

    onWillDisappear(_) {}

    onDidReceiveSettings(payload) {
        settings = payload.settings;
    }
} 