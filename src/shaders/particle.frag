// @author brunoimbrizi / http://brunoimbrizi.com

precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;
float random(){ return fract(sin(dot(vPUv, vec2(12.9898,78.233)))*43.5453123);}

void main() {
	vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	// vec4 colA = texture2D(uTexture, puv);

	// greyscale
	float ra = random();
	vec4 colB = vec4(ra * .2, 0, ra * 1.8, 1.0);

	// circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	// final color
	color = colB;
	color.a = t;

	gl_FragColor = color;
}
