import React from 'react'
import {render} from '@testing-library/react'
import Dino from './Dino'

test("It render without crashes",()=>{
  render( <Dino />)
})
