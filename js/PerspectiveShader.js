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
     "h":       { type: "mat4", value: new THREE.Matrix4() }
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
        
        "float x = u;",
        "float y = v;",
        
        "vec2 p = vec2(x,y);",
        
        "gl_FragColor= texture2D(tDiffuse, p);",

	"}"


	].join("\n")

};