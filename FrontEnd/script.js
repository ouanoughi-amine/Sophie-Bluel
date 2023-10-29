
window.addEventListener('DOMContentLoaded', (event) => { // Assurez-vous que le DOM est entièrement chargé
    const loginLink   = document.getElementById('login');
    const logoutLink  = document.getElementById('logout');
	const navBar      = document.querySelector('#nav-bar');
	const filterProjet= document.querySelector('.filters')

    if(localStorage.getItem('userToken')) {
        // Si l'utilisateur est connecté
        loginLink.style.display = 'none';  // Masquer le lien de connexion
        logoutLink.style.display = 'block'; // Afficher le lien de déconnexion
        navBar.style.display = 'flex';
		filterProjet.style.display='none';
	} else {
        // Si l'utilisateur n'est pas connecté
        loginLink.style.display = 'block';  // Afficher le lien de connexion
        logoutLink.style.display = 'none';  // Masquer le lien de déconnexion
        navBar.style.display = 'none';       
	}
});

const logoutLink = document.getElementById('logout');
logoutLink.addEventListener('click', (event)=>{
	localStorage.removeItem('userToken');
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
	getWorks()
	  .then(displayWorks)
	  .catch((error) => {
		console.error("There was a problem:", error.message);
	  });
  }
  
  function getCategories() {
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
	
	allButton.addEventListener("click", getFilter);
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
	// console.log(galleryDiv.children);
	const figures = galleryDiv.querySelectorAll("figure");
  
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
    getCategories()
	.then((resultat) => {
	displayCategoriesButtons(resultat);
	})
	.catch((err) => {
	  console.log("error while fetching the categories : ", err);
	});
  main();
  
const modalContainer = document.querySelector(".modal-container");
const modalTiggers   = document.querySelectorAll(".modal-trigger");
  
modalTiggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
	modalContainer.classList.toggle("active")
}
// récupérer les projets 

function getWorkImg(work) {
    fetch(`http://localhost:5678/api/works`, {
    
    })
    .then(response => response.json())
    .then(data => {
       
       
		data.forEach(item => {
			// Créer un élément div pour chaque travail
			let projetMod = document.querySelector(".projets");
			let travailElement = document.createElement("div");
			let imageElement = document.createElement("img");
		
			// 
			imageElement.src = item.imageUrl; 
		
			travailElement.appendChild(imageElement);
		
			let iconeElement = document.createElement("i");
			iconeElement.classList.add("fa-solid", "fa-trash-can");
			// iconeElement.style.position = "absolute"; // Définir la position de l'icône
			// iconeElement.style.top = "15%"; 
			// iconeElement.style.right = "1%"; 
			// iconeElement.style.transform = "translate(-20%, -50%)"; 
			travailElement.appendChild(iconeElement);
			// / la position relative du conteneur
			travailElement.style.position = "relative";
		
			projetMod.appendChild(travailElement);
		});
		 
        
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}
getWorkImg()





