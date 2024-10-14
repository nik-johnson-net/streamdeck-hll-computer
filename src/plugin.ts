import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { ActionComputedValue, ComputedValue } from "./actions/computed-value";
import { ActionModeChange, ModeChange } from "./actions/mode-change";
import { ActionNumberInput, NumberInput } from "./actions/number-input";
import { ActionInputBuffer, InputBuffer } from "./actions/input-buffer";

import { Computer } from "./computer";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Create the core Computer
let computer: Computer = new Computer();

// Register actions

streamDeck.actions.registerAction(new ComputedValue(computer));
streamDeck.actions.registerAction(new ModeChange(computer));
streamDeck.actions.registerAction(new NumberInput(computer));
streamDeck.actions.registerAction(new InputBuffer(computer));

// Deprecated Actions
streamDeck.actions.registerAction(new ActionComputedValue(computer));
streamDeck.actions.registerAction(new ActionInputBuffer(computer));
streamDeck.actions.registerAction(new ActionModeChange(computer));
streamDeck.actions.registerAction(new ActionNumberInput(computer));

// Finally, connect to the Stream Deck.
streamDeck.connect();
