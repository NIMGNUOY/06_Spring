package edu.kh.project.myPage.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Builder : 빌더 패턴을 이용해 객체 생성 및 초기화를 쉽게 진행
// -> 기본 생성자가 자동으로 생성 안됨(기본 생성자를 꼭 만들어줘야 함)
// -> MyBatis 조회 결과를 담을 때 기본생성자로 객체를 만들기 때문


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UploadFile {

	private int fileNo;
	private String filePath;
	private String fileOriginalName;
	private String fileRename;
	private String fileUploadDate;
	private int memberNo;
	private String memberNickname;
	
}
