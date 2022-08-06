class Computer {
    static acceptedModes = ["american", "german", "russian"];
    static computerMaxHistory = 5;
    static maxDigits = 4;

    constructor() {
        this.currentInput = 0;
        this.currentDigits = 0;
        this.computerHistory = [];

        this.inputBufferActions = {};
        this.computedValueActions = {};

        this.computerMode = "american";
    }

    setMode(mode) {
        // TODO: Sanitize
        this.computerMode = mode;
    }

    enterDigit(value) {
        if (this.currentDigits >= Computer.maxDigits) {
            return false;
        }
        this.currentDigits += 1;
        this.currentInput = (this.currentInput * 10) + value;
        this._updateInputBufferActions();
        return true;
    }

    enter() {
        const computation = {
            meters: currentInput,
            mils: this._computeMeterToMils(currentInput)
        };

        this._pushToBuffer(computation);
        this.clear();
        this._updateComputedValueActions();
    }

    clear() {
        this.currentInput = 0;
        this.currentDigits = 0;
        _updateInputBufferActions();
    }

    deregisterInputBufferAction(action) {
        delete this.inputBufferActions[action.context];
    }

    deregisterComputedValueAction(action) {
        delete this.computedValueActions[action.context];
    }

    registerInputBufferAction(action) {
        this.inputBufferActions[action.context] = action;
        action.displayValue(this.currentInput);
    }

    registerComputedValueAction(action) {
        this.computedValueActions[action.context] = action;
        this._updateComputedValueAction(action);
    }

    _updateInputBufferActions() {
        for (const action of this.inputBufferActions) {
            action.displayValue(this.currentInput);
        }
    }

    _updateComputedValueActions() {
        for (const action of this.computedValueActions) {
            this._updateComputedValueAction(action);
        }
    }

    _updateComputedValueAction(action) {
        const historyLevel = action.settings.historyLevel;
        // historyLevel is 1-indexed. Arrays are 0-indexed.
        const pastComputation = this.computerHistory[historyLevel-1];
        if (pastComputation === undefined) {
            action.displayComputation('', '');
        } else {
            action.displayComputation(pastComputation.meters, pastComputation.mils);
        }
    }

    _computeMeterToMils(meters) {
        // Guns follow a standard linear formula (y=mx+b)
        let m = 0;
        let b = 0;

        switch (this.computerMode) {
            case "american":
            case "german":
                m = -0.2370882353;
                b = 1001.525;
                break;
            case "russian":
                m = -0.2133823529;
                b = 1141.375;
                break;
        }
        return (m*x) + b;
    }

    _pushToBuffer(computation) {
        this.computerHistory.unshift(computation);
        if (this.computerHistory.length > Computer.computerMaxHistory) {
            this.computerHistory.pop();
        }
    }
}
