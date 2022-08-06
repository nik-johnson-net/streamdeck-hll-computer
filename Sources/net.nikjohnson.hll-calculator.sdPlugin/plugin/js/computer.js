function Computer() {
    let currentInput = 0;
    let currentDigits = 0;
    let currentBufferActions = {};
    let pastBufferActions = {};
    let pastComputations = [];
    let computerMode = "american";
    let acceptedModes = ["american", "german", "russian"];
    let maxDigits = 4;

    function updateCurrentBufferActions() {
        for (const action of currentBufferActions) {
            // TODO: Update Displayed Value
        }
    }

    function updatePastBufferActions() {
        for (const action of pastBufferActions) {
            // TODO: Update Displayed Value
        }
    }

    function computeMeterToMils(meters) {
        // Guns follow a standard linear formula (y=mx+b)
        let m = 0;
        let b = 0;

        switch (computerMode) {
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

    this.setMode = function(mode) {
        // TODO: Sanitize
        computerMode = mode;
    }

    this.enterDigit = function(value) {
        if (currentDigits >= maxDigits) {
            return false;
        }
        currentDigits += 1;
        currentInput = (currentInput * 10) + value;
        updateCurrentBufferActions();
        return true;
    }

    this.enter = function() {
        const computation = {
            meters: currentInput,
            mils: computeMeterToMils(currentInput)
        };

        // TODO: Save to buffer
        // TODO: Delete end of buffer if too long
        this.clear();
        updatePastBufferActions();
    }

    this.clear = function() {
        currentInput = 0;
        updateCurrentBufferActions();
    }

    this.deregisterCurrentBufferAction = function(action) {
        currentBufferActions[action.context] = null;
    }

    this.deregisterPastBufferAction = function(action) {
        pastBufferActions[action.context] = null;
    }

    this.registerCurrentBufferAction = function(action) {
        currentBufferActions[action.context] = action;
    }

    this.registerPastBufferAction = function(action) {
        pastBufferActions[action.context] = action;
    }
}