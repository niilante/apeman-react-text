/**
 * apeman react package for text component.
 * @module apeman-react-text
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get ApTextStyle () { return d(require('./ap_text_style')) },
  get ApText () { return d(require('./ap_text')) }
}
