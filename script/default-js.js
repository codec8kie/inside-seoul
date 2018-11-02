// JavaScript Document

// on 최소화
function on (e, n, f){
	return $(document).on(e, n, f);
}


// DRAG AND DROP
function drag (event){
	event.preventDefault();
	event.stopPropagation();
	$("#drop").css({ "background-color": "#70c93a", color: "white" });

	event.dataTransfer.dropEffect = "copy";
}

function dragLeave (event){
	$("#drop").css({ "background-color": "#eee", color: "black" });
}

var localArr = localStorage.getItem("tempArr");
var tempArr = localArr ? JSON.parse(localArr) : []; // storage
function drop (event){
	event.preventDefault();
	event.stopPropagation();
	$("#drop").css({ "background-color": "#eee", color: "black" });	

	var fileList = event.dataTransfer.files;
	var name_ko = $("#select-gu").val();
	for (var i = 0; i < fileList.length; i++){
		if (!fileList[i].type.match(/image.png/)&&!fileList[i].type.match(/image.jpeg/)&&!fileList[i].type.match(/video.mp4/)) {
			alert("지원하지 않는 파일 확장자명 입니다.");
			return;
		};


		var type = "image";
		if (fileList[i].type.match(/video.mp4/)){
			type = "video";
		};

		var obj = {
			name_ko: name_ko,
			file: fileList[i].name,
			type: type
		};

		tempArr.push(obj);
		localStorage.setItem("tempArr", JSON.stringify(tempArr));
		console.log(tempArr);

		// // IMAGE
		// var reader = new FileReader();
		// if (fileList[i].type.match(/image.png/)||fileList[i].type.match(/image.jpeg/)){
			
		// };

		// // VIDEO
		// if (fileList[i].type.match(/video.mp4/)){
		// 	var j = 0;
		// 	var reader = new FileReader();
		// 	reader.onload = function (){

		// 		var obj = {
		// 			name_ko: name_ko,
		// 			thumnail: fileList[j].name+"#t=120",
		// 			video: fileList[j].name,
		// 		};

		// 		tempArr.push(obj);
		// 		localStorage.setItem("tempArr", JSON.stringify(tempArr));
		// 		console.log(tempArr);
		// 		j++;
		// 	};

		// 	reader.readAsDataURL(fileList[i]);
		// };
	};
}


