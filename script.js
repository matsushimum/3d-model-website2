import * as THREE from "./build/three.module.js";
import { FlyControls } from "./jsm/controls/FlyControls.js";

let camera,scene,renderer;
let controls;

const clock = new THREE.Clock();

init();

function init(){
    //camera
    camera = new THREE.PerspectiveCamera(
        40,//視野角
        window.innerWidth/window.innerHeight,//アスペクト比
        1,//開始距離
        15000//終了距離
    );

    camera.position.z = 250;

    //scene
    scene = new THREE.Scene();

    //geometry
    const size = 250;
    const geometry = new THREE.BoxGeometry(size,size,size);
    const material = new THREE.MeshPhongMaterial({
        color:0xffffff,
        specular:0xffffff,//鏡面反射
        shininess:50,//輝度
    });

    //ランダムに位置を決める記述
    for(let i=0;i<2500;i++){
        const mesh = new THREE.Mesh(geometry,material);

        mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
        mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

        //回転度合いをランダムに決める
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
    
        scene.add(mesh);
    }

    //平行光源
    const dirLight = new THREE.DirectionalLight(0xffffff,0.03);
    scene.add(dirLight);

    addLight(0.08,0.3,0.9,0,0,-1000);

    //ポイント光源を追加
    function addLight(h,s,l,x,y,z){
        const light = new THREE.PointLight(0xffffff,1.5,2000);
        light.color.setHSL(h,s,l);
        light.position.set(x,y,z);
        scene.add(light);
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //マウス操作を行う
    controls = new FlyControls(camera,renderer.domElement);

    renderer.render(scene,camera);

}