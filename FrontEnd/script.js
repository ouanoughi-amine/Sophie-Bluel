const url = 'http://localhost:5678/api/works';

let donnees;

async function recupererApi(){

const requete = await fetch (url, {
    method: 'GET'
    } );
    if (requete.ok){
     donnees = await requete.json();
     console.log(donnees);
} else{
     alert('un probléme est survenu. ');
}
}

recupererApi();






      