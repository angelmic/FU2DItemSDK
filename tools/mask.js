(function(){
	var GL_ZERO=0x0;
	var GL_ONE=0x1;
	var GL_SRC_COLOR=0x0300;
	var GL_ONE_MINUS_SRC_COLOR=0x0301;
	var GL_SRC_ALPHA=0x0302;
	var GL_ONE_MINUS_SRC_ALPHA=0x0303;
	var GL_DST_ALPHA=0x0304;
	var GL_ONE_MINUS_DST_ALPHA=0x0305;
	var GL_DST_COLOR=0x0306;
	var GL_ONE_MINUS_DST_COLOR=0x0307;
	var GL_SRC_ALPHA_SATURATE=0x0308;
	var GL_CONSTANT_COLOR=0x8001;
	var GL_ONE_MINUS_CONSTANT_COLOR=0x8002;
	var GL_CONSTANT_ALPHA=0x8003;
	var GL_ONE_MINUS_CONSTANT_ALPHA=0x8004;
	/////////////////////////
	var tex2=FaceUnity.LoadTexture("mask.png");
	/////////
	return {
		Render:function(params){
			try{
				FaceUnity.RenderAR(tex2);
			}catch(err){
				console.log(err.stack)
			}
		},
		name:"dummy",
	};
})()