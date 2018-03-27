import * as THREE from 'three';

export default class BaseApp {

  _rafId = null;

  constructor({renderer = {}, camera = {}, autoUpdate = true, autoResize = true}) {
    // setup renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio === 1,
      ...renderer
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // setup scene
    this.scene = new THREE.Scene();

    // setup camera
    const {
      fov = 70,
      near = 0.1,
      far = 1000
    } = camera;
    this.camera = new THREE.PerspectiveCamera(fov, 1, near, far);

    // create clock for updates
    this.clock = new THREE.Clock();

    // update handling
    if (autoUpdate) {
      this._rafId = window.requestAnimationFrame(this.tick);
    }

    // resize handling
    if (autoResize) {
      window.addEventListener('resize', this.resize);
    }

    // initial resize
    this.size = {width: 0, height: 0};
    this.resize();
  }

  destroy = () => {
    window.cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this.resize);
  };

  add(child) {
    this.scene.add(child);

    return child;
  };

  remove(child) {
    this.scene.remove(child);

    return child;
  };

  tick = () => {
    this.update(this.clock.getDelta());
    this.render();

    this._rafId = window.requestAnimationFrame(this.tick);
  };

  // abstract
  update(delta) {};

  render() {
    this.renderer.render(this.scene, this.camera);
  };

  resize = () => {
    this.size.width = this.renderer.domElement.clientWidth;
    this.size.height = this.renderer.domElement.clientHeight;

    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.size.width, this.size.height, false);

    this.resizeHook();
  };

  // abstract
  resizeHook() {}
}