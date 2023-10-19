import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment/Comment';

function TodoDetail() {

	return (
		<div style={{padding: "5% 5% 5% 5%"}}>
			<Comment commentId={3} like={false} numLike={0} userName={"TRIPCUBE"} date={"2023년 10월 1일 등록"} content={"노을지는 오후 8시 이후에 가면 좋아요"} profileImage={"https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"} image={"https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=24651&fileTy=MEDIA&fileNo=1"}></Comment>
		</div>
	);
}

export default TodoDetail;
