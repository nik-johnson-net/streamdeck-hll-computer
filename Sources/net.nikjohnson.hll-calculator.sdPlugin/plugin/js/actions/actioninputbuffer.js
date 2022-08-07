class ActionInputBuffer extends Action {
    static millisHoldTime = 333;

    constructor(context, settings, computer) {
        super(context, settings)
        this.computer = computer;
        this.holdCancelSignal = null;
        this.holdRan = false;
    }

    onKeyDown(_) {
        this.holdStartTime = Date.now();
        this.holdCancelSignal = this._startHold();
        this.holdRan = false;
    }

    onKeyUp(_) {
        if (this.holdRan) {
            console.log('ActionInputBuffer: onKeyUp: hold already ran.');
            this.holdRan = false;
            return;
        }
        console.log('ActionInputBuffer: onKeyUp: hold didn\'t run.');
        this.holdRan = false;

        this.holdCancelSignal();
        this.holdCancelSignal = null;

        if (!this.computer.enter()) {
            this.showAlert();
        } else {
            this.showOk();
        }
    }

    onWillAppear(payload) {
        super.onWillAppear(payload);
        this.computer.registerInputBufferAction(this);
    }

    onWillDisappear(_) {
        this.computer.deregisterInputBufferAction(this);
    }

    displayValue(value) {
        this.setTitle(value);
    }

    _startHold() {
        console.log('ActionInputBuffer: Starting hold');
        let shouldCancel = false;
        setTimeout(() => {
            console.log('ActionInputBuffer: hold function evaluation');
            if (!shouldCancel) {
                console.log('ActionInputBuffer: hold function not cancelled');
                this.holdRan = true;
                this.computer.clear();
                this.showAlert();
            } else {
                console.log('ActionInputBuffer: hold function cancelled');
            }
        }, ActionInputBuffer.millisHoldTime);
        return () => {
            shouldCancel = true;
        };
    }
}
