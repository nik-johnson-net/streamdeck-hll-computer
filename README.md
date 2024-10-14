# HLL Computer for Stream Deck

HLL Computer is the only Hell Let Loose artillery calculator available on the Elgato Stream Deck family of devices!
Gone are the days of estimating where to set your elevation. With this app, you can quickly punch in your distance
and see your previous calculations for rapid target adjustment.

## Installation

To install this plugin, simply download and open the latest streamDeckPlugin file from the [Releases Page](https://github.com/nik-johnson-net/streamdeck-hll-computer/releases) and open it in Stream Deck.

The plugin comes with a prebuilt profile for the original Stream Deck. Or create your own using the four available actions.

## Usage

![hll-computer-demo](https://github.com/user-attachments/assets/7672fcd7-6d69-4352-a920-19c90e731451)

The plugin works by providing a numeric keypad interface which are used to punch in the distance in meters. Upon entering a fourth digit, or
pressing the "Input Buffer" action, the computer converts the distance to mils and stores it in the "Computed Value" action. There can be
multiple "Computed Value" actions, allowing you to quickly refer back to a past calculation.

If an incorrect distance is entered (too short, or too far), the last numkey pressed or input buffer action will display a yellow triangle.

Entered an incorrect distance and want to clear it? Simple press the "Computed Value" action it was stored into.

Hit the wrong digit and want to clear the input buffer? Simply press and hold the "Input Buffer" action.

Finally, the Russian guns use a different distance convertion than U.S. or German guns, so use the "Mode Change" action to switch settings. Mode
changes will reset current input and past calculations.

## Actions

The plugin is designed to function as a full screen application on the Stream Deck. The various actions work together to build an
intuitive interface for artillery calculations.

### Number Input

The Number Input action mimics a numpad entry button. The Action can be assigned the digits 0-9. Press to enter the action's digit into the computer.

### Input Buffer

The Input Buffer action displays the current range entered into the computer. Press to compute the mils for the given range. The display will reset
to zero and the result will be sent to be displayed on a Computed Value action. Hold the button to clear the current value.

### Computed Value

The Computed Value shows a past computation, giving both meters and mils for quick reference to previous targets. The Computed Value actions
can be configured to show specific past calculations, from 1 to 5. Press the button to clear this specific past calculation from memory.

### Mode Change

The Mode Change action switches the configuration for the computer to different teams. Doing so will reset the computer, clearing both the currently
entered range and history.
