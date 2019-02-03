import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './SceneComponent.js';
import 'babylonjs-loaders';

const importCase = "NurseFromDae";
//else we will see the dude

class PageWithScene extends React.Component<{}, {}> {
  constructor() {
    super();
    switch (importCase) {
      case "NurseFromDae":
        this.showImportTestFromDae = this.showImportTestFromDae.bind(this);
        break;
      default:
        this.showDude = this.showDude.bind(this);
    }
  }
  
  prepareCamera(){
    switch (importCase) {
      case "NurseFromDae":
        this.prepareCameraForFromDae();
        break;
      default:
        this.prepareCameraForDude();        
    }    
  }
  
  prepareCameraForFromDae() {
    const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, +10, 0), this.scene);
    this.camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI/2, 2.6, new BABYLON.Vector3(0, 0, 0), this.scene);
    this.camera.setTarget(new BABYLON.Vector3(0, 1.5, 0)); 

    const ground = BABYLON.MeshBuilder.CreatePlane("ground", {height: 20.5, width: 20.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
    ground.rotate(BABYLON.Axis.X,Math.PI/2 , BABYLON.Space.LOCAL);
    ground.position.y  =  -1;
    //this.camera.attachControl(this.canvas, true);    
  }
  
  prepareCameraForDude() {
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
  
  showImportTestFromDae = (newMeshes, particleSystems, skeletons) => {
    
    const path = "/models/nurse2/asiatisch_krankenschwester_bob_schwarzhaarig_schlank_";

    const meshNames = ["Bottom", "Top", "Hair", "Shoes", "Body"];
    for (let meshIndex in meshNames) {        
      let texturePath = path + meshNames[meshIndex];
      newMeshes[meshIndex].material.diffuseTexture = new BABYLON.Texture(texturePath+"_Diffuse.png", this.scene);    
      newMeshes[meshIndex].material.specularTexture = new BABYLON.Texture(texturePath+"_Specular.png", this.scene);          
      newMeshes[meshIndex].material.bumpTexture = new BABYLON.Texture(texturePath+"_Normal.png", this.scene);    
    }
    // Meshes
    // 0: Bottoms
    // 1: Tops
    // 2: Hair
    // 3: Shoes
    // 4: Body
    // 5: Eyelashes
    // 6: default
    //this.camera.lockedTarget = newMeshes[2];
  }
  
  showDude = (newMeshes, particleSystems, skeletons) => {
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
        BABYLON.SceneLoader.ImportMesh("", "/models/nurseFromDae/", "nurse.babylon", this.scene, this.showImportTestFromDae);
        break;
      default:
        this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), this.scene);
        BABYLON.SceneLoader.ImportMesh("", "/models/dude/", "dude.babylon", this.scene, this.showDude);    
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
              <BabylonScene width="1000" height="1000" onSceneMount={this.onSceneMount} />
          </div>
      )
  }
}

class Modeldemo extends Component {

  render() {
    return (
      <div>
        <PageWithScene id="modelview" />
      </div>
    );
  }
}

export default Modeldemo;
