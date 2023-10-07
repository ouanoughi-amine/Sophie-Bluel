console.log("hello");

	// const works = fetch('http://localhost:5678/api/works')
    //     .then(response => {
    //         // Vérifie si la requête a été exécutée avec succès
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("List of works : ",data);  // Affiche les données dans la console
    //         // Ici, vous pouvez traiter les données comme vous le souhaitez, par exemple les afficher dans votre interface utilisateur.
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error.message);
    //     });

	// Fonction pour récupérer les données depuis l'API
function fetchWorks() {
    return fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// Fonction pour construire les éléments HTML
function buildGalleryItem(work) {
    const figure = document.createElement('figure');
	

    const img = document.createElement('img');
    img.src = work.imageUrl;  // Supposons que 'imagePath' est le champ qui contient le chemin de l'image dans vos données
    img.alt = work.title;       // Supposons que 'name' est le champ qui contient le nom de l'élément

	figure.setAttribute('data-category', `${work.category.name}`);
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    return figure;
}

// Fonction pour afficher les éléments dans la galerie
function displayWorks(works) {
    const galleryDiv = document.querySelector('.gallery');
    works.forEach(work => {
        const galleryItem = buildGalleryItem(work);
        galleryDiv.appendChild(galleryItem);
    });
}

// Fonction principale pour récupérer et afficher les éléments
function main() {
    fetchWorks()
        .then(displayWorks)
        .catch(error => {
            console.error('There was a problem:', error.message);
        });
}

function fetchCategories() {
    return fetch('http://localhost:5678/api/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
			// console.log(response.json());
            return response.json();
        })
		
}


function displayCategoriesButtons(categories) {
    const filterDiv = document.querySelector('.filters');
	// console.log("categories : ",categories);

	const allButton = document.createElement('button');
	allButton.innerHTML = 'TOUS';
	allButton.addEventListener('click', myFunction);
	filterDiv.appendChild(allButton);

    // categories.forEach(categorie => {
    //     const newButton = document.createElement('button');
    //     newButton.innerHTML = categorie.name;
	// 	filterDiv.appendChild(newButton);
    // });


	for(let i=0; i<categories.length; i++){
		console.log(i);
		const newButton = document.createElement('button');
        newButton.innerHTML = categories[i].name;
		newButton.addEventListener('click', myFunction);
		filterDiv.appendChild(newButton);
	}
}

function myFunction()
{	
	console.log(event.target.innerHTML);

	const galleryDiv = document.querySelector('.gallery');
	// console.log(galleryDiv.children);
	const figures = galleryDiv.querySelectorAll('figure');

	console.log(figures);

	figures.forEach(figure => {
		figure.style.display = 'block';
	});

	figures.forEach(figure => {
		// Vérifiez la valeur de l'attribut 'data-category'

		

		const filtre = event.target.innerHTML;

		const category = figure.getAttribute('data-category');

		console.log("filtre: ",filtre);
		console.log("category : ",category);

		if(filtre === "TOUS")
		{
			return;
		}
		
		if (category !== filtre) {
			// Si la valeur n'est pas 'Objet', cachez l'élément
			figure.style.display = 'none';
		}
	});	

	


	// galleryDiv.children.forEach(figure => {
	// 	console.log(figure);
	// });
}

// Exécutez la fonction principale
fetchCategories()
	.then(resultat => {
		displayCategoriesButtons(resultat);
	})
	.catch(err =>{
			console.log("error while fetching the categories : ",err);
		}); 



main();





      