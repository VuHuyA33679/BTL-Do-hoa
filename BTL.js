"use strict";

var canvas;
var gl;
var count = 0;
var numPositions = 185;

var positionsMSV = [];
var posLines = [];
var colors = [];
var colorsLines = [];
var vertexColors = [];
var uDistance;
var distance = [0, 0, 0];
var theta = [0, 0, 0];
var uTheta;
var scale = [1, 1, 1];
var uScale;
var axis_rotate;
var program;
var verticesMSV = [];


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 10;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 20;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    canvas.width = vw;
    canvas.height = vh;
    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    verticesMSV = [
        //A30819(22 cubes)
        //verticesA
        vec3(-1050, -200, 50), vec3(-900, 200, 50), vec3(-800, 200, 50), vec3(-950, -200, 50), //0,1,2,3
        vec3(-1050, -200, -50), vec3(-900, 200, -50), vec3(-800, 200, -50), vec3(-950, -200, -50), //4,5,6,7

        vec3(-750, -200, 50), vec3(-900, 200, 50), vec3(-800, 200, 50), vec3(-650, -200, 50), //8,9,10,11
        vec3(-750, -200, -50), vec3(-900, 200, -50), vec3(-800, 200, -50), vec3(-650, -200, -50), //12,13,14,15

        vec3(-913, -100, 50), vec3(-885, -25, 50), vec3(-815, -25, 50), vec3(-787, -100, 50), //16->20
        vec3(-913, -100, -50), vec3(-885, -25, -50), vec3(-815, -25, -50), vec3(-787, -100, -50), //21->25

        //vertices3
        vec3(-350, -200, 50), vec3(-350, 200, 50), vec3(-250, 200, 50), vec3(-250, -200, 50), //26->30
        vec3(-350, -200, -50), vec3(-350, 200, -50), vec3(-250, 200, -50), vec3(-250, -200, -50), //31->35

        vec3(-550, -200, 50), vec3(-550, -120, 50), vec3(-350, -120, 50), vec3(-350, -200, 50),
        vec3(-550, -200, -50), vec3(-550, -120, -50), vec3(-350, -120, -50), vec3(-350, -200, -50),

        vec3(-550, 120, 50), vec3(-550, 200, 50), vec3(-350, 200, 50), vec3(-350, 120, 50),
        vec3(-550, 120, -50), vec3(-550, 200, -50), vec3(-350, 200, -50), vec3(-350, 120, -50),

        vec3(-550, -40, 50), vec3(-550, 40, 50), vec3(-350, 40, 50), vec3(-350, -40, 50),
        vec3(-550, -40, -50), vec3(-550, 40, -50), vec3(-350, 40, -50), vec3(-350, -40, -50),

        //vertices0
        vec3(-150, -200, 50), vec3(-150, 200, 50), vec3(-50, 200, 50), vec3(-50, -200, 50),
        vec3(-150, -200, -50), vec3(-150, 200, -50), vec3(-50, 200, -50), vec3(-50, -200, -50),

        vec3(50, -200, 50), vec3(50, 200, 50), vec3(150, 200, 50), vec3(150, -200, 50),
        vec3(50, -200, -50), vec3(50, 200, -50), vec3(150, 200, -50), vec3(150, -200, -50),

        vec3(-50, 120, 50), vec3(-50, 200, 50), vec3(50, 200, 50), vec3(50, 120, 50),
        vec3(-50, 120, -50), vec3(-50, 200, -50), vec3(50, 200, -50), vec3(50, 120, -50),

        vec3(-50, -200, 50), vec3(-50, -120, 50), vec3(50, -120, 50), vec3(50, -200, 50),
        vec3(-50, -200, -50), vec3(-50, -120, -50), vec3(50, -120, -50), vec3(50, -200, -50),

        //vertices8
        vec3(250, -200, 50), vec3(250, 200, 50), vec3(350, 200, 50), vec3(350, -200, 50),
        vec3(250, -200, -50), vec3(250, 200, -50), vec3(350, 200, -50), vec3(350, -200, -50),

        vec3(450, -200, 50), vec3(450, 200, 50), vec3(550, 200, 50), vec3(550, -200, 50),
        vec3(450, -200, -50), vec3(450, 200, -50), vec3(550, 200, -50), vec3(550, -200, -50),

        vec3(350, 120, 50), vec3(350, 200, 50), vec3(450, 200, 50), vec3(450, 120, 50),
        vec3(350, 120, -50), vec3(350, 200, -50), vec3(450, 200, -50), vec3(450, 120, -50),

        vec3(350, -200, 50), vec3(350, -120, 50), vec3(450, -120, 50), vec3(450, -200, 50),
        vec3(350, -200, -50), vec3(350, -120, -50), vec3(450, -120, -50), vec3(450, -200, -50),

        vec3(350, -40, 50), vec3(350, 40, 50), vec3(450, 40, 50), vec3(450, -40, 50),
        vec3(350, -40, -50), vec3(350, 40, -50), vec3(450, 40, -50), vec3(450, -40, -50),

        //vertices1
        vec3(650, -200, 50), vec3(650, 200, 50), vec3(750, 200, 50), vec3(750, -200, 50),
        vec3(650, -200, -50), vec3(650, 200, -50), vec3(750, 200, -50), vec3(750, -200, -50),

        //vertices9
        vec3(850, -0, 50), vec3(850, 200, 50), vec3(950, 200, 50), vec3(950, -0, 50),
        vec3(850, -0, -50), vec3(850, 200, -50), vec3(950, 200, -50), vec3(950, -0, -50),

        vec3(1050, -200, 50), vec3(1050, 200, 50), vec3(1150, 200, 50), vec3(1150, -200, 50),
        vec3(1050, -200, -50), vec3(1050, 200, -50), vec3(1150, 200, -50), vec3(1150, -200, -50),

        vec3(850, 120, 50), vec3(850, 200, 50), vec3(1050, 200, 50), vec3(1050, 120, 50),
        vec3(850, 120, -50), vec3(850, 200, -50), vec3(1050, 200, -50), vec3(1050, 120, -50),

        vec3(850, -200, 50), vec3(850, -120, 50), vec3(1050, -120, 50), vec3(1050, -200, 50),
        vec3(850, -200, -50), vec3(850, -120, -50), vec3(1050, -120, -50), vec3(1050, -200, -50),

        vec3(850, -40, 50), vec3(850, 40, 50), vec3(1050, 40, 50), vec3(1050, -40, 50),//,168,169,170,171
        vec3(850, -40, -50), vec3(850, 40, -50), vec3(1050, 40, -50), vec3(1050, -40, -50),//172,173,174,175

        //vertices-lines
        vec3(-850, 68, 50), vec3(-850, 68, -50),//176, 177
        vec3(950, 40, 50), vec3(950, 120, 50), vec3(1050, 120, 50), vec3(1050, 40, 50),//,178,179,180,181
        vec3(950, 40, -50), vec3(950, 120, -50), vec3(1050, 120, -50), vec3(1050, 40, -50),//182,183,184,185

        //A34011(16 cubes)
        //vertices4
        // vec3(-150, -40,  50), vec3(-150, 200,  50), vec3(-50, 200,  50), vec3(-50, -40,  50),
        // vec3(-150, -40, -50), vec3(-150, 200, -50), vec3(-50, 200, -50), vec3(-50, -40, -50),

        // vec3(50, -200,  50), vec3(50, 200,  50), vec3(150, 200,  50), vec3(150, -200,  50),
        // vec3(50, -200, -50), vec3(50, 200, -50), vec3(150, 200, -50), vec3(150, -200, -50),

        // vec3(-50, -40,  50), vec3(-50, 40,  50), vec3(50, 40,  50), vec3(50, -40,  50),
        // vec3(-50, -40, -50), vec3(-50, 40,  -50), vec3(50, 40, -50), vec3(50, -40, -50),

        //vertices8
        // vec3(250, -200,  50), vec3(250, 200,  50), vec3(350, 200,  50), vec3(350, -200,  50),
        // vec3(250, -200, -50), vec3(250, 200, -50), vec3(350, 200, -50), vec3(350, -200, -50),

        // vec3(450, -200,  50), vec3(450, 200,  50), vec3(550, 200,  50), vec3(550, -200,  50),
        // vec3(450, -200, -50), vec3(450, 200, -50), vec3(550, 200, -50), vec3(550, -200, -50),

        // vec3(350, 120,  50), vec3(350, 200,  50), vec3(450, 200,  50), vec3(450, 120,  50),
        // vec3(350, 120, -50), vec3(350, 200,  -50), vec3(450, 200, -50), vec3(450, 120, -50),

        // vec3(350, -200,  50), vec3(350, -120,  50), vec3(450, -120,  50), vec3(450, -200,  50),
        // vec3(350, -200, -50), vec3(350, -120, -50), vec3(450, -120, -50), vec3(450, -200, -50),

        //vertices1
        // vec3(650, -200,  50), vec3(650, 200,  50), vec3(750, 200,  50), vec3(750, -200,  50),
        // vec3(650, -200, -50), vec3(650, 200, -50), vec3(750, 200, -50), vec3(750, -200, -50),

        //vertices1
        // vec3(850, -200,  50), vec3(850, 200,  50), vec3(950, 200,  50), vec3(950, -200,  50),
        // vec3(850, -200, -50), vec3(850, 200, -50), vec3(950, 200, -50), vec3(950, -200, -50),
    ];

    vertexColors = [
        vec3(0.0, 0.0, 0.0),  // black
        vec3(1.0, 0.0, 0.0),  // red
        vec3(1.0, 1.0, 0.0),  // yellow
        vec3(0.0, 1.0, 0.0),  // green
        vec3(0.0, 0.0, 1.0),  // blue
        vec3(1.0, 0.0, 1.0),  // magenta
        vec3(0.0, 1.0, 1.0),  // cyan
        vec3(1.0, 1.0, 1.0)   // white
    ];

    buildChar();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var uUserCoordinates = gl.getUniformLocation(program, "uUserCoordinates");
    gl.uniform3f(uUserCoordinates, canvas.width, canvas.height, canvas.width);

    uDistance = gl.getUniformLocation(program, "uDistance");
    uScale = gl.getUniformLocation(program, "uScale");
    uTheta = gl.getUniformLocation(program, "uTheta");

    //------
    //Move
    document.getElementById("slider_x").onmousemove = function (event) {
        distance[0] = parseInt(event.target.value);
        render();
    };

    document.getElementById("slider_y").onmousemove = function (event) {
        distance[1] = parseInt(event.target.value);
        render();
    };

    document.getElementById("slider_z").onmousemove = function (event) {
        distance[2] = parseInt(event.target.value);
        render();
    };

    //------
    //Rotate
    document.getElementById("angle_x").onmousemove = function (event) {
        theta[0] = parseInt(event.target.value);
        render();
    };

    document.getElementById("angle_y").onmousemove = function (event) {
        theta[1] = parseInt(event.target.value);
        render();
    };

    document.getElementById("angle_z").onmousemove = function (event) {
        theta[2] = parseInt(event.target.value);
        render();
    };

    //------
    //Scale
    // var show_scale_x = document.getElementById("show-scale-x");
    // document.getElementById("scale scale[0] = parseFloat(event._x").onmousemove = function(event) {
    //    target.value);
    //     show_scale_x.textContent = scale[0];
    // };

    // var show_scale_y = document.getElementById("show-scale-y");
    // document.getElementById("scale_y").onmousemove = function(event) {
    //     scale[1] = parseFloat(event.target.value);
    //     show_scale_y.textContent = scale[1];
    // };

    // var show_scale_z = document.getElementById("show-scale-z");
    // document.getElementById("scale_z").onmousemove = function(event) {
    //     scale[2] = parseFloat(event.target.value);
    //     show_scale_z.textContent = scale[2];
    // };

    render();
}

