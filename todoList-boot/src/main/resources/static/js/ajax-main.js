/* 요소 얻어와서 변수에 저장 */
const totalCount = document.querySelector("#totalCount");
const completeCount = document.querySelector("#completeCount");
const reloadBtn = document.querySelector("#reloadBtn");

// 할 일 추가 관련 요소
const todoTitle = document.querySelector("#todoTitle");
const todoContent = document.querySelector("#todoContent");
const addBtn = document.querySelector("#addBtn");

// 할 일 목록 조회 관련 요소
const tbody = document.querySelector("#tbody");

// 할 일 상세 조회 관련 요소
const popupLayer = document.querySelector("#popupLayer");
const popupTodoNo = document.querySelector("#popupTodoNo");
const popupTodoTitle = document.querySelector("#popupTodoTitle");
const popupComplete = document.querySelector("#popupComplete");
const popupRegDate = document.querySelector("#popupRegDate");
const popupTodoContent = document.querySelector("#popupTodoContent");
const popupClose = document.querySelector("#popupClose");

// 상세 조회 버튼
const deleteBtn = document.querySelector("#deleteBtn");
const updateView = document.querySelector("#updateView");
const changeComplete = document.querySelector("#changeComplete");

// 수정 레이어 버튼
const updateLayer = document.querySelector("#updateLayer");
const updateTitle = document.querySelector("#updateTitle");
const updateContent = document.querySelector("#updateContent");

const updateBtn = document.querySelector("#updateBtn");
const updateCancel = document.querySelector("#updateCancel");





// 전체 Todo 개수 조회 및 출력하는 함수 정의
function getTotalCount() {
    
    // 비동기로 서버(DB)에서 전체 Todo 개수 조회하는 fetch() API 코드 작성
    // (fetch : 가지고 오다.)
    fetch("/ajax/totalCount")    // 비동기 요청 수행 -> Promise 객체 반환
    .then(response => {
        // response : 비동기 요청에 대한 응답이 담긴 객체
        
        console.log("response : " , response);
        // response.text() : 응답 데이터를 문자열/숫자 형태로 변환한
        //                  결과를 가지는 Promise 객체 반환
        return response.text();
    })
    // 두 번째 then의 매개변수 (result) 
    // == 첫번째 then에서 반환된 Promise 객체의 PromiseResult 값
    .then(result => {
        // result 매개변수 == Controller 메서드에서 반환된 값
        console.log("result : " , result);

        // #totalCount 요소의 내용을 result 변경
        totalCount.innerText = result;
    });

};


// completeCount 값 비동기 통신으로 얻어와서 화면 출력
function getCompleteCount() {

    // fetch() : 비동기로 요청해서 결과 데이터 가져오기
    
    // 첫번째 then 의 response : 응답 결과, 요청 주소, 응답 데이터 등이 담겨있음

    // response.text() : 응답 데이터를 text 형태로 변환(단일값만 가능)

    // 두번째 then 의 result : 첫번째 then 에서 text 로 변환된 응답 데이터

    fetch("/ajax/completeCount").then(response => {
        return response.text();
    })
    .then(result => {
        completeCount.innerText = result;
    })

};

// 새로고침 버튼이 클릭 되었을 때 
reloadBtn.addEventListener("click", () => {
    getTotalCount();    // 비동기로 전체 할 일 개수 조회
    getCompleteCount(); // 비동기로 완료된 할 일 개수 조회
})


//-------------------------------------------------------------------------------------------

// 할 일 추가 버튼 클릭 시 동작
addBtn.addEventListener("click", () => {

    // 비동기로 할 일 추가하는 fetch() 코드 작성
    // - 요청 주소 : "/ajax/add"
    // - 데이터 전달 방식(method) : "POST" 방식
    
    // 파라미터를 저장한 JS 객체
    const param = {
        // KEY : VALUE
        "todoTitle" : todoTitle.value,
        "todoContent" : todoContent.value
    };

    fetch("/ajax/add", {
        // Key : Value
        method : "POST",    // POST 방식 요청
        headers : {"Content-Type" : "application/json"}, // 요청 데이터의 형식을 JSON 으로 지정
        body : JSON.stringify(param)    // param 객체를 JSON(string)으로 변환
    })
    .then(resp => resp.text())  // 반환된 값을 text 로 변환
    .then(temp => {     // 첫번째 then 에서 반환된 값 중 변환된 text 를 temp 에 저장
        
        if(temp > 0) {  // 성공
            alert("추가 성공!!")
            
            // 추가 성공한 제목, 내용 지우기
            todoTitle.value = "";
            todoContent.value = "";

            // 할 일이 추가 되었기 때문에 전체 Todo 개수 다시 조회
            getTotalCount();

            // 할 일 목록 다시 조회
            selectTodoList();

        } else {    // 실패
            alert("추가 실패..");
        
        }

    })
});

