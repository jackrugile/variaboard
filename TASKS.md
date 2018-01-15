# Tasks

## Controls

- [x] button
- [x] range
- [ ] minMax range
- [ ] number
- [ ] boolean
- [ ] select dropdown
- [ ] multiselect
- [ ] pad control?

## Common

- [ ] save preset
- [ ] select preset
- [ ] export/import presets
- [ ] randomize single
- [ ] mutate single
- [ ] lock
- [ ] unlock
- [ ] config history
- [ ] collapsible panels
- [ ] tool tip descriptions

## Completed Features

- [x] animate digits when randomizing
- [x] prevent text selection when dragging
- [x] allow for chaining calls
- [x] allow for multiple instances
- [x] keyboard mappings for up/down on each input, larger change when shift key is down
- [x] randomize all
- [x] mutate all
- [x] mousewheel up/down, larger change when shift key is down
- [x] "changeCallback" for any/all control
- [x] selection colors
- [x] set decimal count to amount of step, so that it never jumps
- [x] able to type in numbers
- [x] eased value setting is now tracked indepently from actual value. actual values will still get rounded to steps properly
- [x] flash randomize and mutate buttons when all are getting triggered
- [x] custom easing for randomize and mutate, combine map and ease
- [ ] trigger global onchange only once when multiple controls are changed

## Misc

- [ ] post set function for mapping to different values?
- [ ] determine what should be added to base control, and what should be added to specific control types
- [ ] randomize or mutate single field button
- [ ] pinned, floating, or block panel options
- [ ] store history of changes, like bfxr?
- [ ] destroy/update method for controls
- [ ] "changeCallback" for individual control
- [ ] exponential/function based values ranges?
- [ ] keyboard input on range focus
- [ ] check for ID naming collisions
- [ ] move styles to only js, or output style block, for simplicity of overrides
- [ ] pin locations
- [ ] preset themes
- [ ] color coding options
- [ ] style indicator when focused
- [ ] display units? (px, em, deg)?
- [ ] output current settings, and output code to rebuild settings (definitions)
- [ ] methods to add new controls, or load from initial contructor
- [ ] set custom mutation ratio
- [ ] list browser compatibility, get polyfills where needed
- [ ] look in to accessibility concerns
- [ ] can this work for touch?
- [ ] rethink style details
- [ ] complete all JSDoc docs
- [ ] provide common demos and examples
- [ ] add getting started and more helpful basic docs
- [ ] logo
- [ ] favicon
- [ ] label text and input text aren't perfectly aligned vertically
- [ ] click and drag up/down on input value to change value? (like dat gui)
- [ ] does travis need the gulp-cli install?
- [ ] don't trigger single change or global change if the value stayed the same, in fact, return early
- [ ] be able to override global defaults
- [ ] add css prefixes to JS for transform scaleX
- [ ] add description option to inputs
- [ ] onChange, onChangeStart, on ChangeComplete?

## Non Plugin Code

- [x] publish on npm
- [x] changelog
- [x] semver releases
- [x] yarn
- [x] UMD
- [x] shields/badges
- [x] travis
- [x] editor config
- [x] jsdoc for classes and methods
- [x] 'use strict';
- [x] eslint
- [ ] road map
- [ ] bower
- [ ] cdnjs
- [ ] unpkg
- [ ] jsdelivr
- [ ] tests?
