
fetch("https://mattisrobot.000webhostapp.com/data.json")
.then(response => {
   return response.json();
})
.then(jsondata => populate(jsondata));

function populate(data){
	main = document.getElementById("main")
	main1 = createHTML("div",[["class","sectionI"]],"")
	intro = "I've always envisioned solving problems with smart technology systems.  From a young age I have been imagining and prototyping solutions which have grown to use microcontrollers and single-board computers.  Through my projects I've developed my CAD and 3D printing abilities, and my app development and programming abilities.  In 2017 I ordered and assembled a 3D printer kit which I used in most of my physical projects.  Starting with my most recent project this website lists some of my creations.<br><br>If you have any questions please contact me at mmellary@gmail.com"
	main1.appendChild(createHTML("h1",[],"Matt Mellary"))
	main1.appendChild(createHTML("p",[],intro))
	main.appendChild(main1)
	
	for (var key in data){
		//add to table of contents
		ToC = document.getElementById("navTextList")
		ToC.appendChild(createHTML("a", [["class","index"],["href","#"+key]], data[key]["name"] + "<br><br>"))

		// add div to page
		section = createHTML("div", [["id",key.slice(0,-1)],["class","section"]],"")
		headDiv = createHTML("div",[["class","flexbox"]],"")
		headDiv.appendChild(createHTML("h2",[["class","sectionHead"]],data[key]["name"]))
		headDiv.appendChild(createHTML("h3",[["class","sectionDate"]],"  -  " + data[key]["date"]))
		section.appendChild(headDiv)
		for (var media in data[key]["media"]){
			if (data[key]["media"][media]["type"] == "link"){
				section.appendChild(createHTML("a",[["class","mediaLink"],["href",data[key]["media"][media]["src"]]],"" + data[key]["media"][media]["src"]))
			}
		}
		desc = ""
		snippets = []
		for (var text in data[key]["info"]){
			item = data[key]["info"][text]
			if (item["type"] == "description"){
				desc = item["src"]
			}
			if (item["type"] == "snippet"){
				snippets.push(item["src"])
			}
		}
		section.appendChild(createHTML("p",[["class","sectionDesc"]],desc))
		for (var snippet in snippets){
			section.appendChild(createHTML("p",[["class","sectionSnip"]],snippet))

		}

		//create media table
		grid = createHTML("div",[["class","grid"]],"")
		for (var media in data[key]["media"]){
			item = data[key]["media"][media]
			switch(item["type"]){
				case "linked-video":
					grid.appendChild(createHTML("iframe",[["class","linked-video"],["src",item["src"]],["allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"],["frameborder","0"],["title","Video Player"]],""))
					break
				case "image":
					grid.appendChild(createHTML("img",[["class","image"],["src",item["src"]]]))
					break
			}
		}
		section.appendChild(grid)

		main.appendChild(section)

	}
}









function createHTML(type, info, inner){
	a = document.createElement(type)
	a.innerHTML = inner
	info.forEach(element => {
		a.setAttribute(element[0], element[1])
	});
	return a
}



function toggleNav(nav, navText) {

	if (nav.style.width == "6vw" || nav.style.width == "") {
		nav.style.width = "24vw";
		document.getElementById("main").style.marginLeft = "24vw";
		$("#navTextList").fadeIn(250);
	}
	else {
		nav.style.width = "6vw";
		document.getElementById("main").style.marginLeft = "6vw";

		$("#navTextList").fadeOut(250);

	}
}



