var cursorRounded = null;
var quad = null;
var quads = [];
var quadText = [];

var slides = [];
var sliderN = 0;

var currentScreen = 0;
const maxScreen = 7;

function support_format_webp(){
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))){
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else{
        // very old browser like IE 8, canvas not supported
        return false;
    }
}

var t = null;

const moveCursor = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    e.path = e.composedPath();

    cursorRounded.style.transform = `translate3d(calc(${mouseX}px - 50% + 3px), calc(${mouseY}px - 50% + 3px), 0)`;
    
    var interactive = false;

    for(var i = 0;i < e.path.length;i++){
        if(!e.path[i].getAttribute){
            continue;
        }
        if(e.path[i].hasAttribute("interactive")){
            interactive = true;
            break;
        }
    }
    if(interactive){
        cursorRounded.classList.add("pointed");
    }else{
        cursorRounded.classList.remove("pointed");
    }

    var m = window.innerHeight;
    var c = window.innerHeight / 2;
    var p = 100 / c * (Math.abs(mouseY) - c);
    
    
    // mesh.rotation.x = p / 4 * Math.PI / 180;
}

const ecoQuadMove = (e) =>{

    // console.log(e);
    var coord = {
        x:e.offsetX - (quad.clientWidth / 2),
        y:e.offsetY - (quad.clientHeight / 2)
        // x:e.offsetX,
        // y:e.offsetY
    }

    var h = -1;

    var range = Math.abs(coord.x) + Math.abs(coord.y);

    // console.log(`${e.offsetX} + ${e.offsetY} = ${Math.abs(coord.x) + Math.abs(coord.y)}`)
    // console.log(e.offsetX);

    // quads[0].querySelector("span").innerText = `X: ${coord.x}, Y: ${coord.y}`;
    // quads[0].querySelector("span").innerText = range;

    if(range <= quad.clientWidth * 0.7071 * 0.33){
        h = 0;
    }else{
        if(coord.x < 0){
            //right
            if(coord.y > 0)
                h = 2;
            else
                h = 1;
        }else{
            //left
            if(coord.y > 0)
                h = 3;
            else
                h = 4;
        }
    }

    // quads[0].querySelector("span").innerHTML = `${e.offsetX}<br>${e.offsetY}`;


    if(range > quad.clientWidth * 0.5)
        h = -1;

    for(let i = 0;i < quads.length;i++){
        if(i == h)
            quads[i].classList.add("hover");
        else
            quads[i].classList.remove("hover");
    }
}
const ecoQuadClick = (e) =>{
    var coord = {
        x:e.offsetX - (quad.clientWidth / 2),
        y:e.offsetY - (quad.clientHeight / 2)
    }

    var h = -1;

    var range = Math.abs(coord.x) + Math.abs(coord.y);

    // quads[0].querySelector("span").innerText = range;

    if(range <= quad.clientWidth * 0.7071 * 0.33){
        h = 0;
    }else{
        if(coord.x < 0){
            //right
            if(coord.y > 0)
                h = 2;
            else
                h = 1;
        }else{
            //left
            if(coord.y > 0)
                h = 3;
            else
                h = 4;
        }
    }

    // alert(`X: ${coord.x}, Y: ${coord.y}`);



    if(range > quad.clientWidth * 0.5)
        h = -1;

        if(h >= 0)
            quadText[0].classList.remove("active");
        else
            quadText[0].classList.add("active");

    for(let i = 0;i < quads.length;i++){
        if(i == h){
            if(quads[i].classList.contains("active")){
                quadText[i + 1].classList.remove("active");
                quadText[0].classList.add("active");
                quads[i].classList.remove("active");
            }
            else{
                quadText[i + 1].classList.add("active");
                quads[i].classList.add("active");
            }
        }
        else{
            
            quads[i].classList.remove("active");
            quadText[i + 1].classList.remove("active");
        }

    }
}
const ecoQuadMoveOut = (e) =>{
    // var coord = {
    //     x:e.offsetX - (quad.clientWidth / 2),
    //     y:e.offsetY - (quad.clientHeight / 2)
    // }
    Array.from(quad.querySelectorAll("div")).forEach(el=>{
        el.classList.remove("hover");
    })
}

function preloadImages(){

}

