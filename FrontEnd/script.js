//s'assurer que le DOM est entièrement chargé
window.addEventListener('DOMContentLoaded', (event) => { 
    const loginLink   = document.querySelector('#login');
    const logoutLink  = document.querySelector('#logout');
	const navBar      = document.querySelector('#nav-bar');
	const filterProjet= document.querySelector('.filters');
	const btnModifier = document.querySelector('.modal-btn');

    if(sessionStorage.getItem('userToken')) {
        // Si l'utilisateur est connecté
        loginLink.style.display = 'none';  
        logoutLink.style.display = 'block'; 
        navBar.style.display = 'flex';
		filterProjet.style.display='none';
		
	} else {
        // Si l'utilisateur n'est pas connecté
        loginLink.style.display = 'block';  
        logoutLink.style.display = 'none';  
        navBar.style.display = 'none';  
		btnModifier.style.display = 'none';      
	}
});
const logoutLink = document.querySelector('#logout');
logoutLink.addEventListener('click', (event)=>{
	sessionStorage.removeItem('userToken');
});
// Fonction pour récupérer les données depuis l'API
function getWorks() {
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
  
	figure.setAttribute("category", `${work.category && work.category.id ? work.category.id : work.categoryId}`);
	figure.setAttribute("data-id", `${work.id}`);
	figure.setAttribute("id", `${work.id}`);
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
	getWorks()
	  .then(displayWorks)
	  .catch((error) => {
		console.error("There was a problem:", error.message);
	  });
  }
  
  async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	 const categories = await response.json();

	if (!response.ok) {
		throw new Error("Network response was not ok");
	  }else{
	  return categories;
	  }
	};
  
  function displayCategoriesButtons(categories) {
	const filterDiv = document.querySelector(".filters");
	// console.log("categories : ",categories);
  
	const allButton = document.createElement("button");
	allButton.innerHTML = "TOUS";
	allButton.classList=("filter-button");
	
	allButton.addEventListener("click", getFilter);
	filterDiv.appendChild(allButton);
  
	for (let i = 0; i < categories.length; i++) {
	  const newButton = document.createElement("button");
	  newButton.innerHTML = categories[i].name;
	  newButton.id = categories[i].id;
	  newButton.classList=("filter-button");

	  newButton.addEventListener("click", getFilter);
	  
	  filterDiv.appendChild(newButton);
	}
  }
  function getFilter() {
	const filterClicked = event.target;
	const filtreId = event.target.id;
	let allButton = document.querySelectorAll(".filter-button")
	allButton.forEach((element) => {
		element.classList.remove("filter-button-active")
	});

	filterClicked.classList.add("filter-button-active");
	
	const galleryDiv = document.querySelector(".gallery");
	const figures = galleryDiv.querySelectorAll("figure");
  
	figures.forEach((figure) => {
	  // Vérifiez la valeur de l'attribut 
	  const category = figure.getAttribute("category");

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
    getCategories()
	.then((resultat) => {
	displayCategoriesButtons(resultat);
	})
	.catch((err) => {
	  console.log("error while fetching the categories : ", err);
	});
  main();

