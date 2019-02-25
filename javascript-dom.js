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

        //노드를 만드려면 어떻게해야할까? document객체의 기능을 이용해서만 만들 수 있는데,, 가장 주요하게 봐야할 부분이 Element노드와 Text노드를 동적으로 생성하는 방법이다.
        //Element노드 생성 방법: createElement
        //Text노드 생성 방법 : createTextNode
        //이 외에 다른 노드들 생성방법들이 있는데 위의 2개가 가장 주요한 것이라 이것들부터 학습한다.
        //근데 노드를 만든다고 눈에 보이는 것이 아니다. 노드를 만들었어도 메모리에 연결이 되지 않았기 때문에 화면에 출력되지 않는다.
        //Document객체의 append()를 이용해 노드에 붙여줘야만 메모리에 연결이 되고 출력이 되는 것이다.
        //이번 강에선 노드를 동적으로 추가/삭제하는 부분을 배우도록 한다.(append와 remove)

        //먼저, 텍스트 노드를 생성해 붙이는 방법을 보자. 대략의 순서는 이렇다.
        //1.텍스트 노드 생성. var txt = document.createTextNode("안녕하세요");
        //2. 텍스트 노드를 추가할 엘리먼트 노드 선택 var div1 = document.getElementById("div1");
        //3. 엘리먼트 노드에 텍스트 노드 추가하기 div1.appendChild(txt);

        //텍스트노드가 차곡차곡 추가된다.
        //var title=titleInput.value;
        //var textNode = document.createTextNode(title);
        //menuListUl = appendChild(textNode);
        //------------------------------------------------------------------------
        
        //그 다음, 엘리먼트 노드를 생성해 붙이는 방법을 보자. 
        //위의 텍스트 노드 붙이는 방법은 알긴 했지만 막상 써먹을 데가 없다.
        //<li><a href="">aaa</a></li> 이정도 엘리먼트 노드를 한방에 처리해야 좀 쓸만하지.
        //자, 그럼 고고싱.
        //위에 했던 방식으로 써보면..
        //var title=titleInput.value;
        //var textNode = document.createTextNode(title);
        //var aNode = document.createElement("a");
        //var liNode = document.createElement("li");
        //여기까진 문제가 없다.
        //노드는 계층구조를 잘 생각해야하는데 html코드 계층구조를 보면..
        //section의 자식노드인 ul노드. ul노드의 자식인 li노드. li노드의 자식노드인 a. a의 자식 노드인 텍스트 노드로 되어있다.(텍스트노드까지 포함이다 마.)
        //menuListUl.appendChild(liNode);
        //여기까지보면.. li까지만 연결되어 있고 a노드가 빠져잇다. 그래서 윗줄 코드의 위에
        //liNode.appendChild(aNode); 를 넣어줘야만 하는 것이다. 그럼 이게 끝일까?
        //a 노드엔 속성도, 그 아랜 텍스트 노드도 있다.
        //aNode.href="";
        //aNode.appendChild(textNode);
        //이것도 윗줄에 코드 추가해줘야되는데.. 겁나 번거롭네; 직접 만들면 ㅈ되겠다.
        //------------------------------------------------------------------------

        //좀더 효율적인 방법 없을까?
        //var title=titleInput.value;
        // menuListUl.innerHTML = '<li><a href="">'+title+'</a></li>';  //자바스크립트에선 더블쿼테이션이 겹치면 바깥걸 싱글 쿼테이션으로 한다.
        //윗 모양이 생소할텐데 눈여겨보도록 하자.
        //innerHTML은 안쪽에 태그문자열을 넣으면 읽어서 노드객체들을 만들어준다!!! 쉬운방법!
        //위에서 한 것 같은 복잡하고 비효율적 코드를 피할 수 있다.
        //어라..근데 위의 2줄을 실행해보니 사라진다;;ㅋㅋ
        //innerHTML을 쓰면 해당 라인의 값만 남기고 다 사라진다.
        //그래서 대입연산자 쓰면 안되고 아래 코드처럼 += 써줘야 기존것과 새로운 것이 남는다.
        //menuListUl.innerHTML += '<li><a href="">'+title+'</a></li>';   
        //근데 +=로 추가하면 겉으로 보기엔 문제가 없지만..
        //잘 생각해보자. 문서는 엘리먼트 노드 객체로 구성되어 있는데 객체와 문자열을 더하면
        //다 문자열로 변환이 되고 더 커진 문자열이 되고 다시 객체가 된다. 
        //즉, +=를 쓰면 매번 비효율이 생기는 것이다.(한번 쓰고 말거면 모르겠지만..)
        //코드는 편한데 비효율이란 얘기다!
        //그럼 어떻게 하지? 이것도 별로고 저것도 별로면 안되자너..
        //정답은 윗 코드를 약간만 손보면 된다.

        //var title = titleInput.value;
        //var  html = '<a href="">'+title+'</a>';
        //var li = document.createElement("li");
        //li.innerHTML = html;
        //menuListUl.appendChild(li);
        //이렇게하면 누적이 아니라 대입->붙이기 가 되는 것이다.

        //그리고 노드 붙일때 appendChild 계속 썼는데 이게 불편한 점이
        //appendChild에 텍스트 노드를 추가할 때 먼저 문자열을 createTextNode로 텍스트노드로 만들었어야 했다.
        //var textNode = document.createTextNode(title); 이렇게 말이다.
        //그냥 menuList.appendChild(title); 문자열을 넣으면 텍스트 노드로 인식이 안되는 것이다.(노드가 아니라고 에러가 난다.)
        //근데 메소드가 하나 추가되었다. append() 다.
        //이거는 마우스 올려놓으면 사용법이 나오는데 장점을 보면
        //노드를 한 번에 가변길이로 넣을 수 있고, menuList.append(node1, node2, node3, ...);
        //문자열을 넣으도 노드로 인식한다. append(title); 이 가능해진다.

        //자, 마지막으론 제일 효율적인 방법만 적어놓겠다.
        var title = titleInput.value;

        var html = '<a href="">' + title+ '</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        menuListUl.append(li);
    };

    delButton.onclick = function(){ //삭제버튼 클릭하면 노드 실행되는 부분 코드 작성
        
        //텍스트노드가 차례차례 삭제된다.
        // var txtNode = menuListUl.childNodes[0]; //맨 앞에놈부터 삭제하게끔. menulist의 첫번째 노드를 얻어와서 삭제.
        // menuListDiv.removeChild(txtNode);
        //------------------------------------------------------------------------
        
        //자, 엘리먼트노드를 지우는데 텍스트 노드 지울때 썼떤 위의 코드 두줄을 사용해도 될까?
        //정답은 ㄴㄴ. childNodes는 텍스트노드 포함이잖아.
        //엘리먼트 노드만 지울려면 children 이용해야 한다는 것 기억하지?
        //childNodes는 모든 노드를 대상으로해서 0번째. children은 element노드만을 선별해서 0번째다.
        //자 그럼 엘리먼트 노드 삭제 코드를 만들어보자.
        //var liNode = menuListUl.children[0];
        //menuListUl.removeChild(liNode); 
        //짠, 위의 두줄이 잘 작동한다. 부모입장에서 삭제하는 것이다.
        
        //자, 잠깐 정리좀 하면
        //appendChild에 대응하는 메소드가 removeChild메소드다.
        //위에서 보다시피 삭제하려면 꼭 부모를 통해 자식을 얻고나서 삭제해야 했다.

        //append메소드에 대응하는 메소드는 remove다.
        //append메소드가 추가할 때 편했듯, 삭제할 때도 편하다.
        //부모 얻을 필요 없이 그냥 삭제하면 된다.
        //자식인 나를 지워 라는 뜻.
        var liNode = menuListUl.children[0];
        liNode.remove(); 
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
});

//Ex4 : childNodes를 이용한 노드 선택
window.addEventListener("load", function(){
    var section4 = document.querySelector("#section4");
    var box = section4.querySelector(".box");

    // var input1 = box.childNodes[0]; //자식노드를 찾는다.
    // var input2 = box.childNodes[1]; //근데 childNodes로 하면 공백도 문자열 노드로 인식되어서 신경쓸 부분들이 생김. 
    // children을 사용하면 문제 해결 children은 엘리먼트 태그들만 선택할 수 있게 해줌.
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
        var txtX = section3.querySelector("input[name='x']"); //CSS selector 문법. 쿼리셀렉터 굉장하고 편해~! 참고로 id 선택자는 #section3 이런식으로 하면 됨ㅋ
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