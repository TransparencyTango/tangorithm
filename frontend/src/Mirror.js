import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './SceneComponent.js';

var pics = {
  "unknown":  require('./img/unknown_person.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg'),
};

class PageWithScene extends React.Component<{}, {}> {
    onSceneMount = (e: SceneEventArgs) => {
      const { canvas, scene, engine } = e;  
      //Adding a light
      var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

      //Adding an Arc Rotate Camera
      var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
      camera.attachControl(canvas, false);
      BABYLON.SceneLoader.ImportMesh("", "/models/", "skull.babylon", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
    });

      engine.runRenderLoop(() => {
          if (scene) {
              scene.render();
          }
      });
    }

    render() {               
        return (
            <div>
                <BabylonScene onSceneMount={this.onSceneMount} />
            </div>
        )
    }
}

class Mirror extends Component {

  render() {
    return (
      <div>
        <h2>That is you</h2>
        <p>
          <img src={pics[this.props.color]} alt="" />
        </p>
        <PageWithScene />
      </div>
    );
  }

}

export default Mirror;