function menuLineClickN(n){
    if(n == 0){
        document.querySelector("header").classList.add("welcome");
        document.querySelector("menu").classList.add("welcome");
    }else{
        document.querySelector("header").classList.remove("welcome");
        document.querySelector("menu").classList.remove("welcome");
    }

    Array.from(document.querySelectorAll("div.screen")).forEach(e=>{
        e.classList.remove('active');
        if(e.getAttribute("screen-n") == n)
            e.classList.add('active');
    })
    Array.from(document.querySelectorAll("menu > div")).forEach(e=>{
        e.classList.remove('active');
        if(e.getAttribute("menu-n") == n)
            e.classList.add('active');
    })

    currentScreen = n;

    document.querySelector("menu > div.current").innerText = document.querySelector("menu > div.active").innerText;
}

function hideMenu(b){
    if(b){
        document.querySelector("menu").classList.add("hidden");
    }else{
        document.querySelector("menu").classList.remove("hidden");
    }
}

function openBigFaq(event,b){
    var bf = document.querySelector(".container.big-faq");
    if(bf.classList.contains("active") == b){
        return;
    }
    if(b){
        bf.classList.add("active");
    }else{
        event.path = event.composedPath();
        if(event.path[0].classList.contains("cross")){
            bf.classList.remove("active");
        }else{
            console.log(event.path);
            for(let i = 0;i < event.path.length - 3;i++){
                if(event.path[i].classList.contains("big-faq-container") || event.path[i].hasAttribute("interactive")){
                    console.log("big-faq-container");
                    return;
                }
            }
            bf.classList.remove("active");
        }
    }
    hideMenu(b);
    console.log(b);
}

function menuLineClick(e){
    e.path = e.composedPath();
    if(!e.path[0].hasAttribute("menu-n") && !e.path[1].hasAttribute("menu-n"))
        return;

    var n = e.path[0].getAttribute("menu-n") || e.path[1].getAttribute("menu-n");

    if(n == 0){
        document.querySelector("header").classList.add("welcome");
        document.querySelector("menu").classList.add("welcome");
    }else{
        document.querySelector("header").classList.remove("welcome");
        document.querySelector("menu").classList.remove("welcome");
    }

    Array.from(document.querySelectorAll("div.screen")).forEach(e=>{
        e.classList.remove('active');
        if(e.getAttribute("screen-n") == n)
            e.classList.add('active');
    })
    Array.from(document.querySelectorAll("menu > div")).forEach(e=>{
        e.classList.remove('active');
        if(e.getAttribute("menu-n") == n)
            e.classList.add('active');
    })

    currentScreen = n;

    document.querySelector("menu > div.current").innerText = document.querySelector("menu > div.active").innerText;
}

function everbrightChangeSlide(e){
    var l = document.querySelector(".everbright .img-container");
    l.classList.add("active");
    setTimeout(()=>{
        l.classList.remove("active")
    },500);
    
    var c = document.getElementById("everbright");
    var s = Array.from(c.querySelectorAll("div[everbright-text-n]"));
    var d = 0;
    for(let i = 0;i < s.length;i++){
        if(s[i].classList.contains("active"))
            s[i].classList.remove("active");
        else{
            s[i].classList.add("active");
            d = i;
        }
    }
    
    var s = Array.from(c.querySelectorAll("#everbright .img-container img"));
    for(let i = 0;i < s.length;i++){
        if(s[i].classList.contains("active"))
            s[i].classList.remove("active");
        else{
            s[i].classList.add("active");
        }
    }



    if(d == 0){
        e.classList.remove("left")
    }else{
        e.classList.add("left")
    }
}

function nftChangeSlide(n){
    sliderN += n;
    if(sliderN < 0)
        sliderN = 0;
    if(sliderN >= slides.length)
        sliderN = slides.length - 1;

    for(let i = 0;i < slides.length;i++){
        slides[i].classList.remove("active","before","after");
        if(i == sliderN){
            slides[i].classList.add("active");
        }else{
            if(i < sliderN)
                slides[i].classList.add("before");
            else
                slides[i].classList.add("after");
        }
    }
}

function roadMapChange(n){
    var c = document.querySelector(".roadmap");
    var s = Array.from(c.querySelectorAll(".list > div"));
    var b = Array.from(c.querySelectorAll(".controls > div"));

    for(let i = 0;i < s.length;i++){
        if(i == n){
            s[i].classList.add("active");
            b[i].classList.add("active");
        }else{
            s[i].classList.remove("active");
            b[i].classList.remove("active");
        }
    }
}

var thumb,bfe;

