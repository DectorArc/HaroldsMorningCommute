/// <reference path="_importedScripts.ts"/>

import Scene = Physijs.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Vector3 = THREE.Vector3;
import CScreen = config.Screen;
import CubeGeometry = THREE.CubeGeometry;
import BoxGeometry = THREE.BoxGeometry;
import LambertMaterial = THREE.MeshLambertMaterial;
//Custom Game Objects
import gameObject = objects.gameObject;

// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";


var game = (() => {
    
    var scene: Scene;
    var camera: PerspectiveCamera;
    var renderer: Renderer;
    var playerGeometry: CubeGeometry;
    var playerMaterial: Physijs.Material;
    var player: Physijs.Mesh;
    var stats: Stats;
    var spotLight: THREE.SpotLight;
    
    
    function init(){
        
        scene = new Scene();
        scene.name = "Main";
        scene.fog = new THREE.Fog(0x000000,0,750);
        
        scene.addEventListener('update', () => {
           scene.simulate(undefined, 2); 
        });
        addStatsObject();
        setupRenderer();
        setupCamera();
        
        playerGeometry = new BoxGeometry(2, 2, 2);
        playerMaterial = Physijs.createMaterial(new LambertMaterial({color: 0x00ff00}), 0.4, 0);
        
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
    
    function gameLoop():void{
        stats.update();
        
        console.log("Firing Game Loop");
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }
    
     // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    
    function setupCamera():void{
        camera = new PerspectiveCamera(35, config.Screen.RATIO,0.1,100);
        camera.position.set(10,10,10);
        camera.lookAt(new Vector3(0,0,0));
        console.log("Finished setting up Camera...");
        console.log(CScreen.WIDTH + "");
    }
    
    window.onload = init;

    return {
        scene: scene
    }
    
})();