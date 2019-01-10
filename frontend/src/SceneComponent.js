//https://doc.babylonjs.com/resources/babylonjs_and_reactjs

import * as BABYLON from 'babylonjs';
import React from 'react';

export type SceneEventArgs = {
  engine: BABYLON.Engine,
  scene: BABYLON.Scene,
  canvas: BABYLON.HTMLCanvasElement
};


export const SceneProps = {
  engineOptions: BABYLON.EngineOptions,
  adaptToDeviceRatio: true,
  //onSceneMount: (args: SceneEventArgs) => void,
  onSceneMount: {},
  width: 0,
  height: 0
};


export default class Scene extends React.Component<SceneProps & React.HTMLAttributes<HTMLCanvasElement>, {}> {

  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  canvas: HTMLCanvasElement;

  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
    }
  }

  componentDidMount () {
    this.engine = new BABYLON.Engine(
        this.canvas,
        true,
        this.props.engineOptions,
        this.props.adaptToDeviceRatio
    );

    let scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    if (typeof this.props.onSceneMount === 'function') {
      this.props.onSceneMount({
        scene,
        engine: this.engine,
        canvas: this.canvas
      });
    } else {
      console.error('onSceneMount function not available');
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onCanvasLoaded = (c : HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  render () {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    let { width, height, ...rest } = this.props;

    let opts: any = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return (
      <canvas
        {...opts}
        ref={this.onCanvasLoaded}
      />
    )
  }
}