//-------------------------------------------------------------------------------------------

// 비동기 (ajax)로 할 일 상세 조회하는 함수
const selectTodo = (url) => {
    // 매개변수 url == "/ajax/detail?todoNo=10" 형태의 문자열

    // response.json() :
    // - 응답 데이터가 JSON 인 경우 이를 자동으로 Object 형태로 변환하는 메서드
    // == JSON.parse(JSON 데이터)
    
    fetch(url)
    .then(resp => resp.json())
    .then(todo => {
        // 매개변수 todo :
        // - 서버 응답(JSON)이 Object 로 변환된 값
        
        //const todo = JSON.parse(result);

        console.log(todo);

        // popup Layer 에 조회된 값을 출력
        popupTodoNo.innerText = todo.todoNo;
        popupTodoTitle.innerText = todo.todoTitle;
        popupComplete.innerText = todo.complete;
        popupRegDate.innerText = todo.regDate;
        popupTodoContent.innerText = todo.todoContent;

        // popup Layer 보이게 하기
        popupLayer.classList.remove("popup-hidden");

        // update Layer 가 열려있으면 숨기기 
        // -> 할 일 목록 클릭시 updateLayer 숨기고 상세조회 팝업창 띄우기
        updateLayer.classList.add("popup-hidden");

    });

};

// -----------------------------------------------------------------------------------------

// popup layer 의 x 버튼 (#popupClose) 클릭 시 닫기
popupClose.addEventListener("click", () => {
    
    popupLayer.classList.add("popup-hidden");

})
//-------------------------------------------------------------------------------------------


// 비동기로 할 일 목록을 조회하는 함수
const selectTodoList = () => {

    fetch("/ajax/selectList")
    .then(resp => resp.text())  // 응답 결과를 text 로 변환
    .then(result => {
        console.log(result);
        console.log(typeof result);     // 객체가 아닌 string 형태

        // 문자열은 가공은 할 수 있지만 너무 힘들다
        // -> JSON.parse(JSON 데이터) 이용

        // JSON.parse(JSON데이터) : string -> object
        // - string 형태의 JSON 데이터를 JS Object 타입으로 변환

        // JSON.stringify(JS Object) : object -> string
        // JS Object 타입을 string 형태의 JSON 데이터로 변환
        const todoList = JSON.parse(result);

        console.log(todoList);

        //---------------------------------------------------------------------------------------

        // 기존에 출력되어 있던 할 일 목록을 모두 삭제
        tbody.innerHTML = "";

        // #tbody 에 tr/td 요소를 생성해서 내용 추가
        for(let todo of todoList) {     // 향상된 for 문
            
            // tr 태그 생성
            const tr = document.createElement("tr");

            const arr = ['todoNo', 'todoTitle', 'complete', 'regDate'];

            for(let key of arr) {
                const td = document.createElement("td");

                // 제목인 경우
                if(key === 'todoTitle') {
                    const a = document.createElement("a");  // a 태그 생성
                    a.innerText = todo[key];    // 제목을 a 태그 내용으로 대입
                    a.href = "/ajax/detail?todoNo=" + todo.todoNo;
                    td.append(a);
                    tr.append(td);

                    // a 태그 클릭 시 기본 이벤트(페이지 이동) 막기
                    a.addEventListener("click", (e) => {
                        e.preventDefault(); 

                        // 할 일 상세 조회 비동기 요청
                        // e.target.href : 클릭된 a 태그의 href 속성 값
                        selectTodo(e.target.href);
                    });

                    continue;
                }

                td.innerText = todo[key];
                tr.append(td);
            }

            // tbody 의 자식으로 tr(한 행) 추가
            tbody.append(tr);

        }

    })

};

// ----------------------------------------------------------------------------------------

// 삭제 버튼 클릭 시 
deleteBtn.addEventListener("click", () => {
    
    // 취소 클릭 시 아무것도 안함
    if( !confirm("정말 삭제하시겠습니까?") ) { return; }

    // 삭제할 할 일 번호 얻어오기
    const todoNo = popupTodoNo.innerText;   // #popupTodoNo 내용 얻어오기

    // 비동기 DELETE 방식 요청
    fetch("/ajax/delete", {
        method : "DELETE",  // DELETE 방식 요청 -> @DeleteMapping 처리

        // 데이터 하나를 전달해도 application/json 작성
        headers : {"Content-type" : "application/json"},
        body : todoNo   // todoNo 값을 body 에 담아서 전달
                        // -> @RequestBody 로 꺼냄
    })
    .then( resp => resp.text() )
    .then( result => {

        if(result > 0) {    // 삭제 성공
            
            alert("삭제 되었습니다");

            // 상세 조회 창 닫기
            popupLayer.classList.add("popup-hidden");

            // 전체, 완료된 할 일 개수 다시 조회
            // + 할 일 목록 다시 조회
            getTotalCount();
            getCompleteCount();
            selectTodoList();

        } else {            // 삭제 실패
            alert("삭제 실패..");
        }

    });

});

