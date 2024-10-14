import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { ComputedValue } from "./actions/computed-value";
import { ModeChange } from "./actions/mode-change";
import { NumberInput } from "./actions/number-input";
import { InputBuffer } from "./actions/input-buffer";

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

// Finally, connect to the Stream Deck.
streamDeck.connect();
