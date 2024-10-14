import { action, DidReceiveSettingsEvent, KeyAction, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { Computer } from "../computer";

/**
 * Shows a computed value.
 */
@action({ UUID: "net.nik-johnson.hll-computer.computed-value" })
export class ComputedValue extends SingletonAction<ComputedValueSettings> {
	private computer: Computer;
	
	constructor (computer: Computer) {
		super()
		this.computer = computer;
	}
	
	override onWillAppear(ev: WillAppearEvent<ComputedValueSettings>): void | Promise<void> {
		if (ev.action.isKey()) {
			this.computer.registerComputedValueAction(ev.action);
		} else {
			// error!
		}
	}

	override onWillDisappear(ev: WillDisappearEvent<ComputedValueSettings>): Promise<void> | void {
		this.computer.deregisterComputedValueAction(ev.action.id);
	}

	override async onKeyUp(ev: KeyUpEvent<ComputedValueSettings>): Promise<void> {
		this.computer.clearSpecificHistory(ev.payload.settings.historyLevel);
		await ev.action.showOk();
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<ComputedValueSettings>): Promise<void> {
		this.computer
	}
}

/**
 * Re-export under an old name
 */
@action({ UUID: "net.nik-johnson.hll-computer.actioncomputedvalue" })
export class ActionComputedValue extends ComputedValue {}

/**
 * Settings for {@link IncrementCounter}.
 */
export type ComputedValueSettings = {
	historyLevel: number;
};
