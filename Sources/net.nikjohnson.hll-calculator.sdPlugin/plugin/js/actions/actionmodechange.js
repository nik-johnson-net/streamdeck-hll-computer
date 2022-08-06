class ActionModeChange extends Action {
    constructor(context, settings, computer) {
        super(context, settings)
        this.computer = computer;
    }

    onKeyUp(payload) {
        const nextState = (payload.state + 1) % Computer.acceptedModes.length;
        this.computer.setMode(Computer.acceptedModes[nextState]);
    }
}