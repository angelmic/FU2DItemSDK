(function(){
	var bg_board={
		type:"billboard_ex2",
		base_vertex:-1,
		shader:FaceUnity.ReadFromCurrentItem("bg.glsl"),
	};
	return {
		Render:function(params){
			try{
				bg_board.uniforms={"iGlobalTime":params.frame_id/30,"iResolution":[params.tracker_space_w,params.tracker_space_h]};
				var scale=(20000/params.focal_length);
				FaceUnity.RenderBillboard(null,bg_board,{
					v:[scale*params.tracker_space_w/2,-scale*params.tracker_space_h/2,scale*params.focal_length,
						-scale*params.tracker_space_w/2,-scale*params.tracker_space_h/2,scale*params.focal_length,
						-scale*params.tracker_space_w/2,scale*params.tracker_space_h/2,scale*params.focal_length,
						scale*params.tracker_space_w/2,scale*params.tracker_space_h/2,scale*params.focal_length],
					vt:[1,0, 0,0, 0,1, 1,1],
				});
			}catch(err){
				console.log(err.stack);
			}
		},
		name:"example_from_shadertoy",
	};
})()
