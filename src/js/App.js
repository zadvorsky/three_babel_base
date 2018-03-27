import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import BaseApp from './core/BaseApp';

export default class App extends BaseApp {
  constructor() {
    super({
      renderer: {
        canvas: document.querySelector('#three')
      }
    });

    this.renderer.setClearColor(0xffffff);

    this.camera.position.set(100, 100, 100);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.add(new THREE.AxesHelper(50));
  }

  update() {
    this.controls.update();
  }
}