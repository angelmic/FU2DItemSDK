vec4 shader_main(vec2 st,vec4 C){
	/*
	简单的示例滤镜，交换红色与绿色通道
	*/
	return vec4(C.y,C.x,C.z,C.w);
}
