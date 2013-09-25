/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 *
 * Mapping Irregular Quadrilateral to Rectangle
 * based on 
 * http://math.stackexchange.com/a/104595
 */
THREE.PerspectiveShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
        "a":        { type: "f", value: 0.0 },
        "b":        { type: "f", value: 0.0 },
        "c":        { type: "f", value: 0.0 },
        "d":        { type: "f", value: 0.0 },
        "e":        { type: "f", value: 0.0 },
        "f":        { type: "f", value: 0.0 },
        "g":        { type: "f", value: 0.0 },
        "h":        { type: "f", value: 0.0 },
        "i":        { type: "f", value: 0.0 },
        "j":        { type: "f", value: 0.0 },
        "k":        { type: "f", value: 0.0 },
        "l":        { type: "f", value: 0.0 }
	},

	vertexShader: [

	"varying vec2 vUv;",
	"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

	"}"

	].join("\n"),

	fragmentShader: [

	"uniform sampler2D tDiffuse;",
    "uniform float a;",
    "uniform float b;",
    "uniform float c;",
    "uniform float d;",
    "uniform float e;",
    "uniform float f;",
    "uniform float g;",
    "uniform float h;",
    "uniform float i;",
    "uniform float j;",
    "uniform float k;",
    "uniform float l;",

	"varying vec2 vUv;",

	"void main() {",
    
        "float u = vUv.x;",
        "float v = vUv.y;",
        
        "float uda = u*(d-a);",
        "float ueb = u*(e-b);",
        "float ufc = u*(f-c);",
        "float vjg = v*(j-g);",
        "float vkh = v*(k-h);",
        "float vli = v*(l-i);",
        
        "float x1 = (vkh*ufc-vli*ueb)/(vjg*ueb-vkh*uda);",
        "float y1 = (vli*uda-ufc*vjg)/(vjg*ueb-vkh*uda);",
        "float x = u;",
        "float y = v;",
        
        "vec2 p = vec2(x,y);",
        
        "gl_FragColor= texture2D(tDiffuse, p);",

	"}"


	].join("\n")

};