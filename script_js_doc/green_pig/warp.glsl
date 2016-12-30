/**
* \brief 圆形变胖
* \param R 半径
* \param center 圆心
* \param p 输入的纹理坐标
* \return 变形的向量（xy分量）和权重（z分量），距离圆心越近，权重越大
*/
vec3 getWarp(float R, vec2 center, vec2 p){
	float d = length(p - center);
	float invd = 0.0;
	if (d < 0.001){
		return vec3(vec2(0.0), 1.0);
	}
	float t = min(1.0, d / R);
	float kernel = pow(t, 1.5);
	float stretch = min(d, kernel * R);
	vec2 delta = normalize(p - center) * stretch;
	vec2 offset = (center + delta) - p;
	float weight = 1.0 - kernel;
	return vec3(offset * weight, weight);
}
vec2 shader_main(vec2 st){	
	vec2 pi = st*dims;
		
	//vec2 fsize = face_size * dims;
	/* 计算脸宽 */
	float fw = length(point5 - point4);
	/* 四个地方变胖 */
	vec3 offset0 = getWarp(fw / 8.0, point0, pi);
	vec3 offset1 = getWarp(fw / 8.0, point1, pi);
	vec3 offset2 = getWarp(fw / 3.0, point2, pi);
	vec3 offset3 = getWarp(fw / 3.0, point3, pi);	
	
	/* 根据权重叠加变胖效果 */
	float wsum = offset0.z + offset1.z + offset2.z + offset3.z;	
	vec2 offset = vec2(0.0, 0.0);
	if (wsum > 0.0){	
		offset = (offset0.xy + offset1.xy + offset2.xy + offset3.xy) / wsum;
	}
	/* 输出最后的变形后坐标 */
	return (pi + offset)/dims;
}
