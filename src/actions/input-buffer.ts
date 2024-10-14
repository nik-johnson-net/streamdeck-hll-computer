import streamDeck, { action, DialAction, KeyAction, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { Computer } from "../computer";
import { ButtonHold } from "../buttonHold";

/**
 * Shows a computed value.
 */
@action({ UUID: "net.nik-johnson.hell-let-loose-artillery-calculator.input-buffer" })
export class InputBuffer extends SingletonAction<InputBufferSettings> {
	private computer: Computer;
	private hold: ButtonHold<InputBufferSettings>;
	
	constructor (computer: Computer) {
		super()
		this.computer = computer;
		this.hold = new ButtonHold(this.onPress.bind(this), this.onHold.bind(this));
	}
	
	override onWillAppear(ev: WillAppearEvent<InputBufferSettings>): void | Promise<void> {
		if (ev.action.isKey()) {
			this.computer.registerInputBufferAction(ev.action);
		} else {
			// error!
		}
	}

	override onWillDisappear(ev: WillDisappearEvent<InputBufferSettings>): Promise<void> | void {
		this.computer.deregisterInputBufferAction(ev.action.id);
	}

	override async onKeyUp(ev: KeyUpEvent<InputBufferSettings>): Promise<void> {
		this.hold.onKeyUp(ev.action);
	}

	override async onKeyDown(ev: KeyDownEvent<InputBufferSettings>): Promise<void> {
		this.hold.onKeyDown(ev.action);
	}

	async onPress(action: KeyAction<InputBufferSettings> | DialAction<InputBufferSettings>): Promise<void> {
		if (this.computer.enter()) {
			if (action.isKey()) {
				await action.showOk();
			}
		} else {
			await action.showAlert();
		}
	}

	async onHold(action: KeyAction<InputBufferSettings> | DialAction<InputBufferSettings>): Promise<void> {
		this.computer.clear();
		await action.showAlert();
	}
}

export type InputBufferSettings = {};
