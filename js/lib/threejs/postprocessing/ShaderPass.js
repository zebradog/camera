/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function ( shader, textureID ) {

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;
  
  /*hack to re-init EffectComposer
  http://stackoverflow.com/a/14568449/580136
  related to this bug:
  https://github.com/mrdoob/three.js/issues/2951
  applying this patch: 
  https://gist.github.com/anonymous/b1e6f845dd79eaa5aa9a
  */
  this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
  this.scene  = new THREE.Scene();
  this.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
  this.scene.add( this.quad );

};

THREE.ShaderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer;

		}

		//THREE.EffectComposer.quad.material = this.material;
    this.quad.material = this.material;

		if ( this.renderToScreen ) {

			//renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );
      renderer.render( this.scene, this.camera );

		} else {

			//renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, this.clear );
      renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

};
