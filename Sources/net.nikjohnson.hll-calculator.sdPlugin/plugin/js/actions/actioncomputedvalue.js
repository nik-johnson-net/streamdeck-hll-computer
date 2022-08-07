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

    onKeyUp(_) {
        this.computer.clearSpecificHistory(this.settings.historyLevel);
        this.showOk();
    }

    displayComputation(meters, mils) {
        console.log('Context', this.context, 'displaying computation', meters, mils);
        this.setTitle('Meters:\n' + meters + '\nMils:\n' + mils);
    }
}
