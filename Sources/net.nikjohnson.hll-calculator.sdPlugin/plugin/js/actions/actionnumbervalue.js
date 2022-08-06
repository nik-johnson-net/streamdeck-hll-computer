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

class ActionNumberValue extends Action {
    constructor(context, settings, computer, imageCache) {
        super(context, settings)
        this.computer = computer;
        this.imageCache = imageCache;
    }

    onKeyUp(_payload) {
        // Send this button's value to the computer input. If the computer refuses the input,
        // show an alert.
        if (!computer.enterDigit(settings.value)) {
            window.$SD.api.showAlert(this.context);
        };
    }

    onWillAppear(payload) {
        super.onWillAppear(payload);
        this.setIcon();
    }

    onDidReceiveSettings(payload) {
        super.onDidReceiveSettings(payload);
        this.setIcon();
    }

    setIcon() {
        const imageName = _valueToImage[this.settings.value];
        const image = this.imageCache[imageName];
        window.$SD.api.setImage(this.context, image);
    }

    defaultSettings() {
        return {
            value: 0
        };
    }
}