function buildChar() {
    //BuildA
    BuildCube(1, 0, 3, 2); BuildCube(2, 3, 7, 6); BuildCube(3, 0, 4, 7); BuildCube(4, 5, 6, 7); BuildCube(5, 4, 0, 1); BuildCube(6, 5, 1, 2);
    BuildCube(9, 8, 11, 10); BuildCube(10, 11, 15, 14); BuildCube(11, 8, 12, 15); BuildCube(12, 13, 14, 15); BuildCube(13, 12, 8, 9); BuildCube(14, 15, 9, 10);
    BuildCube(17, 16, 19, 18); BuildCube(18, 19, 23, 22); BuildCube(19, 16, 20, 23); BuildCube(20, 21, 22, 23); BuildCube(21, 20, 16, 17); BuildCube(22, 18, 17, 21);

    //Build3
    BuildCube(25, 24, 27, 26); BuildCube(26, 27, 31, 30); BuildCube(27, 24, 28, 31); BuildCube(28, 29, 30, 31); BuildCube(29, 28, 24, 25); BuildCube(30, 26, 25, 29);
    BuildCube(33, 32, 35, 34); BuildCube(34, 35, 39, 38); BuildCube(35, 32, 36, 39); BuildCube(36, 37, 38, 39); BuildCube(37, 36, 32, 33); BuildCube(38, 34, 33, 37);
    BuildCube(41, 40, 43, 42); BuildCube(42, 43, 47, 46); BuildCube(43, 40, 44, 47); BuildCube(44, 45, 46, 47); BuildCube(45, 44, 40, 41); BuildCube(46, 42, 41, 45);
    BuildCube(49, 48, 51, 50); BuildCube(50, 51, 55, 54); BuildCube(51, 48, 52, 55); BuildCube(52, 53, 54, 55); BuildCube(53, 52, 48, 49); BuildCube(54, 50, 49, 53);

    //Build0
    BuildCube(57, 56, 59, 58); BuildCube(58, 59, 63, 62); BuildCube(59, 56, 60, 63); BuildCube(60, 61, 62, 63); BuildCube(61, 60, 56, 57); BuildCube(62, 58, 57, 61);
    BuildCube(65, 64, 67, 66); BuildCube(66, 67, 71, 70); BuildCube(67, 64, 68, 71); BuildCube(68, 69, 70, 71); BuildCube(69, 68, 64, 65); BuildCube(70, 66, 65, 69);
    BuildCube(73, 72, 75, 74); BuildCube(74, 75, 79, 78); BuildCube(75, 72, 76, 79); BuildCube(76, 77, 78, 79); BuildCube(77, 76, 72, 73); BuildCube(78, 74, 73, 77);
    BuildCube(81, 80, 83, 82); BuildCube(82, 83, 87, 86); BuildCube(83, 80, 84, 87); BuildCube(84, 85, 86, 87); BuildCube(85, 84, 80, 81); BuildCube(86, 82, 81, 85);

    //Build8
    BuildCube(89, 88, 91, 90); BuildCube(90, 91, 95, 94); BuildCube(91, 88, 92, 95); BuildCube(92, 93, 94, 95); BuildCube(93, 92, 88, 89); BuildCube(94, 90, 89, 93);
    BuildCube(97, 96, 99, 98); BuildCube(98, 99, 103, 102); BuildCube(99, 96, 100, 103); BuildCube(100, 101, 102, 103); BuildCube(101, 100, 96, 97); BuildCube(102, 98, 97, 101);
    BuildCube(105, 104, 107, 106); BuildCube(106, 107, 111, 110); BuildCube(107, 104, 108, 111); BuildCube(108, 109, 110, 111); BuildCube(109, 108, 104, 105); BuildCube(110, 106, 105, 109);
    BuildCube(113, 112, 115, 114); BuildCube(114, 115, 119, 118); BuildCube(115, 112, 116, 119); BuildCube(116, 117, 118, 119); BuildCube(117, 116, 112, 113); BuildCube(118, 114, 113, 117);
    BuildCube(121, 120, 123, 122); BuildCube(122, 123, 127, 126); BuildCube(123, 120, 124, 127); BuildCube(124, 125, 126, 127); BuildCube(125, 124, 120, 121); BuildCube(126, 122, 121, 125);

    //Build1
    BuildCube(129, 128, 131, 130); BuildCube(130, 131, 135, 134); BuildCube(131, 128, 132, 135); BuildCube(132, 133, 134, 135); BuildCube(133, 132, 128, 129); BuildCube(134, 130, 129, 133);

    //Build9
    BuildCube(137, 136, 139, 138); BuildCube(138, 139, 143, 142); BuildCube(139, 136, 140, 143); BuildCube(140, 141, 142, 143); BuildCube(141, 140, 136, 137); BuildCube(142, 138, 137, 141);
    BuildCube(145, 144, 147, 146); BuildCube(146, 147, 151, 150); BuildCube(147, 144, 148, 151); BuildCube(148, 149, 150, 151); BuildCube(149, 148, 144, 145); BuildCube(150, 146, 145, 149);
    BuildCube(153, 152, 155, 154); BuildCube(154, 155, 159, 158); BuildCube(155, 152, 156, 159); BuildCube(156, 157, 158, 159); BuildCube(157, 156, 152, 153); BuildCube(158, 154, 153, 157);
    BuildCube(161, 160, 163, 162); BuildCube(162, 163, 167, 166); BuildCube(163, 160, 164, 167); BuildCube(164, 165, 166, 167); BuildCube(165, 164, 160, 161); BuildCube(166, 162, 161, 165);
    BuildCube(169, 168, 171, 170); BuildCube(170, 171, 175, 174); BuildCube(171, 168, 172, 175); BuildCube(172, 173, 174, 175); BuildCube(173, 172, 168, 169); BuildCube(174, 170, 169, 173);

    //Lines
    let x;
    //0-7
    x = 0;
    DrawLines(0, 1); DrawLines(1, 2); DrawLines(3, 0); DrawLines(4, 5); DrawLines(5, 6); DrawLines(7, 4);
    DrawLines(0, 4); DrawLines(3, 7); DrawLines(1, 5); DrawLines(2, 6);
    DrawLines(17, 18); DrawLines(17, 176); DrawLines(18, 176); DrawLines(21, 22); DrawLines(22, 177); DrawLines(21, 177);
    //8-15
    x += 8;
    DrawLines(x, x + 3); DrawLines(x, x + 4); DrawLines(x + 2, x + 3); DrawLines(x + 3, x + 7); DrawLines(x + 6, x + 7);
    DrawLines(x + 4, x + 7);
    //16-23
    x += 8;
    DrawLines(x, x + 3); DrawLines(x, 3); DrawLines(x + 3, 8); DrawLines(x + 4, x + 7); DrawLines(x + 4, 7); DrawLines(x + 7, 12);

    //24-31
    x += 8;
    DrawLines(x + 2, x + 3); DrawLines(x + 7, x + 6); DrawLines(x + 3, x + 7); DrawLines(x + 6, x + 2); DrawLines(x + 3, x); DrawLines(x + 4, x + 7);
    DrawLines(x + 1, x + 2); DrawLines(x + 6, x + 5);
    //32-39
    x += 8;
    DrawLines(x + 1, x + 2); DrawLines(x + 6, x + 5); DrawLines(x + 1, x + 5); DrawLines(x, x + 3); DrawLines(x + 4, x + 7);
    DrawLines(x, x + 1); DrawLines(x + 4, x + 5); DrawLines(x, x + 4); DrawLines(x + 6, x + 2);
    //40-47
    x += 8;
    DrawLines(x + 1, x + 2); DrawLines(x + 6, x + 5); DrawLines(x + 1, x + 5); DrawLines(x, x + 3); DrawLines(x + 4, x + 7);
    DrawLines(x, x + 1); DrawLines(x + 4, x + 5); DrawLines(x, x + 4); DrawLines(x + 3, x + 7);
    //48-55
    x += 8;
    DrawLines(x + 1, x + 2); DrawLines(x + 6, x + 5); DrawLines(x + 1, x + 5); DrawLines(x, x + 3); DrawLines(x + 4, x + 7);
    DrawLines(x, x + 1); DrawLines(x + 4, x + 5); DrawLines(x, x + 4); DrawLines(x + 3, x + 7); DrawLines(x + 3, 34); DrawLines(x + 7, 38);
    DrawLines(x + 2, 43); DrawLines(x + 6, 47);

    //56-63
    x += 8;
    // DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    // DrawLines(x, x + 4); DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3); DrawLines(x + 2, x + 3);DrawLines(x + 6, x + 7);
    DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7);
    //64-71
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3); DrawLines(x + 2, x + 3);
    DrawLines(x + 6, x + 7);
    //72-79
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 7, x + 4); DrawLines(x + 3, x + 7); DrawLines(x + 4, x);
    //80-87
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 7, x + 4); DrawLines(x + 1, x + 5); DrawLines(x + 2, x + 6);
    DrawLines(72, x + 1); DrawLines(x + 2, 75);
    DrawLines(76, x + 5); DrawLines(x + 6, 79);

    //88-95
    x += 8;
    DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7);
    //96-103
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3); DrawLines(x + 2, x + 3);
    DrawLines(x + 6, x + 7);
    //104-111
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 7, x + 4); DrawLines(x + 3, x + 7); DrawLines(x + 4, x);
    //112-119
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 5, x + 6);
    DrawLines(x + 7, x + 4); DrawLines(x + 1, x + 5); DrawLines(x + 2, x + 6);
    //120-127
    x += 8;
    DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3);
    DrawLines(104, x + 1); DrawLines(108, x + 5);
    DrawLines(107, x + 2); DrawLines(111, x + 6);
    DrawLines(113, x); DrawLines(117, x + 4);
    DrawLines(114, x + 3); DrawLines(118, x + 7);
    //128-135
    x += 8;
    DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3); DrawLines(x + 2, x + 3); DrawLines(x + 6, x + 7);
    //136-143
    x += 8;
    DrawLines(136, 137); DrawLines(138, 137); DrawLines(137, 141); DrawLines(141, 142); DrawLines(140, 141);
    //144-151
    x += 8;
    DrawLines(146, 145); DrawLines(144, 147); DrawLines(149, 150);
    DrawLines(148, 151); DrawLines(148, 150); DrawLines(151, 147); DrawLines(146, 147); DrawLines(150, 151);
    //152-159
    x += 8;
    DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    DrawLines(x + 7, x + 3);
    //160-167
    x += 8;
    DrawLines(x, x + 1); DrawLines(x + 2, x + 1); DrawLines(x, x + 3); DrawLines(x + 1, x + 5); DrawLines(x + 5, x + 6); DrawLines(x + 4, x + 5);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6);
    //168-175
    x += 8;
    DrawLines(x, x + 1); DrawLines(x, x + 3); DrawLines(x + 4, x + 5);
    DrawLines(x, x + 4); DrawLines(x + 4, x + 7); DrawLines(x + 2, x + 6); DrawLines(x + 7, x + 3);
    DrawLines(162, x + 3); DrawLines(166, x + 7);

    DrawLines(178,179); DrawLines(182,183); DrawLines(179,180); DrawLines(183,184); DrawLines(180,181); DrawLines(184,185); DrawLines(178,181); DrawLines(182,185);

}

