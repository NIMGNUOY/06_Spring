// 쿠키에서 key 가 일치하는 value 얻어오기 함수

// 쿠키는 "K=V; K=V; K=V ..." 형식

// 배열.map(함수) : 배열의 각 요소를 이용해 함수 수행 후 
//                 결과값으로 새로운 배열을 만들어서 반환 
const getCookie = (key) => {

  // document.cookie = "test" + "=" + "유저일";

  const cookies = document.cookie;  // "K=V; K=V"

  // console.log(cookies);
  // saveId=user01@kh.or.kr; test=유저일

  // cookies 문자열을 배열 형태로 변환
  const cookieList = cookies.split("; ")    // ["K=V", "K=V", "K=V"]
                            .map( el => el.split("=") );   // ["K", "V"] ...

  // console.log(cookieList);

  // 배열 -> 객체로 변환 (다루기 쉬움)
  const obj = {};   // 비어있는 객체 선언

  for(let i = 0; i < cookieList.length; i++) {
    const k = cookieList[i][0]; // key 값
    const v = cookieList[i][1]; // value 값
    obj[k] = v; // 객체에 추가
  }

  // console.log(obj);
  // saveId: "user01@kh.or.kr"
  // test: "유저일"

  return obj[key];  // 매개 변수로 전달받은 key 와 obj 객체에 
                    // 저장된 키가 일치하는 요소의 value 값 반환

};

// console.log( getCookie("saveId") );

const loginEmail = document.querySelector("#loginForm input[name='memberEmail']");

// 로그인 안된 상태인 경우에 수행
if(loginEmail != null) {  // 로그인창의 이메일 입력부분이 화면에 있을 때

  // 쿠키 중 key 값이 "saveId"인 요소의 value 값 얻어오기
  const saveId = getCookie("saveId");   // undefined or 이메일

  // saveId 값이 있을 경우
  if(saveId != undefined) {
    loginEmail.value = saveId;  // 쿠키에서 얻어온 값을 input 에 value 로 세팅

    // 아이디 저장 체크박스에 체크 해두기
    document.querySelector("input[name='saveId']").checked = true;
  }

};


// 이메일, 비밀번호 미작성 시 로그인 막기
const loginForm = document.querySelector("#loginForm");

const loginPw = document.querySelector("#loginForm input[name='memberPw']");

// loginForm 이 화면에 존재할 때 (== 로그인 상태 아닐 때)
if(loginForm != null) {

  // 제출 이벤트 발생 시
  loginForm.addEventListener("submit", (e) => {

    // 이메일 미작성
    if(loginEmail.value.trim().length === 0) {
      alert("이메일을 작성해주세요!");
      e.preventDefault();   // 기본 이벤트(제출) 막기
      loginEmail.focus();   // 초점 이동
      return;
    }

    // 비밀번호 미작성
    if(loginPw.value.trim().length === 0) {
      alert("비밀번호를 작성해주세요!");
      e.preventDefault();   // 기본 이벤트(제출) 막기
      loginPw.focus();   // 초점 이동
      return;
    }

  });

}


/*
const login1 = document.querySelector("#login1");
const login2 = document.querySelector("#login2");

login1.addEventListener("click", () => {

  const email = login1.innerText;

  fetch("/member/easyLogin?email=" + email)
  .then(resp => resp.text())
  .then(result => {

    if(result == null) {
      alert("로그인 실패");
      return;
    }

    location.href = "/";

  })

})


login2.addEventListener("click", () => {

  const email = login2.innerText;

  fetch("/member/easyLogin?email=" + email)
  .then(resp => resp.text())
  .then(result => {

    if(result == null) {
      alert("로그인 실패");
      return;
    }

    location.href = "/";

  })

})
*/

// ==================================================================================

// << 빠른 로그인 >>

const quickLoginBtns = document.querySelectorAll(".quick-login");

quickLoginBtns.forEach( (item, index) => {

  // item : 현재 반복 시 꺼내온 객체
  // index : 현재 반복 중인 인덱스

  // quickLoginBtns 요소인 button 태그 하나씩 꺼내서 이벤트 리스너 추가
  item.addEventListener("click", () => {

    const email = item.innerText; // 버튼에 작성된 이메일 얻어오기

    location.href = "/member/quickLogin?memberEmail=" + email;

  })

});

// ======================================================================================

// << 회원 목록 조회(비동기) >>


const selectMemberList = document.querySelector("#selectMemberList");

const memberList = document.querySelector("#memberList");

// td 요소를 만들고 text 추가 후 반환
const createTd = (text) => {

  const td = document.createElement("td");
  td.innerText = text;
  return td;  // <td>text</td>

}


selectMemberList.addEventListener("click", e => {

  fetch("/member/selectMemberList")
  .then(resp => resp.text())
  .then(result => {

    // 이전 내용 삭제
    memberList.innerHTML = "";

    const list = JSON.parse(result);

    console.log(list);

    /* 내 답
    for(let member of list) {

      const tr = document.createElement("tr");
      
      const arr = ['memberNo', 'memberEmail', 'memberNickname', 'memberDelFl'];
      
      for(let key of arr) {

        const td = document.createElement("td");

        td.innerText = member[key];

        tr.append(td);

      }

      memberList.append(tr);
    }
    */

    // tbody 에 들어갈 요소를 만들고 값 세팅 후 추가
    list.forEach( (member, index) => {
      // member : 현재 반복 접근 중인 요소
      // index : 현재 접근중인 인덱스

      // tr 만들어서 그 안에 td 만들고, append 후
      // tr 을 tbody 에 append

      const keyList = ['memberNo', 'memberEmail', 'memberNickname', 'memberDelFl'];

      const tr = document.createElement("tr");
      // <tr></tr>
      keyList.forEach( key => tr.append( createTd(member[key]) ) )

      // tbody 자식으로 tr 추가
      memberList.append(tr);

    })

  })


});


// =====================================================================================

// << 특정 회원 비밀번호 초기화 >>

const resetMemberNo = document.querySelector("#resetMemberNo");
const resetPw = document.querySelector("#resetPw");

resetPw.addEventListener("click", e => {

  // 입력받은 회원번호 얻어오기
  const inputNo = resetMemberNo.value;

  if(inputNo.trim().length == 0) {
    alert("회원 번호를 입력해주세요.")
    return;
  }

  fetch("/member/resetPw?memberNo=" + inputNo)
  .then(resp => resp.text())
  .then(result => {
    // result == 컨트롤러로부터 반환받아 TEXT 로 파싱한 값
    // "1" or "0"

    if(result > 0) {
      alert("초기화 성공!")
    } else {
      alert("해당 회원이 존재하지 않습니다.")
    }

  });

});