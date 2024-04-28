package edu.kh.project.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.kh.project.common.interceptor.BoardTypeInterceptor;

// 인터셉터가 어떤 요청을 가로챌지 설정하는 클래스

@Configuration	// 서버가 켜지면 내부 메서드를 모두 수행
public class InterceptorConfig implements WebMvcConfigurer{
	// WebMvcConfigurer : Spring MVC 프레임 워크에서 제공하는 인터페이스 중 하나로,
	//					스프링 구성을 커스터마이징하고 확장하기 위한 메서드를 제공함.
	// 					주소 웹 어플리케이션의 설정을 조정하거나 추가하는데 사용됨.
	
	// 인터셉터 클래스 Bean 등록
	@Bean	// 개발자가 만들어서 반환하는 객체를 Bean 등록
			// -> 관리는 Spring Container 가 수행
	public BoardTypeInterceptor boardTypeInterceptor() {
		
		return new BoardTypeInterceptor();
		
	}
	
	// 동작할 인터셉터 객체를 추가하는 메서드
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		// Bean 으로 등록된 BoardTypeInterceptor 를 얻어와서 매개변수로 전달
		registry.addInterceptor( boardTypeInterceptor() )
		.addPathPatterns("/**") 	// 가로챌 요청 주소를 지정
									// /** : "/" 이하의 모든 요청 주소
		// 가로채지 않을 주소를 지정
		.excludePathPatterns("/css/**", "/js/**", "/images/**", "/favicon.ico");
		
	}

}


























