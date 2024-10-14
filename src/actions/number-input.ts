import streamDeck, { action, DialAction, DidReceiveSettingsEvent, KeyAction, KeyUpEvent, SingletonAction, WillAppearEvent, WillDisappearEvent } from "@elgato/streamdeck";
import { Computer, Modes } from "../computer";

const _valueToImage = {
	0: "zero.svg",
	1: "one.svg",
	2: "two.svg",
	3: "three.svg",
	4: "four.svg",
	5: "five.svg",
	6: "six.svg",
	7: 'seven.svg',
	8: 'eight.svg',
	9: 'nine.svg'
};

/**
 * Shows an input key for one digit.
 */
@action({ UUID: "net.nik-johnson.hll-computer.number-input" })
export class NumberInput extends SingletonAction<NumberInputSettings> {
	private computer: Computer;
	
	constructor (computer: Computer) {
		super()
		this.computer = computer;
	}

	override async onWillAppear(ev: WillAppearEvent<NumberInputSettings>): Promise<void> {
		streamDeck.logger.info(`Debug Settings: ${typeof ev.payload.settings.value}`);
		await this.setIcon(ev.payload.settings, ev.action);
	}
	
	override async onKeyUp(ev: KeyUpEvent<NumberInputSettings>): Promise<void> {
		if (!this.computer.enterDigit(ev.payload.settings.value)) {
			await ev.action.showAlert();
		}
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<NumberInputSettings>): Promise<void> {
		streamDeck.logger.info(`Debug Settings: ${typeof ev.payload.settings.value}`);
		await this.setIcon(ev.payload.settings, ev.action);
	}

	async setIcon(settings: NumberInputSettings, action: KeyAction<NumberInputSettings> | DialAction<NumberInputSettings>): Promise<void> {
		const imageName = _valueToImage[settings.value];
		await action.setImage(`imgs/actions/number/${imageName}`);
	}
}

/**
 * Re-export under an old name
 */
@action({ UUID: "net.nik-johnson.hll-computer.actionnumberinput" })
export class ActionNumberInput extends NumberInput {}

/**
 * Settings for {@link IncrementCounter}.
 */
export type NumberInputSettings = {
	value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};
