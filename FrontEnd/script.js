window.addEventListener('DOMContentLoaded', (event) => { // Assurez-vous que le DOM est entièrement chargé
    const loginLink = document.getElementById('login');
    const logoutLink = document.getElementById('logout');

    if(localStorage.getItem('userToken')) {
        // Si l'utilisateur est connecté
        loginLink.style.display = 'none';  // Masquer le lien de connexion
        logoutLink.style.display = 'block'; // Afficher le lien de déconnexion
    } else {
        // Si l'utilisateur n'est pas connecté
        loginLink.style.display = 'block';  // Afficher le lien de connexion
        logoutLink.style.display = 'none';  // Masquer le lien de déconnexion
    }
});

const logoutLink = document.getElementById('logout');
logoutLink.addEventListener('click', (event)=>{
	localStorage.removeItem('userToken');
});


// Fonction pour récupérer les données depuis l'API
function fetchWorks() {
	return fetch("http://localhost:5678/api/works").then((response) => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  return response.json();
	});
  }
  
  // Fonction pour construire les éléments HTML
  function buildGalleryItem(work) {
	const figure = document.createElement("figure");
  
	const img = document.createElement("img");
	img.src = work.imageUrl;
	img.alt = work.title;
  
	figure.setAttribute("data-category", `${work.category.id}`);
	figure.appendChild(img);
  
	const figcaption = document.createElement("figcaption");
	figcaption.textContent = work.title;
	figure.appendChild(figcaption);
  
	return figure;
  }
  
  // Fonction pour afficher les éléments dans la galerie
  function displayWorks(works) {
	const galleryDiv = document.querySelector(".gallery");
	works.forEach((work) => {
	  const galleryItem = buildGalleryItem(work);
	  galleryDiv.appendChild(galleryItem);
	});
  }
  
  // Fonction principale pour récupérer et afficher les éléments
  function main() {
	fetchWorks()
	  .then(displayWorks)
	  .catch((error) => {
		console.error("There was a problem:", error.message);
	  });
  }
  
  function fetchCategories() {
	return fetch("http://localhost:5678/api/categories").then((response) => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  // console.log(response.json());
	  return response.json();
	});
  }
  
  function displayCategoriesButtons(categories) {
	const filterDiv = document.querySelector(".filters");
	// console.log("categories : ",categories);
  
	const allButton = document.createElement("button");
	allButton.innerHTML = "TOUS";
	allButton.classList=("filter-button");
	
	allButton.addEventListener("click", myFunction);
	filterDiv.appendChild(allButton);
  
	// categories.forEach(categorie => {
	//     const newButton = document.createElement('button');
	//     newButton.innerHTML = categorie.name;
	// 	filterDiv.appendChild(newButton);
	// });
  
	for (let i = 0; i < categories.length; i++) {
	  console.log(i);
	  const newButton = document.createElement("button");
	  newButton.innerHTML = categories[i].name;
	  newButton.id = categories[i].id;
	  newButton.classList=("filter-button");
	  newButton.addEventListener("click", myFunction);
	  filterDiv.appendChild(newButton);
	}
  }
  function myFunction() {
	
	console.log(event.target.id);
	const filterClicked = event.target;
	const filtreId = event.target.id;
	let allButton = document.querySelectorAll(".filter-button")
	allButton.forEach((element) => {
		element.classList.remove("filter-button-active")
	});

	filterClicked.classList.add("filter-button-active");
	
	const galleryDiv = document.querySelector(".gallery");
	// console.log(galleryDiv.children);
	const figures = galleryDiv.querySelectorAll("figure");
  
	//console.log(figures);
  
	/*figures.forEach((figure) => {
	  figure.style.display = "block";
	});*/
  
	figures.forEach((figure) => {
	  // Vérifiez la valeur de l'attribut 'data-category'
  
	 
  
	  const category = figure.getAttribute("data-category");
  
	  figure.style.display = "none";
  
	  if (filtreId === "") {
		figure.style.display = "block";
	  }
  
	  if (category == filtreId) {
		// Si la valeur n'est pas 'Objet', cachez l'élément
		figure.style.display = "block";
	  }
	});
  }
  
  // Exécutez la fonction principale
    fetchCategories()
	.then((resultat) => {
	displayCategoriesButtons(resultat);
	})
	.catch((err) => {
	  console.log("error while fetching the categories : ", err);
	});
  
  main();
  

  