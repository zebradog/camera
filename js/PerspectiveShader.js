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
     "h":       { type: "m4", value: new THREE.Matrix4() }
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
  "uniform mat4 h;",

	"varying vec2 vUv;",

	"void main() {",
    
        "float u = vUv.x;",
        "float v = vUv.y;",
        
        "mat4 m;",
        "m[0][0] = h[0][0];",
        "m[0][1] = h[1][0];",
        "m[0][2] = h[2][0];",
        "m[0][3] = h[3][0];",
        "m[1][0] = h[0][1];",
        "m[1][1] = h[1][1];",
        "m[1][2] = h[2][1];",
        "m[1][3] = h[3][1];",
        "m[2][0] = h[0][2];",
        "m[2][1] = h[1][2];",
        "m[2][2] = h[2][2];",
        "m[2][3] = h[3][2];",
        "m[3][0] = h[0][3];",
        "m[3][1] = h[1][3];",
        "m[3][2] = h[2][3];",
        "m[3][3] = h[3][3];",
        
        
        "float x = u;",
        "float y = v;",
        
        "vec2 p = vec2(x,y);",
        
        "gl_FragColor= texture2D(tDiffuse, p);",

	"}"


	].join("\n")

};