//------------------------------------------------------------------------------------------

// 완료 여부 변경 클릭 시 
changeComplete.addEventListener("click", () => {

    // 변경 할 일 번호, 완료 여부 (Y <-> N)
    const todoNo = popupTodoNo.innerText;

    const complete = (popupComplete.innerText === 'Y') ? 'N' : 'Y';

    // SQL 수행에 필요한 값을 객체로 묶음
    const param = {
        "complete" : complete,
        "todoNo" : todoNo
    }

<<<<<<< HEAD
    // 비동기로 완료 여부 변경
=======
    console.log(param);
>>>>>>> 24da8d638f082748be11ad3eb07cf64d3632ed0b

    fetch("/ajax/changeComplete", {
        method : "PUT",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(param)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {

            // update 된 DB 데이터를 다시 조회해서 화면에 출력 -> 서버 부하가 큼

            // selectTodo();
            // 서버 부하를 줄이기 위해 상세 조회에서 Y/N 만 바꾸기
            popupComplete.innerText = complete;
            
            // getCompleteCount();
            // 서버 부하를 줄이기 위해 완료된 Todo 개수 +-1
            const count = Number (completeCount.innerText);
            
            if(complete === 'Y') completeCount.innerText = count + 1;
            else                 completeCount.innerText = count - 1;
            
            alert("할 일 완료 여부 변경 성공!!");
            // 서버 부하 줄이기 가능 -> 코드 조금 복잡
            selectTodoList();

        } else {
            alert("완료 여부 변경 실패..");
        }

    })

});

// ------------------------------------------------------------------------------------------------------

// 수정 버튼 클릭 시
updateView.addEventListener("click", () => {
   
    

});


//-------------------------------------------------------------------------------------


// 상세 조회에서 수정 버튼 (#updateView) 클릭 시
updateView.addEventListener("click", () => {

    // 기존 팝업 레이어 숨기기
    popupLayer.classList.add("popup-hidden");

    // 수정 레이어 보이게 하기
    updateLayer.classList.remove("popup-hidden");

    // 수정 레이어 보일 때
    // 팝업 레이어에 작성된 제목, 내용을 얻어와 세팅
    updateTitle.value = popupTodoTitle.innerText;
    updateContent.value = popupTodoContent.innerHTML.replaceAll("<br>", "\n");
    // HTML 화면에서 줄바꿈이 <br> 로 인식되고 있는데
    // textarea 에서는 \n 으로 바꿔줘야 줄바꿈으로 인식된다.
    // textarea 에서는 줄바꿈이 <br> 이 아닌 \n 이다!! -> <br> 을 \n으로 바꾸기

    // 수정 레이어 -> 수정 버튼에 data-todo-no 속성 추가
    updateBtn.setAttribute("data-todo-no", popupTodoNo.innerText);

});

// -----------------------------------------------------------------------------------------

// 수정 레이어에서 취소 버튼(#updateCancel) 클릭 시
updateCancel.addEventListener("click", () => {
    // 수정 레이어 숨기기
    updateLayer.classList.add("popup-hidden");
    // 팝업 레이어 보이기
    popupLayer.classList.remove("popup-hidden");

});

// ------------------------------------------------------------------------------------------

updateBtn.addEventListener("click", e => {

    // 서버로 전달해야되는 값을 객체로 묶어둠
    const obj = {
        "todoNo" : e.target.dataset.todoNo,
        "todoTitle" : updateTitle.value,
        "todoContent" : updateContent.value
    };

    // 비동기 요청
    fetch("/ajax/update", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {

            alert("수정 성공!!")
            // 수정 레이어 숨기기
            updateLayer.classList.add("popup-hidden");

            // 목록 다시 조회
            selectTodoList();


            popupTodoTitle.innerText = updateTitle.value;

            popupTodoContent.innerHTML = updateContent.value.replaceAll("\n", "<br>");

            popupLayer.classList.remove("popup-hidden");


            // 수정 레이어에 있는 남은 흔적 제거
            updateTitle.value = "";
            updateContent.value = "";
            updateBtn.removeAttribute("data-todo-no");  // 속성제거

        } else {
            alert("수정 실패..");
        }

    })

});



getTotalCount();    // 함수 호출
getCompleteCount();
selectTodoList();