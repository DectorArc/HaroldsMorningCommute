/// <reference path="_importedScripts.ts"/>
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var Vector3 = THREE.Vector3;
var CScreen = config.Screen;
var CubeGeometry = THREE.CubeGeometry;
var BoxGeometry = THREE.BoxGeometry;
var LambertMaterial = THREE.MeshLambertMaterial;
//Custom Game Objects
var gameObject = objects.gameObject;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
var game = (function () {
    var scene;
    var camera;
    var renderer;
    var playerGeometry;
    var playerMaterial;
    var player;
    var stats;
    var spotLight;
    function init() {
        scene = new Scene();
        scene.name = "Main";
        scene.fog = new THREE.Fog(0x000000, 0, 750);
        scene.addEventListener('update', function () {
            scene.simulate(undefined, 2);
        });
        playerGeometry = new BoxGeometry(2, 2, 2);
        playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
        player = new Physijs.BoxMesh(playerGeometry, playerMaterial, 1);
        player.position.set(0, 0, 0);
        player.receiveShadow = true;
        player.castShadow = true;
        player.name = "Player";
        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(20, 40, -15);
        spotLight.castShadow = true;
        spotLight.intensity = 2;
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.shadowCameraNear = 2;
        spotLight.shadowCameraFar = 200;
        spotLight.shadowCameraLeft = -5;
        spotLight.shadowCameraRight = 5;
        spotLight.shadowCameraTop = 5;
        spotLight.shadowCameraBottom = -5;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowDarkness = 0.5;
        spotLight.name = "Spot Light";
        scene.add(spotLight);
        console.log("Added spotLight to scene");
        scene.add(player);
        console.log("Player Added to Scene");
        addStatsObject();
        setupRenderer();
        setupCamera();
        gameLoop();
        scene.simulate();
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    function gameLoop() {
        stats.update();
        console.log("Firing Game Loop");
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
        console.log(CScreen.WIDTH + "");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map