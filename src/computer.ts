import streamDeck, { KeyAction } from "@elgato/streamdeck";
import { ComputedValueSettings } from "./actions/computed-value";
import { InputBuffer, InputBufferSettings } from "./actions/input-buffer";

export type Mode = "american" | "german" | "russian" | "british";

export const Modes: Mode[] = ["american", "german", "russian", "british"];

export class Computer {
  static computerMaxHistory = 5;
  static maxDigits = 4;

  private currentInput: number;
  private currentDigits: number;
  private computerHistory: Computation[];
  private inputBufferActions: Map<string, InputBufferAction>;
  private computedValueActions: Map<string, ComputedValueAction>;
  private computerMode: Mode;

  constructor() {
    this.currentInput = 0;
    this.currentDigits = 0;
    this.computerHistory = [];

    this.inputBufferActions = new Map<string, InputBufferAction>;
    this.computedValueActions = new Map<string, ComputedValueAction>;

    this.computerMode = "american";
  }

  setMode(mode: Mode) {
    streamDeck.logger.info('Setting computer mode to', mode);
    this.computerMode = mode;
    this.reset();
    return true;
  }

  enterDigit(value: number) {
    streamDeck.logger.info(`Entering value ${value} to currentInput ${this.currentInput} = ${(this.currentInput * 10) + value}`);
    this.currentDigits += 1;
    this.currentInput = (this.currentInput * 10) + value;
    streamDeck.logger.info(`Current value ${this.currentInput}`);
    this._updateInputBufferActions();
    if (this.currentDigits >= Computer.maxDigits) {
      return this.enter();
    }
    return true;
  }

  enter() {
    const computation: Computation = {
      meters: this.currentInput,
      mils: this._computeMeterToMils()
    };

    if (!this._validateRange(computation.mils)) {
      this.clear();
      return false;
    }

    this._pushToBuffer(computation);
    this.clear();
    this._updateComputedValueActions();
    return true;
  }

  reset() {
    this.clear();
    this.computerHistory = [];
    this._updateComputedValueActions();
  }

  clear() {
    this.currentInput = 0;
    this.currentDigits = 0;
    this._updateInputBufferActions();
  }

  clearSpecificHistory(value: number) {
    // Remember values are 1-indexed, arrays are 0-indexed.
    console.log('computer: clearing specific history', value);
    if (this.computerHistory[value - 1] !== undefined) {
      this.computerHistory.splice(value - 1, 1);
      this._updateComputedValueActions();
    }
  }

  // Input Buffer Action handlers
  registerInputBufferAction(action: KeyAction<InputBufferSettings>) {
    let inputBufferAction = new InputBufferAction(action);

    this.inputBufferActions.set(action.id, inputBufferAction);
    inputBufferAction.displayValue(this.currentInput);
  }

  deregisterInputBufferAction(id: string) {
    this.inputBufferActions.delete(id);
  }

  // Computed Value handlers
  registerComputedValueAction(action: KeyAction<ComputedValueSettings>) {
    let computedValueAction = new ComputedValueAction(action);

    this.computedValueActions.set(action.id, computedValueAction);
    this._updateComputedValueAction(computedValueAction);
  }

  async updateComputedValueAction(id: string) {
    let action = this.computedValueActions.get(id);
    if (action !== undefined) {
      await this._updateComputedValueAction(action);
    }
  }

  deregisterComputedValueAction(id: string) {
    this.computedValueActions.delete(id);
  }

  _updateInputBufferActions() {
    this.inputBufferActions.forEach((action) => {
      action.displayValue(this.currentInput);
    });
  }

  _updateComputedValueActions() {
    this.computedValueActions.forEach((action) => {
      this._updateComputedValueAction(action);
    });
  }

  async _updateComputedValueAction(action: ComputedValueAction) {
    const historyLevel = await action.level();

    // historyLevel is 1-indexed. Arrays are 0-indexed.
    const pastComputation = this.computerHistory[historyLevel - 1];
    // console.log('Updating Computed Value action', action.id, 'with history level', historyLevel, 'to past computation', pastComputation);
    if (pastComputation === undefined) {
      action.displayComputation('', '');
    } else {
      action.displayComputation(pastComputation.meters, pastComputation.mils);
    }
  }

  _computeMeterToMils() {
    // Guns follow a standard linear formula (y=mx+b)
    let m = 0;
    let b = 0;

    switch (this.computerMode) {
      case "american":
      case "german":
        m = -0.2370882353;
        b = 1001.525;
        break;
      case "russian":
        m = -0.2133823529;
        b = 1141.375;
        break;
      case "british":
        m = -0.1774;
        b = 550.8;
    }
    const result = (m * this.currentInput) + b;
    return Math.round(result);
  }

  _validateRange(mils: number) {
    let min = 0;
    let max = 0;
    switch (this.computerMode) {
      case "american":
      case "german":
        min = 622;
        max = 978;
        break;
      case "russian":
        min = 800;
        max = 1120;
        break;
      case "british":
        min = 267;
        max = 533;
        break;
    }

    return mils >= min && mils <= max;
  }

  _pushToBuffer(computation: Computation) {
    this.computerHistory.unshift(computation);
    if (this.computerHistory.length > Computer.computerMaxHistory) {
      this.computerHistory.pop();
    }
  }
}

type Computation = {
  meters: number;
  mils: number;
};

class InputBufferAction {
  private action: KeyAction<InputBufferSettings>;

  constructor(action: KeyAction<InputBufferSettings>) {
    this.action = action;
  }

  async displayValue(value: number): Promise<void> {
    streamDeck.logger.info(`Setting to value ${value}`);
    await this.action.setTitle("" + value);
  }
}

class ComputedValueAction {
  private action: KeyAction<ComputedValueSettings>;

  constructor(action: KeyAction<ComputedValueSettings>) {
    this.action = action;
  }

  async displayComputation(meters: number | '', mils: number | '') {
    this.action.setTitle('Meters:\n' + meters + '\nMils:\n' + mils);
  }

  async level(): Promise<number> {
    let settings = await this.action.getSettings();
    return settings.historyLevel
  }
}
