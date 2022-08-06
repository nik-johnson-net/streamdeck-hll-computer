class ActionInputBuffer extends Action {
    constructor(context, settings, computer) {
        super(context, settings)
        this.computer = computer;
    }

    onKeyUp(_) {
        this.computer.enter();
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