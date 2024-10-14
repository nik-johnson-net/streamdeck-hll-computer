import { DialAction, JsonObject, KeyAction } from "@elgato/streamdeck";

const millisHoldTime: number = 333;

// TODO: Need to extend Singleton Action.
export class ButtonHold<T extends JsonObject> {
  // Callback to run on hold 
  private onHold: (action: KeyAction<T> | DialAction<T>) => void;

  // Callback to run on press
  private onPress: (action: KeyAction<T> | DialAction<T>) => void;

  // State for button instances
  private state: Map<string, InstanceState>;

  constructor(onPress: (action: KeyAction<T> | DialAction<T>) => void, onHold: (action: KeyAction<T> | DialAction<T>) => void) {
    this.onPress = onPress;
    this.onHold = onHold;

    this.state = new Map<string, InstanceState>();
  }

  onKeyDown(action: KeyAction<T> | DialAction<T>): void {
    let state = this.state.get(action.id)
    if (state === undefined) {
      state = {
        cancelSignalFunc: undefined,
        holdRan: false,
      };
      this.state.set(action.id, state);
    }
    this._startHold(state, action);
  }

  onKeyUp(action: KeyAction<T> | DialAction<T>): void {
    let state = this.state.get(action.id)
    if (state === undefined) {
      return;
    }
    
    if (state.holdRan) {
      return; // Nothing to do
    }

    this._cancelHold(state);
    this.onPress(action);
  }

  _startHold(state: InstanceState, action: KeyAction<T> | DialAction<T>): void {
    state.holdRan = false;
    let shouldCancel = false;
    
    setTimeout(() => {
      if (!shouldCancel) {
        this.onHold(action);
      }
    }, millisHoldTime);
    
    state.cancelSignalFunc = () => {
      shouldCancel = true;
    };
  }

  _cancelHold(state: InstanceState): void {
    if (state.cancelSignalFunc !== undefined) {
      state.cancelSignalFunc();
    }
  }
}

type InstanceState = {
  // Signal to call to cancel the hold function
  cancelSignalFunc: (() => void) | undefined;

  // Whether or not the hold func ran
  holdRan: boolean;
};
