(function(){
	var boards=JSON.parse(FaceUnity.ReadFromCurrentItem("desc.json"));
	var tex=FaceUnity.LoadTexture("bigtex.png");
	var tex0=FaceUnity.LoadTexture("smile.png");
	var s_warp_shader=FaceUnity.ReadFromCurrentItem("warp.glsl");
	var s_color_shader=FaceUnity.ReadFromCurrentItem("color.glsl");
	/////////
	return {
		FilterImage:function(params){
			try{
				/*
				插入猪头效果的变形滤镜
				这里传入的point0～point3是根据特征点计算出来的变胖圆心
				*/
				FaceUnity.InsertImageFilter("warp",s_warp_shader,{										
					//右眼
					point0:[0.5*(params.landmarks[27*2+0]+params.landmarks[29*2+0])/params.h,0.5*(params.landmarks[27*2+1]+params.landmarks[29*2+1])/params.h],
					//左眼
					point1:[0.5*(params.landmarks[31*2+0]+params.landmarks[33*2+0])/params.h,0.5*(params.landmarks[31*2+1]+params.landmarks[33*2+1])/params.h],
					//右脸
					point2:[(0.9*params.landmarks[3*2+0]+0.1*params.landmarks[12*2+0])/params.h,(0.9*params.landmarks[3*2+1]+0.1*params.landmarks[12*2+1])/params.h],
					//左脸
					point3:[(0.1*params.landmarks[2*2+0]+0.9*params.landmarks[11*2+0])/params.h,(0.1*params.landmarks[2*2+1]+0.9*params.landmarks[11*2+1])/params.h],
					//两个耳根点主要是用来计算原始脸宽，以便决定变胖幅度
					//右耳根
					point4:[(params.landmarks[0*2+0])/params.h,(params.landmarks[0*2+1])/params.h],
					//左耳根
					point5:[(params.landmarks[14*2+0])/params.h,(params.landmarks[14*2+1])/params.h],					
					//需要用图像纵横比来把纹理坐标转化到等比例的坐标系
					dims:[params.w/params.h,1],
				});
				//插入简单示例的颜色滤镜
				FaceUnity.InsertImageFilter("color",s_color_shader,{});
			}catch(err){
				console.log(err.stack)
			}
		},	
		Render:function(params){
			try{
				//绘制猪耳之类的贴纸
				var frame_id=(params.frame_id%2==0)?params.frame_id/2:(params.frame_id-1)/2;
				for(var i=0;i<boards.length;i++){
					FaceUnity.RenderBillboard(tex,boards[i],boards[i].texture_frames[(frame_id)%boards[i].texture_frames.length]);
				}
			}catch(err){
				console.log(err.stack)
			}
		},
		name:"green_pig",
	};
})()