import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './SceneComponent.js';
import 'babylonjs-loaders';

//isImportTest = true
//will import the nurse, exported from .dae to .babylon
const isImportTest = true;

var pics = {
  "unknown":  require('./img/unknown_person.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg'),
};

class PageWithScene extends React.Component<{}, {}> {
  constructor() {
    super();
    if (isImportTest) {
      this.showImportTest = this.showImportTest.bind(this);
    }
    else{
      this.showReflection = this.showReflection.bind(this);
    }
  }
  
  prepareCamera(){   
    if (isImportTest) {
      this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), this.scene);
      this.camera.radius = 3;
      this.camera.heightOffset = 2;
      this.camera.rotationOffset = 180;
      this.camera.cameraAcceleration = 0.05
      this.camera.maxCameraSpeed = 10
      this.camera.attachControl(this.canvas, true);
    }
    else {
      this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), this.scene);
      this.camera.radius = 160;
      this.camera.heightOffset = 100;
      this.camera.rotationOffset = 0;
      this.camera.cameraAcceleration = 0.05
      this.camera.maxCameraSpeed = 10
      this.camera.attachControl(this.canvas, true);
      
      //the sphere will be at the dude's head position
      this.sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this.scene);   
    }
    
    
  }
  
  showImportTest = (newMeshes, particleSystems, skeletons) => {
    this.camera.lockedTarget = newMeshes[2];
  }
  
  showReflection = (newMeshes, particleSystems, skeletons) => {
    const dude = newMeshes[0];
    const skeleton = skeletons[0];
    this.sphere.attachToBone(skeleton.bones[34], dude);
		this.sphere.scaling = new BABYLON.Vector3(5, 5, 5);
    this.camera.lockedTarget = this.sphere;
  }

  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;  
    this.canvas = canvas;
    this.scene = scene;
    
    this.prepareCamera();

    if (isImportTest) {
      this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, -100), this.scene);

      BABYLON.SceneLoader.ImportMesh("", "/models/nurseFromDae/", "nurse.babylon", this.scene, this.showImportTest);
    }
    else {
      this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), this.scene);
      BABYLON.SceneLoader.ImportMesh("", "/models/dude/", "dude.babylon", this.scene, this.showReflection);
    }

    engine.runRenderLoop(() => {
        if (this.scene) {
            this.scene.render();
        }
    });
  }

  render() {               
      return (
          <div>
              <BabylonScene width="250" height="250" onSceneMount={this.onSceneMount} />
          </div>
      )
  }
}

class Mirror extends Component {

  render() {
    return (
      <div>
        <h2>That is you</h2>
        <PageWithScene />
      </div>
    );
  }
}

export default Mirror;
