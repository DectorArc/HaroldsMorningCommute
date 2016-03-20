/// <reference path="_importedScripts.ts"/>
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var Vector3 = THREE.Vector3;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
var game = (function () {
    var scene = new Scene();
    var camera;
    var renderer;
    function init() {
        scene.name = "Main";
        scene.fog = new THREE.Fog(0x00FFDD, 0, 750);
        setupRenderer();
        setupCamera();
    }
    function gameLoop() {
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.set(10, 10, 10);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map