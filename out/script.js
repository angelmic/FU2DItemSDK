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
	var boards=JSON.parse(FaceUnity.ReadFromCurrentItem("desc.json"));
	var tex=FaceUnity.LoadTexture("bigtex.png");
	var s_eyes_shader=FaceUnity.ReadFromCurrentItem("eyes.glsl");
	//var tex2=FaceUnity.LoadTexture("2.png");
	//console.log('hello world!');
	//console.log(boards);
	//console.log('tex=',tex);
	/////////
	//eyes
	var eye_l=-1, eye_r=-1;
	for (var i=0; i<boards.length; i++) {
		if (boards[i].name == "EyeL") eye_l = i;
		else if (boards[i].name == "EyeR") eye_r = i;
	}

	if (eye_l>=0) {
		//boards[eye_l].blendfunc_src=GL_ONE; boards[eye_l].blendfunc_tar=GL_ONE;
		boards[eye_l].shader=s_eyes_shader;
	}
	if (eye_r>=0) {
		//boards[eye_r].blendfunc_src=GL_ONE; boards[eye_r].blendfunc_tar=GL_ONE;
		boards[eye_r].shader=s_eyes_shader;
	}
	/////////
	//teeth
	var frame_id_teeth=0;
	/////////
	return {
		Render:function(params){
			try{
				//FaceUnity.RenderAR(tex2);
				var frame_id=Math.floor(params.frame_id/2);
				//console.log('call Render');
				//console.log('scale:',1-params.expression[0]);
				if (eye_l>=0) boards[eye_l].uniforms={scale:1-params.expression[0]};
				if (eye_r>=0) boards[eye_r].uniforms={scale:1-params.expression[1]};
				for(var i=0;i<boards.length;i++){
					//console.log('rendering board',i,'on tex',tex);
					FaceUnity.RenderBillboard(tex,boards[i],boards[i].texture_frames[(frame_id)%boards[i].texture_frames.length]);
				}
			}catch(err){
				console.log(err.stack)
			}
		},
		name:"erduo",
	};
})()