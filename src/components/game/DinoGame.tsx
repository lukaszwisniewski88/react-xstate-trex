import React from 'react';
import Dino from '../Dino';
import Obstacle from '../obstacles/Obstacle';
import Scene from '../scene/Scene';
import Sky from '../scene/Sky';
import DayCycle from './DayCycle';

export default function DinoGame() {
  return (
    <Scene>
      <Sky />
      <Obstacle />
      <Dino />
    </Scene>
  );
}
