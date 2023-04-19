//var array = ["apple", "orange", "banana", "kiwi"];
// var array = [];


// var fruitButton = document.querySelector("#b2");
// console.log("fruit button element", fruitButton);

// fruitButton.onclick = function () {
// 	console.log("fruit button was clicked");
	
// 	var randomIndex = Math.floor(Math.random() * array.length);
// 	//create random index
// 	var randomFruit = array[randomIndex];
// 	//choosing string from array with the random index
// 	var fruitSpan = document.querySelector("#fruit");
// 	//query span element
// 	fruitSpan.innerHTML = randomFruit;
// 	//changing what is in the span element


// 	var listelement = document.querySelector("#ol1");
// 	console.log("my list element", listelement);
	
// 	var listFact = document.createElement("li");
// 	listFact.innerHTML = randomFruit;
// 	listelement.appendChild(listFact);
	
// };




function loadMoviesFromServer() {
	fetch("http://localhost:8080/games", {
		credentials: 'include'
	}).then(function (response) {
	response.json().then(function (data){
		console.log("data recieved from server:", data);
		array = data;
		//array = data.record;
		//^can be written like this^

		var listelement = document.querySelector("#ol1");
		console.log("my list element", listelement);
		listelement.innerHTML = "";

		array.forEach(function (movie) {

			var newItem = document.createElement("li");
			
			//vvv use this if you just want one piece of data in each li vvv
			//newItem.innerHTML = movie;

			//vvv use this if you want more than one piece of data (divs) in each li vvv
			var nameDiv = document.createElement("div");
			nameDiv.innerHTML = movie.name;
			nameDiv.classList.add("movie-name");
			newItem.appendChild(nameDiv);

			var ratingDiv = document.createElement("div");
			ratingDiv.innerHTML = movie.rating;
			ratingDiv.classList.add("movie-name");
			newItem.appendChild(ratingDiv);

			var genreDiv = document.createElement("div");
			genreDiv.innerHTML = movie.genre;
			genreDiv.classList.add("movie-name");
			newItem.appendChild(genreDiv);

			var yearDiv = document.createElement("div");
			yearDiv.innerHTML = movie.year;
			yearDiv.classList.add("movie-name");
			newItem.appendChild(yearDiv);

			var platformDiv = document.createElement("div");
			platformDiv.innerHTML = movie.platform;
			platformDiv.classList.add("movie-name");
			newItem.appendChild(platformDiv);

			var deleteButton = document.createElement("button");
			deleteButton.innerHTML = "Delete";
			deleteButton.onclick = function () {
				console.log("delete button was clicked", movie.name);
				if (confirm("Are you sure you want to delete " + movie.name + "?")) {
					deleteMovieFromServer(movie.id);
				};
				
			};
			newItem.appendChild(deleteButton);


			

			var editButton = document.createElement("button");
			editButton.setAttribute("id", "editbtn");
			editButton.innerHTML = "Edit";
			editButton.onclick = function () {
				document.getElementById("editbtn").disabled = true;
				console.log("edit button was clicked")
				var editName = document.createElement("input");
				editName.style.display = "block";
				editName.style.margin = "15px";
				editName.placeholder='Enter name';
				editName.value = movie.name;
				newItem.appendChild(editName);

				var editRating = document.createElement("input");
				editRating.style.display = "block";
				editRating.style.margin = "15px";
				editRating.placeholder='Enter rating';
				editRating.value = movie.rating;
				newItem.appendChild(editRating);

				var editGenre = document.createElement("input");
				editGenre.style.display = "block";
				editGenre.style.margin = "15px";
				editGenre.placeholder='Enter genre';
				editGenre.value = movie.genre;
				newItem.appendChild(editGenre);

				var editYear = document.createElement("input");
				editYear.style.display = "block";
				editYear.style.margin = "15px";
				editYear.placeholder='Enter year';
				editYear.value = movie.year;
				newItem.appendChild(editYear);

				var editPlatform = document.createElement("input");
				editPlatform.style.display = "block";
				editPlatform.style.margin = "15px";
				editPlatform.placeholder='Enter platform';
				editPlatform.value = movie.platform;
				newItem.appendChild(editPlatform);


				function updateMovieOnServer(movieName, movieRating, movieGenre, movieYear, moviePlatform, movieId) {
					console.log("updating entry", movie.name, movie.rating, movie.genre, movie.year, movie.platform)
					
					var movieName = editName.value;
					var movieRating = editRating.value;
					var movieGenre = editGenre.value;
					var movieYear = editYear.value;
					var moviePlatform = editPlatform.value;

					var data = "name=" + encodeURIComponent(movieName);
					data += "&rating=" + encodeURIComponent(movieRating);
					data += "&genre=" + encodeURIComponent(movieGenre);
					data += "&year=" + encodeURIComponent(movieYear);
					data += "&platform=" + encodeURIComponent(moviePlatform);

					console.log("sending updated data to server:", data, movie.id);

					var movieId = movie.id

					fetch("http://localhost:8080/games/" + movieId, {
						credentials: 'include',
						method: "PUT",
						body: data,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}
					}).then(function(response) {
						if (response.status == 200) {
							loadMoviesFromServer();
						} else {
							console.log("server responded with", response.status, "when trying to create a movie");
						}
					});


				};

				var saveButton = document.createElement("button");
				saveButton.innerHTML = "Save"
				saveButton.onclick = function () {
					console.log("save button was clicked")
					editName.style.display = "none";
					editRating.style.display = "none";
					editGenre.style.display = "none";
					editYear.style.display = "none";
					editPlatform.style.display = "none";
					saveButton.style.display = "none";

					updateMovieOnServer();

					
				};
				newItem.appendChild(saveButton)
			};
			newItem.appendChild(editButton);

			listelement.appendChild(newItem);
		});
		
	});
});
};
loadMoviesFromServer();

