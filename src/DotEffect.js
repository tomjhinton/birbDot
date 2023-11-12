import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'

const fragmentShader = /* glsl */ `
uniform sampler2D tColor;
    uniform sampler2D tNormal;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform sampler2D tDiffuse;
	uniform float uSlide;



void mainUv(inout vec2 uv){
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
    vec4 color = inputColor;

    float t = (uTime * .2) + length(uv-.5);

    vec2 uv2 = fract(uv * (100. ));

    // color.rgb = vec3(color.r);
    
    // color.rgb *= step(length(uv2-.5),.2);


	


    vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );

		// kernel definition (in glsl matrices are filled in column-major order)

			const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
			const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel

		// fetch the 3x3 neighbourhood of a fragment

		// first column

		// float tx0y0 = dot(texture2D( tDiffuse, vUv + texel * vec2( -1, -1 ) ).rgb, vec3(0.299, 0.587, 0.114));


			float tx0y0 = texture2D( tDiffuse, vUv + texel * vec2( -1, -1 ) ).r;
			float tx0y1 = texture2D( tDiffuse, vUv + texel * vec2( -1,  0 ) ).r;
			float tx0y2 = texture2D( tDiffuse, vUv + texel * vec2( -1,  1 ) ).r;

		// second column

			float tx1y0 = texture2D( tDiffuse, vUv + texel * vec2(  0, -1 ) ).r;
			float tx1y1 = texture2D( tDiffuse, vUv + texel * vec2(  0,  0 ) ).r;
			float tx1y2 = texture2D( tDiffuse, vUv + texel * vec2(  0,  1 ) ).r;

		// third column

			float tx2y0 = texture2D( tDiffuse, vUv + texel * vec2(  1, -1 ) ).r;
			float tx2y1 = texture2D( tDiffuse, vUv + texel * vec2(  1,  0 ) ).r;
			float tx2y2 = texture2D( tDiffuse, vUv + texel * vec2(  1,  1 ) ).r;

		// gradient value in x direction

			float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
				Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
				Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

		// gradient value in y direction

			float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
				Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
				Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

		// magnitute of the total gradient

			float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );

			
	float H = G;


    G *= step(length(uv2-.5),.2);
    
    outputColor = mix(inputColor, vec4( vec3( mix(H, G, step(vUv.x, uSlide * .7) ) ), 1 ), step(vUv.x, uSlide));
}`


export default class DotEffect extends Effect{
    constructor({slide,uTime, blendFunction =BlendFunction.DARKEN}){
      
        super('DotEffect', 
        fragmentShader, 
        {
            blendFunction,
            uniforms: new Map([
          
               ['uTime', new Uniform(0)],
			   ['uSlide', new Uniform(slide)]      
            ])
        }
    )

    
    }

update(renderer, inputBuffer, deltaTime){
    this.uniforms.get('uTime').value += deltaTime
	
}

}
