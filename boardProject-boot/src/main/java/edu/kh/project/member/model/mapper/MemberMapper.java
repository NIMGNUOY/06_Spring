package edu.kh.project.member.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.project.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	
	
	/**	로그인 SQL 실행
	 * @param memberEmail
	 * @return loginMember
	 */
	Member login(String memberEmail);

	
	/** 이메일 중복검사
	 * @param memberEmail
	 * @return count
	 */
	int checkEmail(String memberEmail);


	/** 닉네임 중복 검사
	 * @param nickname
	 * @return count
	 */
	int checkNickname(String nickname);


	/** 회원 가입 SQL 실행
	 * @param inputMember
	 * @return result
	 */
	int signup(Member inputMember);


	/** 전체 회원 조회
	 * @return memberList
	 */
	List<Member> selectMemberList();


	int resetPw(Map<String, Object> map);


	

	
	

	
	
}
