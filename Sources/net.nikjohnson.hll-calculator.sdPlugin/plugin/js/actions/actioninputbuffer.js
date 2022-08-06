class ActionInputBuffer extends Action {
    static millisHoldTime = 500;

    constructor(context, settings, computer) {
        super(context, settings)
        this.computer = computer;
        this.holdStartTime = 0;
    }

    onKeyDown(_) {
        this.holdStartTime = Date.now();
    }

    onKeyUp(_) {
        if (this._isHold()) {
            this.computer.clear();
            window.$SD.api.showAlert(this.context);
            return;
        }
        
        if (!this.computer.enter()) {
            window.$SD.api.showAlert(this.context);
        } else {
            window.$SD.api.showOk(this.context);
        }
    }

    _isHold() {
        const elapsed = Date.now() - this.holdStartTime;
        return elapsed >= ActionInputBuffer.millisHoldTime;
    }

    onWillAppear(payload) {
        super.onWillAppear(payload);
        this.computer.registerInputBufferAction(this);
    }

    onWillDisappear(_) {
        this.computer.deregisterInputBufferAction(this);
    }

    displayValue(value) {
        window.$SD.api.setTitle(this.context, '' + value);
    }
}