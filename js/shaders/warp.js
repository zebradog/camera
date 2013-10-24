/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 *
 * Mapping Irregular Quadrilateral to Rectangle
 * based on 
 * http://math.stackexchange.com/a/104595
 */
THREE.WarpShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
     "m":       { type: "m4", value: new THREE.Matrix4() }
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
  "uniform mat4 m;",

	"varying vec2 vUv;",

	"void main() {",
          
        "vec4 uv = vec4(vUv.x,vUv.y,0,1);",
      
        "vec4 wp = m * uv;",
        
        "wp.x = wp.x / wp.w;",
        "wp.y = wp.y / wp.w;",
        "wp.z = wp.z / wp.z;",

        "vec2 p = vec2(wp.x,wp.y);",
        
        "gl_FragColor= texture2D(tDiffuse, p);",

	"}"


	].join("\n")

};