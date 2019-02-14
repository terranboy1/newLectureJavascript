//Ex8-노드 삽입과 바꾸기
window.addEventListener("load", function(){

    var section = document.querySelector("#section8");

    var noticeList = section.querySelector(".notice-list");
    var tbodyNode =noticeList.querySelector("tbody");
    var upButton = section.querySelector(".up-button");
    var downButton = section.querySelector(".down-button");

    var currentNode = tbodyNode.firstElementChild; //.children[0]

    downButton.onclick = function(){
        var nextNode = currentNode.nextElementSibling;

        if(nextNode == null){
            alert("더이상 내릴 수 없습니다.");
            return;
        }

        // tbodyNode.removeChild(nextNode); //이거는 다음꺼 삭제하고 다시 앞에 만들고 하려는 것인데
        // tbodyNode.insertBefore(nextNode, currentNode); //이거 한줄이면 그냥 자리바꿈, 이동임.
        currentNode.insertAdjacentElement("beforebegin", nextNode); //현재노드 기준으로, 야 내앞으로와. 내 뒤로 가.

    };

    upButton.onclick = function(){
        var prevNode = currentNode.previousElementSibling;

        if(prevNode == null){
            alert("더이상 올릴 수 없습니다.");
            return;
        }

        // tbodyNode.removeChild(currentNode);
        // tbodyNode.insertBefore(currentNode, prevNode);
        currentNode.insertAdjacentElement("afterend", prevNode);

        
    };

});


//Ex7 : 엘리먼트 노드의 속성& CSS속성 변경
window.addEventListener("load", function(){
    var notices = [ //JSON 표기법으로 적어본 데이터
        {id:5, title:"퐈이야~~", regDate:"2019-01-26", writerId:"newlec", hit:0},
        {id:6, title:"나좀 복제해줘~", regDate:"2019-01-26", writerId:"newlec", hit:17}
    ];

    var section = document.querySelector("#section7");

    var noticeList = section.querySelector(".notice-list"); //테이블
    var tbodyNode =noticeList.querySelector("tbody");
    var cloneButton = section.querySelector(".clone-button");
    var templateButton = section.querySelector(".template-button");

    cloneButton.onclick = function(){
        var trNode = noticeList.querySelector("tbody tr"); //querySelector를 쓰면 tr중에서 tbody하나만 가져옴. queryselectorAll을 쓰면 tbody tr:first-child 이런식으로 써줘야함. 
        var cloneNode = trNode.cloneNode(true); //false는 껍데기만 복제, true는 모든 자손들까지 복제
        var tds = cloneNode.querySelectorAll("td");
        tds[0].textContent = notices[0].id;
        tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';
        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerId;
        tds[4].textContent = notices[0].hit;

        tbodyNode.append(cloneNode);
    };

    templateButton.onclick = function(){
        var template = section.querySelector("template");
        var cloneNode = document.importNode(template.content, true);
        var tds = cloneNode.querySelectorAll("td");
        tds[0].textContent = notices[0].id;
        tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';

        var aNode = tds[1].children[0];
        aNode.href=notices[0].id;
        aNode.textContent=notices[0].title;

        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerId;
        tds[4].textContent = notices[0].hit;

        tbodyNode.append(cloneNode);
    };
});

//Ex6-노드조작: 메뉴추가(createTextNode, Element)
window.addEventListener("load", function(){
    var section = document.querySelector("#section6");

    var titleInput=section.querySelector(".title-input");
    var menuListUl = section.querySelector(".menu-list");
    var addButton = section.querySelector(".add-button");
    var delButton = section.querySelector(".del-button");

    addButton.onclick = function(){  //추가버튼 클릭하면 노드 실행되는 부분 코드 작성
        

        //innerHTML은 안쪽에 태그문자열을 넣으면 읽어서 노드객체들을 만들어준다. 쉬운방법.
        //아래같은 삽질 안해도된다;
        var title = titleInput.value;

        //근데 +=로 추가하면 매번 새로운 문자열객체가 생성되므로 비효율. 코드는 편한데 비효율. 귀찮지만 아래 코드처럼 써야할 때도 있따.(성능이 더 나음)
        // menuListUl.innerHTML += '<li><a href="">'+title+'</a></li>'; 
        var html = '<a href="">'+title+'</a>'; 
        var li = document.createElement("li");
        li.innerHTML = html; //이건 누적이 아니고 대입하는 방식

        // menuListUl.append(title); //이건 노드가 아니라 title(입력값)을 바로 넣는 방식인데 예전에 appendChild()만 있었을 땐 불가능했다. 근데 추후에 append("문자열")메서드가 나와서 이렇게 할 수 있게 됨. (노드 여러개 넣을 수 있음.)
        menuListUl.append(li);
        // menuListUl.appendChild(li);

        /* 이렇게 직접만들면 일일이 코드쳐야되고 복잡하다. 이렇게 안써..
        var title = titleInput.value;
        var txtNode = document.createTextNode(title); //사용자 입력값

        var aNode = document.createElement("a");
        aNode.href="";
        aNode.appendChild(txtNode); //a노드의 자식. 텍스트노드

        var liNode = document.createElement("li"); //아직 aNode는 포함안됐음.
        liNode.appendChild(aNode); //여기서 a노드 포함시킴.
 
        menuListUl.appendChild(liNode);
        */

        /*
        var title = titleInput.value;
        var txtNode = document.createTextNode(title); //사용자 입력값
        menuListDiv.appendChild(txtNode); //메뉴리스트에 차곡차곡 추가한다.
        */
    };

    delButton.onclick = function(){ //삭제버튼 클릭하면 노드 실행되는 부분 코드 작성
        // var txtNode = menuListUl.childNodes[0]; //맨 앞에놈부터 삭제하게끔. menulist의 첫번째 노드를 얻어와서 삭제.
        
        var liNode = menuListUl.children[0]; //childNodes는 모든 노드를 대상으로해서 0번째. children은 element노드만을 선별해서 0번째.
        // menuListUl.removeChild(liNode); //부모입장에서 삭제.
        liNode.remove(); //자식인 나를 지워.
    };
});

