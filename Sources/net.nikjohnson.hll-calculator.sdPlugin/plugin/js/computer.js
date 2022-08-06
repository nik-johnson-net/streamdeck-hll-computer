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
        if (!Computer.acceptedModes.includes(mode)) {
            console.warn('Invalid mode given to Computer.setMode:', mode);
            return false;
        }
        console.log('Setting computer mode to', mode);
        this.computerMode = mode;
        this.reset();
        return true;
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
            meters: this.currentInput,
            mils: this._computeMeterToMils(this.currentInput)
        };

        this._pushToBuffer(computation);
        this.clear();
        this._updateComputedValueActions();
    }

    reset() {
        this.clear();
        this.computerHistory = [];
        this._updateComputedValueActions();
    }

    clear() {
        this.currentInput = 0;
        this.currentDigits = 0;
        this._updateInputBufferActions();
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
        for (const action of Object.values(this.inputBufferActions)) {
            action.displayValue(this.currentInput);
        }
    }

    _updateComputedValueActions() {
        for (const action of Object.values(this.computedValueActions)) {
            this._updateComputedValueAction(action);
        }
    }

    _updateComputedValueAction(action) {
        const historyLevel = action.settings.historyLevel;
        // historyLevel is 1-indexed. Arrays are 0-indexed.
        const pastComputation = this.computerHistory[historyLevel-1];
        console.log('Updating Computed Value action', action.context, 'with history level', historyLevel, 'to past computation', pastComputation);
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
        const result = (m*meters) + b;
        return Math.round(result);
    }

    _pushToBuffer(computation) {
        this.computerHistory.unshift(computation);
        if (this.computerHistory.length > Computer.computerMaxHistory) {
            this.computerHistory.pop();
        }
    }
}
