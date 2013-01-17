$( document ).delegate("#newsstream", "pageinit", function() {
  
  var highlightedValue = "No",
	    hideForm = false;

	//getElementById Function
	function ge (x) {
        return document.getElementById(x);
	}
	
	function getImage(catName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSource = newImage.setAttribute("src", "img/"+ catName +"Icon.png");
		newImage.setAttribute("id", "pic");
		imageLi.appendChild(newImage);
	}
	
	function sortObjectsByStartDate(obj, key) {
	  obj.sort(function() {
	  	//console.log(obj);
		return function (a, b){
		  var startDateA = a[key];
		  var starteDateB = b[key];
		  if (startDateA === starteDateB) {
			return 0;

		  }
		  return startDateA > starteDateB ? 1 : -1;
		};
	  }());
	}
	  
	$.each(localStorage, function(key, val) {
	  key = localStorage.key(key);
	  val = localStorage.getItem(key);
	  var objValue = $.parseJSON(val);
	  var todoList = $.makeArray(objValue);
	  
	  //console.log(todoList);
	  $.each(todoList, function(key, val) {
	  	sortedValue = sortObjectsByStartDate(todoList[key].startDate, "startDate");
	  	console.log(sortedValue);
	  });

	 //  for (n in objValue) {
		// console.log(objValue[n][0] + objValue[n][1]);
	 //  }
	});
	

	//This will be replaced with the above code once it's complete
		if (localStorage.length >= 1) {
			//Write data from local storage to the browser
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement('ul');
			makeList.setAttribute("data-role", "listview");
			makeList.setAttribute("data-filter", "true");
			makeDiv.appendChild(makeList);
			var insideContent = ge('newsContent');
			insideContent.appendChild(makeDiv);
			ge('items').style.display = "block";
			for (var i = 0; i < localStorage.length; i++) {
				var makeLi = document.createElement('li');
				var linkLi = document.createElement('li');
				makeList.appendChild(makeLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				//Convert the value back to an object
				var obj = JSON.parse(value);
				var makeSubList = document.createElement('ul');
				makeLi.appendChild(makeSubList);
				getImage(obj.category[1], makeSubList);
				for(var n in obj){
					var makeSubLi = document.createElement('li');
					if((obj.highlighted[1] === "Yes")) {
						if(obj.priority[1] === "1") {
							makeSubList.setAttribute("id", "highlightGreen");
						} else if(obj.priority[1] === "2") {
							makeSubList.setAttribute("id", "highlightYellow");
						}else if(obj.priority[1] === "3") {
							makeSubList.setAttribute("id", "highlightRed");
						}
					}
					makeSubList.appendChild(makeSubLi);
                    makeSubLi.innerHTML = obj[n][0] + " " + obj[n][1];
					makeSubList.appendChild(linkLi);
				}
				
				//makeItemLinks(localStorage.key(i), linkLi); //Create our edit and delete links for each item
			}
		} else{
			alert("There is no data to display.");
			//autoFillData();
		}
	
});