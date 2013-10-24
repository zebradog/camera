/**
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 *
 *  Motion, Threshold, and Warp shaders combined
 */
THREE.CameraShader = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
    "tPrevious": { type: "t", value: null },
    "soft":    { type: "f", value: 0.001 },
		"threshold":    { type: "f", value: 0.3 },
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
  "uniform sampler2D tPrevious;",
  "uniform float soft;",
  "uniform float threshold;",
  "uniform mat4 m;",

	"varying vec2 vUv;",

	"void main() {",
          
        "vec4 uv = vec4(vUv.x,vUv.y,0,1);",
        
        //warp
      
        "vec4 wp = m * uv;",
        
        "wp.x = wp.x / wp.w;",
        "wp.y = wp.y / wp.w;",
        "wp.z = wp.z / wp.z;",

        "vec2 p = vec2(wp.x,wp.y);",
        
        //motion (using abs here since we don't care about direction)
        
        "vec4 cur = texture2D(tDiffuse, p);",
        "vec4 prev = texture2D(tPrevious, p);",
        "vec4 t = vec4(abs(cur.x-prev).x,abs(cur.y-prev.y),abs(cur.z-prev.z),1.0);",
        
        //threshold
        
        "float f = soft/2.0;",
        "float a = threshold - f;",
        "float b = threshold + f;",
        
        "float l = (t.x + t.y + t.z) / 3.0;",
        
        "vec3 v = vec3(smoothstep(a, b, l));",
        
        "gl_FragColor = vec4(v,1.0);",
      
	"}"


	].join("\n")

};