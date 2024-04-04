package edu.kh.todo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.todo.model.dto.Todo;
import edu.kh.todo.model.service.TodoService;
import lombok.extern.slf4j.Slf4j;

@Controller		// 요청 / 응답 제어 역할 명시 + Bean 등록
@Slf4j			// log 객체 자동 생성 어노테이션
public class MainController {
	
	// 유지, 보수에 용이 + 유연성
	@Autowired	// DI (의존성 주입)
	private TodoService service;
	
	@RequestMapping("/")	// 메인 페이지(최상위 페이지)
	public String mainPage(Model model) {
		
		// 의존성 주입(DI) 확인 ( 진짜 Service 객체 들어옴)
		log.debug("service : " + service);
		// service : edu.kh.todo.model.service.TodoServiceImpl@64d0bca
		
		// Service 메서드 호출 후 결과 반환 받기(목록, 카운트 조회)
		Map<String, Object> map = service.selectAll();
		
		
		// map 에 담긴 내용 추출
		List<Todo> todoList = (List<Todo>) map.get("todoList");	// Object -> List<Todo> 다운캐스트
		int completeCount = (int) map.get("completeCount");	// Object -> int 다운캐스트
		
		// Model : 값 전달용 객체(request scope) + session 변환 가능
		model.addAttribute("todoList", todoList);
		model.addAttribute("completeCount", completeCount);
		
		
		// 접두사 : classpath:/templates/
		// common/main
		// 접미사 : .html
		// --> 이쪽으로 forward
		return "common/main";
	}

}














