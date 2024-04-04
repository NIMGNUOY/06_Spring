package edu.kh.todo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor	// 기본 생성자
@AllArgsConstructor	// 매개 변수 생성자 (모든 필드 초기화)
@ToString
public class Todo {
	
	private int todoNo;				// 할 일 번호
	private String todoTitle;		// 할 일 제목
	private String todoContent;		// 할 일 내용
	private String complete;		// 할 일 완료 여부("Y" / "N")
	private String regDate;			// 할 일 등록일 (String 으로 변환)

}
