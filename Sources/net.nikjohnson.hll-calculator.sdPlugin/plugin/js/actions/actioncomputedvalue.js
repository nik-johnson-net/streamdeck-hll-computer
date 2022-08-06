class ActionComputedValue extends Action {
    constructor(context, settings, computer) {
        super(context, settings);
        this.computer = computer;
    }

    defaultSettings() {
        return {
            historyLevel: 1
        };
    }

    onWillAppear(payload) {
        super.onWillAppear(payload);
        this.computer.registerComputedValueAction(this);
    }

    onWillDisappear(_) {
        this.computer.deregisterComputedValueAction(this);
    }

    displayComputation(meters, mils) {
        console.log('Context', this.context, 'displaying computation', meters, mils);
        window.$SD.api.setTitle(this.context, 'Meters:\n' + meters + '\nMils:\n' + mils);
    }
}