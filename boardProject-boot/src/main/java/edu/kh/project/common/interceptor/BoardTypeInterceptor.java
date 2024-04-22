package edu.kh.project.common.interceptor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import edu.kh.project.board.model.service.BoardService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BoardTypeInterceptor  implements HandlerInterceptor{
	
	// BoardService 의존성 주입
	@Autowired
	private BoardService service;
	
	

	// 전처리
	@Override
	public boolean preHandle(HttpServletRequest request, 
							HttpServletResponse response, 
							Object handler)
			throws Exception {
		
		// application scope :
		// - 서버 종료 시 까지 유지되는 Servlet 내장 객체
		// - 서버 내에 딱 한 개만 존재!
		// 		--> 모든 클라이언트가 공용으로 사용
		
		
		
		// application scope 객체 얻어오기
		ServletContext application = request.getServletContext();
		
		if(application.getAttribute("boardTypeList") == null) {
			
			log.info("boardTypeInterceptor - preHandle(전처리) 동작 실행");
			
			List<Map<String, Object>> boardTypeList = service.selectBoardTypeList();
			
			// 조회 결과를 application scope 에 추가
			application.setAttribute("boardTypeList", boardTypeList);
		}
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}
	
	

}
