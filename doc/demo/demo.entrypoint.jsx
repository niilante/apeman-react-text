'use strict'

import {mount, create, once} from 'breact'
import Demo from './demo.component.jsx'

once('DOMContentLoaded', () => {
  let element = create(Demo, {})
  mount('demo-wrap', element).then(() => {
    console.debug('Demo component mounted.')
  })
})