//Ex5 : 엘리먼트 노드의 속성 && CSS 속성 변경
window.addEventListener("load", function(){
    var section = document.querySelector("#section5");
    var srcInput = section.querySelector(".src-input");
    var imgSelect = section.querySelector(".img-select");
    var changeButton = section.querySelector(".change-button");
    var img = section.querySelector(".img");
    var colorInput = section.querySelector(".color-input");

    changeButton.onclick = function(){
        // img.src = "images/"+srcInput.value;
        img.src = "images/"+imgSelect.value; //option태그에 설정한 value값을 의미

        //img.style.border-color 안됨.
        //img.style["border-color"] = colorInput.value; //됨. 키값을 문자열로 전달하면 이용할 수 있음.
        img.style.borderColor = colorInput.value;
        console.log(img.className);
    };

    var input1 = box.children[0];
    var input2 = box.children[1];

    input1.value = "hello";
    input2.value = "okay";
});

//Ex4 : childNodes를 이용한 노드 선택
window.addEventListener("load", function(){
    var section4 = document.querySelector("#section4");
    var box = section4.querySelector(".box");

    // var input1 = box.childNodes[0]; //자식노드를 찾는다.
    // var input2 = box.childNodes[1]; //근데 childNodes로 하면 공백도 문자열 노드로 인식되어서 신경쓸 부분들이 생김. children을 보자.
    var input1 = box.children[0];
    var input2 = box.children[1];

    input1.value = "hello";
    input2.value = "okay";
});

//Ex3 : Selectors API Level1
//Select API를 이용해 선택을 쉽게 해보자.,
//querySelector - 단 하나의 Element검색 / querySelectorAll - 모든 Element검색
window.addEventListener("load", function(){
    var section3 = document.getElementById("section3");
        var txtX = section3.querySelector("input[name='x']"); //CSS selector 문법. id 선택자는 #였엇지. 쿼리셀렉터 굉장하고 편해~!
        var txtY = section3.querySelector(".txt-y"); //CSS selector의 표현방법이 풍부하고 정밀하기 때문에 id나 class만 선택하는 것과는 차원이 다르게 좋다.
        var btnAdd = section3.querySelector(".btn-add");
        var txtSum = section3.querySelector(".txt-sum");
    
    /*
    var inputs = section2.getElementsByTagName("input");

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */
    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});

//Ex2 : 엘리먼트 선택방법 개선하기
window.addEventListener("load", function(){
    var section2 = document.getElementById("section2");
        var txtX = section2.getElementsByClassName("txt-x")[0]; //Elements잖아. [0] 안붙이면 배열요소 다 불러오는 걸로 인식되기 때문에 1개밖에 없더라도 [0]을 붙여줬다고 한다.
        var txtY = section2.getElementsByClassName("txt-y")[0];
        var btnAdd = section2.getElementsByClassName("btn-add")[0];
        var txtSum = section2.getElementsByClassName("txt-sum")[0];
    
    /*
    var inputs = section2.getElementsByTagName("input");

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */
    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});

//Ex1 : 계산기 프로그램
window.addEventListener("load", function(){
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var btnAdd = document.getElementById("btn-add");
    var txtSum = document.getElementById("txt-sum");

    btnAdd.onclick = function(){
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});