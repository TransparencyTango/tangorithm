import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './SceneComponent.js';
import 'babylonjs-loaders';

//const importCase = "NurseFromDae";
//else we will see the dude
const importCase = "NurseFromDae";

class PageWithScene extends React.Component<{}, {}> {
  constructor() {
    super();
    switch (importCase) {
      case "NurseFromDae":
        this.showImportTest = this.showImportTest.bind(this);
        break;
      default:
        this.showReflection = this.showReflection.bind(this);
    }
  }
  
  prepareCamera(){
    switch (importCase) {
      case "NurseFromDae":
        this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), this.scene);
        this.camera.radius = 3;
        this.camera.heightOffset = 2;
        this.camera.rotationOffset = 180;
        this.camera.cameraAcceleration = 0.05
        this.camera.maxCameraSpeed = 10
        this.camera.attachControl(this.canvas, true);
        break;
      default:
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
    
    switch (importCase) {
      case "NurseFromDae":
        this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, -100), this.scene);
        BABYLON.SceneLoader.ImportMesh("", "/models/nurseFromDae/", "nurse.babylon", this.scene, this.showImportTest);
        break;
      default:
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

class Modeldemo extends Component {

  render() {
    return (
      <div>
        <PageWithScene />
      </div>
    );
  }
}

export default Modeldemo;
