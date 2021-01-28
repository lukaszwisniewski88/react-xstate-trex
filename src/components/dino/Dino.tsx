import React, {useEffect, useCallback} from 'react'
import DinoMachine from './Dino.machine'
import {useMachine} from '@xstate/react/lib/fsm'

function Dino() {
  const [current, send] = useMachine(DinoMachine)
  const keyboardHandler = useCallback((event:KeyboardEvent)=>{
    switch (event.key) {
      case 's':
        send('START')
      break;
      case ' ':
        send('JUMP')
      break;
      case 'd':
        send('DUCK')
      break;
      case 'e':
        send('ANIMATION_END')
      break;
    }
  }, [])
  useEffect(()=>{
    document.addEventListener('keydown', keyboardHandler)
    return ()=>{
      document.removeEventListener('keydown', keyboardHandler)
    }
  },[])
  return (
    <div className="dino" style={{
      animationName:current.context.animationName
    }}></div>
  )
}

export default Dino
