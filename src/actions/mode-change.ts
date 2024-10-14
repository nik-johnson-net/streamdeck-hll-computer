import { action, KeyAction, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { Computer, Modes } from "../computer";

/**
 * Shows a computed value.
 */
@action({ UUID: "net.nik-johnson.hll-computer.mode-change" })
export class ModeChange extends SingletonAction<ModeChangeSettings> {
	private computer: Computer;
	
	constructor (computer: Computer) {
		super()
		this.computer = computer;
	}
	
	override async onKeyUp(ev: KeyUpEvent<ModeChangeSettings>): Promise<void> {
		if (ev.payload.state === undefined) {
			this.computer.setMode(Modes[0]);
		} else {
			const nextState = (ev.payload.state + 1) % Modes.length;
			this.computer.setMode(Modes[nextState]);
		}
	}
}

/**
 * Settings for {@link IncrementCounter}.
 */
export type ModeChangeSettings = {};
