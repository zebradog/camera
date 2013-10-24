/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 */
THREE.MotionShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
    "tPrevious": { type: "t", value: null },
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
  "uniform sampler2D tPrevious;",

	"varying vec2 vUv;",

	"void main() {",
        "vec4 c = texture2D(tDiffuse, vUv);",
        "vec4 p = texture2D(tPrevious, vUv);",
        "gl_FragColor = vec4(c.x-p.x,c.y-p.y,c.z-p.z,1.0);",
	"}"

	].join("\n")

};