// 401: unauthenticated
// POST /sessions
// POST users for registration, POST sessions for authentication
// endpoint: /users
// method: POST
function createUserOnServer(firstName, lastName, email, password) {
	console.log("attempting to create user", firstName, "on server");

	var data = "fname=" + encodeURIComponent(firstName);
	data += "&lname=" + encodeURIComponent(lastName);
	data += "&email=" + encodeURIComponent(email);
	data += "&password=" + encodeURIComponent(password);



	fetch("http://localhost:8080/users", {
		credentials: 'include',
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function(response) {
		if (response.status == 201) {
			console.log("201 response", response.status)
			alert("User created successfully")
		} else {
			alert("NOT CREATED, EMAIL ALREADY EXISTS")
		}
	});
};

function loginUserOnServer(logEmail, logPassword) {
	console.log("attempting to login user", logEmail, "on server");

	var displayname = logEmail;
	var usernamedisplay = document.querySelector("#username")

	var data = "email=" + encodeURIComponent(logEmail);
	data += "&password=" + encodeURIComponent(logPassword);

	fetch("http://localhost:8080/sessions", {
		credentials: 'include',
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function(response) {
		if (response.status == 200) {
			console.log("login successful")
			alert("Login successful")
			var userName = document.createElement("p");
			userName.innerHTML = "logged in as " + displayname;
			userName.style.color = "white";
			usernamedisplay.appendChild(userName);
			loadMoviesFromServer();
		} else {
			console.log("did not login")
			alert("Incorrect login")
		}
	});

};

function createMovieOnServer(movieName, movieRating, movieGenre, movieYear, moviePlatform) {
	console.log("attempting to create movie", movieName, "on server");

	var data = "name=" + encodeURIComponent(movieName);
	data += "&rating=" + encodeURIComponent(movieRating);
	data += "&genre=" + encodeURIComponent(movieGenre);
	data += "&year=" + encodeURIComponent(movieYear);
	data += "&platform=" + encodeURIComponent(moviePlatform);

	console.log("sending data to server:", data);



	fetch("http://localhost:8080/games", {
		// reqeust details:
		credentials: 'include',
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function(response) {
		// when the server responds:
		if (response.status == 201) {
			loadMoviesFromServer();
		} else {
			console.log("server responded with", response.status, "when trying to create a movie");
		}

	});
};


function deleteMovieFromServer(movieId) {
	fetch("http://localhost:8080/games/" + movieId, {
		credentials: 'include',
		method: "DELETE"
	}).then(function(response) {
		if (response.status == 200) {
			console.log(movieId)
			loadMoviesFromServer();
		} else {
			console.log("server responded with", response.status, "when trying to create a movie");
		};
	});
};
//array of objects is most common data structure

//console.log("array of object", arrayofobjects)

var registerButton = document.querySelector("#regbutton");
console.log("register button", registerButton)

registerButton.onclick = function () {
	console.log("register button was clicked");
	var fnameBox = document.querySelector("#regfname");
	var lnameBox = document.querySelector("#reglname");
	var emailBox = document.querySelector("#regemail");
	var passwordBox = document.querySelector("#regpassword");

	createUserOnServer(fnameBox.value, lnameBox.value, emailBox.value, passwordBox.value);

	fnameBox.value = "";
	lnameBox.value = "";
	emailBox.value = "";
	passwordBox.value = "";
};

var loginButton = document.querySelector("#loginbutton");
console.log("Login button", loginButton);

loginButton.onclick = function (){
	console.log("login button was clicked");
	var loginEmail = document.querySelector("#loginemail");
	var loginPassword = document.querySelector("#loginpassword");

	loginUserOnServer(loginEmail.value, loginPassword.value);
	

	loginEmail.value = "";
	loginPassword.value = "";
};
var buttonelement = document.querySelector("#b1");
console.log("my button element", buttonelement);



buttonelement.onclick = function () {
	console.log("my button was clicked");
	//h1element.innerHTML = "I'm different now.";
	//h1element.style.color = "#0000FF";
	//h1element.style.backgroundColor = "#FF0000";

	var textboxelement = document.querySelector("#text1");
	console.log("my input element", textboxelement);
	console.log("input element text:", textboxelement.value);


	var textboxrating = document.querySelector("#movierating");
	var textboxgenre = document.querySelector("#moviegenre");
	var textboxyear = document.querySelector("#movieyear");
	var textboxplatform = document.querySelector("#movieplatform");
	var listelement = document.querySelector("#ol1");
	console.log("my list element", listelement);

	var newItem = document.createElement("li");
	newItem.innerHTML = textboxelement.value;
	listelement.appendChild(newItem);

	createMovieOnServer(textboxelement.value, textboxrating.value, textboxgenre.value, textboxyear.value, textboxplatform.value);

	textboxelement.value = "";
	textboxrating.value = "";
	textboxgenre.value = "";
	textboxyear.value = "";
	textboxplatform.value = "";


};



//user event
//1. target element e.g. button, text entry
//2. event, e.g. click, behavior
//3.handler/listener e.g. outcome, a function (code)