// Application
var app = {
	storage: {
		fakieStorage: []
	},
	load: {
		mapSvg: function (){
			// 초기화
			$(".wrap").html("");

			// fakieStorage 초기화, 추가
			app.storage.fakieStorage = [];
			app.storage.fakieStorage.push(1);

			// title 변경
			$(".center-title").text("인사이드서울");

			// hide Home icon
			$(".left-btn").hide("fade", 300);

			// contents
			$(".wrap").load("http://127.0.0.1/svg/map.svg");
		},
		aboutGu: function (obj){
			// 초기화
			$(".wrap").html("");

			// fakieStorage 추가하기
			app.storage.fakieStorage.push(obj);

			// show Home icon
			$(".left-btn").show("fade", 300);

			var nameKo = obj.name_ko;
			var nameEn = obj.name_en;
			var url = obj.url;
			var map = obj.map;
			var square = obj.square;
			var population = obj.population;
			var description = obj.description;

			// title 변경
			$(".center-title").text(nameKo + " 정보안내");

			// contents
			var pageWrapper = $("<div/>", {class: "page-wrapper"});
			var firstDiv = $("<div/>", {class: "first-div"});
			var secondDiv = $("<div/>", {class: "second-div"});

			var h1 = $("<h1/>", {text: nameKo + " " + nameEn});

			var table = $("<table/>", {});
			var tbody = $("<tbody/>", {});
			var firstTr = $("<tr/>", {});
				var firstTrFirstTd = $("<td/>", {text: "면 적 :"});
				var firstTrSecondTd = $("<td/>", {text: square});
				firstTr.append(firstTrFirstTd).append(firstTrSecondTd);

			var secondTr = $("<tr/>", {});
				var secondTrFirstTd = $("<td/>", {text: "인 구 :"});
				var secondTrSecondTd = $("<td/>", {text: population});
				secondTr.append(secondTrFirstTd).append(secondTrSecondTd);

			var thirdTr = $("<tr/>", {});
				var thirdTrFirstTd = $("<td/>", {text: "안내사이트 :"});
				var thirdTrSecondTd = $("<td/>", {});
				var thirdTrSecondTdA = $("<a/>", {href: url, text: url});
				thirdTrSecondTd.append(thirdTrSecondTdA);
				thirdTr.append(thirdTrFirstTd).append(thirdTrSecondTd);

			table.append(firstTr).append(secondTr).append(thirdTr);

			var p = $("<p/>", {text: description});

			var img = new Image();
			img.src = map;

			firstDiv.append(img);
			secondDiv.append(h1).append(table).append(p);
			pageWrapper.append(firstDiv).append(secondDiv);

			parendDiv = $("<div/>", {});
			
			// second-section
			listWrapper = $("<div/>", {class: "list-wrapper"});
			if (localArr){
				$.each(JSON.parse(localStorage.getItem("tempArr")), function (i, self){
					if (self.name_ko == nameKo){

						var div = $("<div/>", {});
						if (self.type != "image"){
							var img = new Image();
							img.src = "images/play_btn.png";
							img.width = 50;
							img.heigt = 50;
							img.setAttribute("class", "play_btn");
							img.setAttribute("data-src", "data/"+self.file);
							img.setAttribute("data-type", self.type);
							var video = $("<video/>", {width: 300, height: 200, "data-src": "data/"+self.file, "data-type": self.type});
							var source = $("<source/>", {src: "data/"+self.file+"#t=120", type: "video/mp4"});
							video.append(source);
							div.append(img).append(video);
						}else {
							var img = new Image();
							img.src = "data/" + self.file;
							img.width = 300;
							img.heigt = 200;
							img.setAttribute("data-src", "data/"+self.file);
							img.setAttribute("data-type", self.type);
							div.append(img);
						};
						
						listWrapper.append(div);
					};
				});
			};

			parendDiv.append(pageWrapper).append(listWrapper);

			$(".wrap").html(parendDiv);
		},
		adminPage: function (){
			// 초기화
			$(".wrap").html("");

			// fakieStorage 추가하기
			app.storage.fakieStorage.push(3);

			// show Home icon
			$(".left-btn").show("fade", 300);

			// title 변경
			$(".center-title").text("관리자페이지");

			// contents
			var adminWrapper = $("<div/>", {class: "admin-wrapper"});
			if (!sessionStorage["ID"]){
				var firstDiv = $("<div/>", {class: "box"});
				var inputId = $("<input/>", {type: "text", class: "login_id", placeholder: "Admin ID"});

				var secondDiv = $("<div/>", {class: "box"});
				var inputPw = $("<input/>", {type: "password", class: "login_pw", placeholder: "Password"});

				var thirdDiv = $("<div/>", {class: "box"});
				var submitBtn = $("<button/>", {text: "Login", class: "submit_btn"});

				firstDiv.append(inputId);
				secondDiv.append(inputPw);
				thirdDiv.append(submitBtn);

				adminWrapper.append(firstDiv).append(secondDiv).append(thirdDiv);
			}else {
				var label = $("<label/>", {for: "select-gu", text: "구 선택 : "});
				var selectBox = $("<select/>", {id: "select-gu"});

				// load to JSON
				$.getJSON("http://127.0.0.1/json/description.json", function (data){
					$.each(data, function (i ,self){
						$.each(self, function (j, mine){
							var option = $("<option/>", {value: mine.name_ko, text: mine.name_ko});
							selectBox.append(option);
						});
					});
				});

				var dropBox = $("<div/>", {id: "drop", text: "Drop HERE", "onDragOver": "drag(event);", "onDragLeave": "dragLeave(event);", "onDrop": "drop(event);"});

				label.append(selectBox);

				adminWrapper.append(label).append(dropBox);
			};

			$(".wrap").html(adminWrapper);
		}
	},
	readMoreAboutGu: function (){
		// path click
		on("click", "svg path", function (e){
			var id = $(this).attr("id");

			// load to JSON
			$.getJSON("http://127.0.0.1/json/description.json", function (data){
				$.each(data, function (i ,self){
					$.each(self, function (j, mine){
						if (mine.name_en == id){
							// object 전송
							app.load.aboutGu(mine);
						};
					});
				});
			});
		});
	},
	topBarSetting: function (){
		// Home icon click
		on("click", ".left-btn > a:first", function (e){
			app.load.mapSvg();
		});

		// fakie button click
		on("click", ".left-btn > a:last", function (e){
			app.storage.fakieStorage.pop();
			var sectionNumber = app.storage.fakieStorage.pop();
			switch (sectionNumber){
				case 1: app.load.mapSvg(); break;
				case 3: app.load.adminPage(); break;
				default: app.load.aboutGu(sectionNumber); break; // 2
			};
		});

		// admin page
		on("click", ".right-btn > a", function (e){
			app.load.adminPage();
		});
	},
	adminInterfaceSetting: function (){
		// 로그인
		on("click", ".submit_btn", function (e){
			var id = $(".login_id").val();
			var pw = $(".login_pw").val();

			if (!id&&!pw){
				alert("빈칸을 채워주세요.");
				return;
			};

			if (id == "admin" && pw == "1234"){
				sessionStorage["ID"] = "admin";
				app.load.adminPage();
				return;
			};

			alert("아이디 혹은 비밀번호가 틀렸습니다.");
		});
	},
	forUser: function (){
		on("click", ".list-wrapper img, .list-wrapper video", function (e){
			var src = $(this).data("src");
			var dialog = $("<div/>", {id: "dialog"});
			var html = "";
			if ($(this).data("type") != "image"){
				var video = $("<video/>", {autoplay: "autoplay"});
				var source = $("<source/>", {src: src, type: "video/mp4"});
				video.append(source);
				html = video;
			}else {
				var img = new Image();
				img.src = src;
				html = img;
			};

			$(dialog).html(html);
			$(dialog).dialog({
				title: "상세보기",
				width: 1024,
				height: 768,
				show: "fade",
				hide: "fade",
				buttons: {
					"닫기": function (){
						$(this).html("");
						$(this).dialog("close");
					}
				},
				modal: true
			});
		});
	},
	init: function (){
		// load to map.svg
		app.load.mapSvg();

		// top-bar setting
		app.topBarSetting();

		// 구 상세 보기
		app.readMoreAboutGu();

		// 관리자
		app.adminInterfaceSetting();

		// 상세보기 동작
		app.forUser();
	}
};


window.onload = function (){
	app.init();
};