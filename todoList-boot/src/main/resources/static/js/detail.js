// 목록으로 버튼 동작
const goToList = document.getElementById("goToList");

goToList.addEventListener("click", () => {

    location.href = "/";    // 메인 페이지 요청

});


// 완료 여부 변경 버튼 동작
const completeBtn = document.querySelector(".complete-btn");

completeBtn.addEventListener("click", (e) => {

    const todoNo = e.target.dataset.todoNo;     // data 속성 이용해 todoNo 값 얻어옴

    // console.log(todoNo);

    // Y <-> N

    let complete = e.target.innerText;  // 기존 완료 여부 값 얻어오기

    complete = (complete === 'Y') ? 'N' : 'Y';

    // 완료 여부 수정 요청하기
    location.href = `/todo/changeComplete?todoNo=${todoNo}&complete=${complete}`;

});

// -----------------------------------------------------------------------------------
// 수정 버튼 클릭 시 동작
const updateBtn = document.querySelector("#updateBtn");

updateBtn.addEventListener("click", (e) => {

    // data-todo-no 얻어오기
    const todoNo = e.target.dataset.todoNo;

    location.href = `/todo/update?todoNo=${todoNo}`;

})

// 삭제 버튼 클릭 시 동작
const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click", (e) => {

    const todoNo = e.target.dataset.todoNo;

    if(confirm("삭제 하시겠습니까?")) { // 확인 -> true
        
        location.href = `/todo/delete?todoNo=${todoNo}`;

    }



});