function BuildCube(a, b, c, d) {
    var indices = [a, b, c, a, c, d];

    for (var i = 0; i < indices.length; ++i) {
        positionsMSV.push(verticesMSV[indices[i]]);
        colors.push(vertexColors[a % 8]);
    }
}

function DrawLines(a, b) {
    posLines.push(verticesMSV[a]);
    posLines.push(verticesMSV[b]);
    colorsLines.push(vertexColors[0]);
    colorsLines.push(vertexColors[0]);
}

function supportColor(colors) {
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
}

function supportRender(positions) {
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
}

function render() {
    if (count == 1 || count % 60 == 0)
        axis_rotate = Math.floor(Math.random() * 3 + 1) - 1;
    count += 1;
    theta[axis_rotate] = theta[axis_rotate] < 360 ? theta[axis_rotate] + 1 : 1;

    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    supportColor(colors);
    supportRender(positionsMSV);

    gl.uniform3fv(uDistance, distance);
    gl.uniform3fv(uTheta, theta);
    gl.uniform3fv(uScale, scale);

    gl.drawArrays(gl.TRIANGLES, 0, positionsMSV.length);


    supportColor(colorsLines);
    supportRender(posLines);

    gl.uniform3fv(uDistance, distance);
    gl.uniform3fv(uTheta, theta);
    gl.uniform3fv(uScale, scale);
    console.log(colorsLines.length);
    gl.drawArrays(gl.LINES, 0, posLines.length);

    requestAnimationFrame(render);
}