window.addEventListener("load",()=>{
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        document.getElementById("loader").classList.add('disable');
        
    });

    cursorRounded = document.querySelector('#cursor');
    quad = document.getElementById("eco-quad");
    quads = Array.from(quad.querySelectorAll("div"));
    quadText = Array.from(document.querySelectorAll("div[id^='ecosystem-text-']"));

    
    slides = Array.from(document.querySelectorAll(".slider-container > .slider > .slide"));
    sliderN = 0;
    nftChangeSlide(1);
    
    console.log(`WEBP supported: ${support_format_webp()}`);
    
    window.addEventListener('mousemove', moveCursor);
    
    quad.addEventListener('mousemove', ecoQuadMove);
    quad.addEventListener('mouseout', ecoQuadMoveOut);
    quad.addEventListener('click', ecoQuadClick);
    Array.from(document.querySelectorAll("menu > div")).forEach(e=>{
        e.addEventListener("click",menuLineClick);
    })

    $(".big-faq-container .text > p").click((e=>{
        if(document.querySelector(".container.big-faq").classList.contains("active") == false){
            return;
        }
        if(e.currentTarget.classList.contains("active")){
            e.currentTarget.classList.remove("active");
        }else{
            e.currentTarget.classList.add("active");
        }
    }))

    document.querySelector(".big-faq-container > .text").addEventListener("scroll",(e)=>{
        e.path = e.composedPath();
        bfe = e.path[0];
        thumb = document.querySelector(".big-faq-container .scrollbar > div");

        // thumb.parentNode.style.top = `${bfe.scrollTop + 48}px`;
        // thumb.parentNode.style.height = `${bfe.clientHeight - 48 - 48}px`;
        var r = bfe.scrollHeight - bfe.clientHeight;


        thumb.style.top = `${1 / r * bfe.scrollTop * 100}%`;
    });
    window.addEventListener("wheel", event => {
        var d = event.deltaY > 0 ? 1 : -1;

        if(d + currentScreen < 0 || d + currentScreen > maxScreen)
            return;
        
        currentScreen += d;
        menuLineClickN(currentScreen);
    });

    
    // init();
    // animate();


    var oilCanvas = document.getElementById("myChart");

    // Chart.defaults.global.defaultFontFamily = "Lato";
    // Chart.defaults.global.defaultFontSize = 18;

    var oilData = {
        datasets: [
            {
                data: [90, 25, 65, 20, 20,70,10,50,7,3],
                backgroundColor: [
                    "#ffffff1f"
                ]
            }]
    };
    var chartOptions = {
        animation: {
          animateRotate: false,
          animateScale: true
        },
        responsive:true,
        maintainAspectRatio: false,

        hoverBackgroundColor: 'white',
        hoverBorderColor: 'white',
        hoverBorderWidth : '16'
      };
      

    var pieChart = new Chart(oilCanvas, {
    type: 'pie',
    data: oilData,
    options: chartOptions
    });
    pieChart.canvas.parentNode.style.height = '25vh';
    // pieChart.canvas.parentNode.style.height = '2';
    
})




// import * as THREE from 'three';

let camera, scene, renderer, loader;
let mesh;


function init() {

    camera = new THREE.PerspectiveCamera( 70, 500 / 500, 1, 1000 );
    camera.position.z = 400;

    scene = new THREE.Scene();

    const texture = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/crate.gif' );

    const geometry = new THREE.BoxGeometry( 300, 150, 200 );
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    mesh = new THREE.Mesh( geometry, material );

    loader = new GLTFLoader();

    loader.load( 'models/fbx/myModel.fbx', function ( object ) {

        scene.add( object );

        renderer = new THREE.WebGLRenderer( { antialias: true ,alpha: true, canvas: document.getElementById("three-js-box")} );
        renderer.setClearColor( 0x000000, 0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( 500, 500 );
        // document.getElementById("three-js-box-container").appendChild( renderer.domElement );
    
        //
    
        window.addEventListener( 'resize', onWindowResize );
    
    }, undefined, function ( e ) {
    
      console.error( e );
    
    } );

    // scene.add( mesh );

    // renderer = new THREE.WebGLRenderer( { antialias: true ,alpha: true, canvas: document.getElementById("three-js-box")} );
    // renderer.setClearColor( 0x000000, 0 );
    // renderer.setPixelRatio( window.devicePixelRatio );
    // // renderer.setSize( 500, 500 );
    // // document.getElementById("three-js-box-container").appendChild( renderer.domElement );

    // //

    // window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = 500 / 500;
    camera.updateProjectionMatrix();

    renderer.setSize( 500, 500);

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.y += 0.005;

    renderer.render( scene, camera );

}