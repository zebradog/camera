/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 *
 * Soft Threshold Shader
 * based on George Toledo's work
 * https://www.shadertoy.com/view/4ssGR8
 */
THREE.ThresholdShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
        "soft":    { type: "f", value: 0.001 },
		"threshold":    { type: "f", value: 0.3 },
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
    "uniform float soft;",
    "uniform float threshold;",
    
	"varying vec2 vUv;",

	"void main() {",


        "float f = soft/2.0;",
        "float a = threshold - f;",
        "float b = threshold + f;",
        
        "vec4 tx = texture2D(tDiffuse, vUv);",
        "float l = (tx.x + tx.y + tx.z) / 3.0;",
        
        "vec3 v = vec3(smoothstep(a, b, l));",
        
        "gl_FragColor= vec4(v,1.0);",

	"}"


	].join("\n")

};