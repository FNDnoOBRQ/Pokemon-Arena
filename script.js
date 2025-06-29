const url = "https://pokeapi.co/api/v2/pokemon?limit=1302";
const mc = document.getElementById("mainCharacter");
const me = document.getElementById("hostilePokemon");
const fightButton = document.getElementById("wwyd");
const surrenderButton = document.getElementById("wwyd2");
const Linfo = document.getElementById("level");
let pokemonLevel = 0;

setInterval(()=>{
    Linfo.innerHTML = `Level: ${pokemonLevel}`;
    if(pokemonLevel == 10){
        let h2 = document.createElement("h2");
        h2.setAttribute("style", "position: absolute; left: 700px; top: 280px; width: 550px; height: 200px; background-color: rgba(182, 188, 195, 0.816); z-index: 10; font-size: 40px; color: green; text-align: center; line-height: 200px; border: 2px solid black; border-radius: 20px");
        h2.innerHTML = "Congratulations!";
        document.body.appendChild(h2);
        setTimeout(()=>{
            window.close();
        },5050);
    }
},100);

// fightButton.addEventListener("click", fight());
// surrenderButton.addEventListener("click", surrender());

document.addEventListener("DOMContentLoaded", function () {
    let selected_pokemon;
    const inp = document.querySelector("input");
    const nameInfo = document.getElementById("friendlyPokemon");
    const imgPlace = document.getElementById("FPP");
    const friendlyPokemonStats = document.getElementById("friendlyPokemonStats");
    const name = document.getElementById("name");

    nameInfo.hidden = true;
    imgPlace.hidden = true;


    const pT = document.createElement("p");
    const pA = document.createElement("p");
    const pW = document.createElement("p");
    const pH = document.createElement("p");
    const pN = document.createElement("p");
    friendlyPokemonStats.appendChild(pT);
    friendlyPokemonStats.appendChild(pA);
    friendlyPokemonStats.appendChild(pW);
    friendlyPokemonStats.appendChild(pH);


    inp.addEventListener("input", function () {
        selected_pokemon = inp.value;

        fetch(`https://pokeapi.co/api/v2/pokemon/${selected_pokemon}`)
            .then(response => {
                return response.json();
            })
            .then(data => {

                // randonNumber = Math.floor(Math.random() * data.response.results.length);
                // randomPokemonUrl = data.response.results[randonNumber].url;

                nameInfo.hidden = false;
                imgPlace.hidden = false;
                document.getElementById("wwyd").innerHTML = "Fight";
                document.getElementById("wwyd2").innerHTML = "Surrender";
                imgPlace.src = data.sprites.front_default;
                name.innerHTML = `${data.name}`;
                mc.src = data.sprites.back_shiny;
                mc.classList.add("pixel_art");

                pT.innerHTML = `Type: ${data.types[0].type.name}`;
                pA.innerHTML = `Ability: ${data.abilities[0].ability.name}`;
                pW.innerHTML = `Weight: ${data.weight / 10} kg`;
                pH.innerHTML = `Health: ${data.stats.find(stat => stat.stat.name === 'hp').base_stat} hp`;
                getEnemy();
            })
            

    });

});


window.addEventListener("load", function () {
    getEnemy();
})

let currentE = null;
const eN = document.createElement("p", className = "enemyName");
const eT = document.createElement("p");
const eA = document.createElement("p");
const eH = document.createElement("p");
const hostilePokemonStats = document.getElementById("EmenyPokemonStats");


hostilePokemonStats.appendChild(eN);
hostilePokemonStats.appendChild(eT);
hostilePokemonStats.appendChild(eA);
hostilePokemonStats.appendChild(eH);
function getEnemy() {



    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const pokemonList = data.results;
            const randomNumber = Math.floor(Math.random() * 1302) + 1;
            pokemonList.forEach(pokemon => {
                // console.log(pokemon.name);
            });
            currentE = pokemonList[randomNumber].name;
            console.warn("Current Enemy: " + currentE);
        })
        .catch(() => {
            console.log("Error");
        })


    
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${currentE}`)
    .then(response => {
        return response.json();
    })

    .then(data =>{
        eN.innerHTML = `Name: ${data.name}`;
        eT.innerHTML = `Type: ${data.types[0].type.name}`;
        eA.innerHTML = `Ability: ${data.abilities[0].ability.name}`;
        eH.innerHTML = `Health: ${data.stats.find(stat => stat.stat.name === 'hp').base_stat} hp`;
        me.src = data.sprites.front_default;
        me.classList.add("pixel_art");
    })

    .catch(() => {
        console.log("Error");
    })
}


    function fight(){
        let oportunity = Math.round(Math.random(2));
        if(oportunity == 1){
            pokemonLevel++;
            let h2 = document.createElement("h2");
            h2.setAttribute("style", "position: absolute; left: 700px; top: 280px; width: 550px; height: 200px; background-color: rgba(182, 188, 195, 0.816); z-index: 10; font-size: 40px; color: green; text-align: center; line-height: 200px; border: 2px solid black; border-radius: 20px");
            h2.innerHTML = "Greate! Lucky pet.";
            document.body.appendChild(h2);

            setTimeout(() => {
                document.body.removeChild(h2);
            }, 1300);
            getEnemy();
        }
        else if(oportunity == 0){
            let h2 = document.createElement("h2");
            h2.setAttribute("style", "position: absolute; left: 700px; top: 280px; width: 550px; height: 200px; background-color: rgba(182, 188, 195, 0.816); z-index: 10; font-size: 40px; color: crimson; text-align: center; line-height: 200px; border: 2px solid black; border-radius: 20px");
            h2.innerHTML = "Oh no...";
            document.body.appendChild(h2);

            setTimeout(() => {
                document.body.removeChild(h2);
                window.close();
            }, 1300);
        }
    }
    function surrender(){
            let h2 = document.createElement("h2");
            h2.setAttribute("style", "position: absolute; left: 700px; top: 280px; width: 550px; height: 200px; background-color: rgba(182, 188, 195, 0.816); z-index: 10; font-size: 40px; color: crimson; text-align: center; line-height: 200px; border: 2px solid black; border-radius: 20px");
            h2.innerHTML = "Game over!";
            document.body.appendChild(h2);
        setTimeout(() => {
            document.body.removeChild(h2);
            window.close();
        }, 1300);
    }