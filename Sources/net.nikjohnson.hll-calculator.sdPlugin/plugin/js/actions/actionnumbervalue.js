const _valueToImage = {
    0: "zero.svg",
    1: "one.svg",
    2: "two.svg",
    3: "three.svg",
    4: "four.svg",
    5: "five.svg",
    6: "six.svg",
    7: 'seven.svg',
    8: 'eight.svg',
    9: 'nine.svg'
}

function ActionNumberValue(initContext, initSettings, computer, imageCache) {
    let context = initContext;
    let settings = defaultSettings(initSettings);

    this.context = function() {
        return context;
    }

    this.settings = function() {
        return settings;
    }

    this.onKeyUp = function(_payload) {
        computer.enterDigit(settings.value);
    }

    this.onKeyDown = function(_payload) {}

    this.onWillAppear = function(payload) {
        settings = payload.settings;
        setIcon();
    }

    this.onWillDisappear = function(payload) {}

    this.onDidReceiveSettings = function(payload) {
        settings = payload.settings;
        setIcon();
    }

    function setIcon() {
        const imageName = _valueToImage[settings.value];
        const image = imageCache[imageName];
        window.$SD.api.setImage(context, image);
    }

    function defaultSettings(initSettings) {
        return {
            value: 0,
            ...initSettings
        }
    }
}
