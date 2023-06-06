import { useState } from "react";

/**
 * Hook for randomly generating Pokemon data. Uses PokeAPI for 
 * data.
 * @returns {Object} Returns several state variables and an event handler
 * Includes:
 * -pokemonImageUrl {String} The url for the image of a Pokemon
 * -pokemonImageAlt {String} The alt text for the image of a Pokemon
 * -pokemonName {String} The name of a Pokemon
 * -pokemonTypes {String[]} The Pokemon's types in an array
 * -pokemonGenerated {bool} A boolean that says whether or not
 * a Pokemon has already been generated
 * -pokemonDescription {String} A description of the Pokemon
 * -pokemonGenus {String} The Pokemon's genus
 * -generateRandomPokemonOnClick {function} An event handler for randomly
 * generating a Pokemon
 */
function useRandomPokemonHook() {
    // Constants
    const pokeAPIPokemonBaseUrl = "https://pokeapi.co/api/v2"
    const statsPath = "pokemon"
    const dexPath = "pokemon-species"
    const NUMBER_OF_POKEMON = 1015

    // State variables
    const [pokemonGenerated, setPokemonGenerated] = useState(false)
    const [pokemonImageUrl, setPokemonImageUrl] = useState("");
    const [pokemonImageAlt, setPokemonImageAlt] = useState("");
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonGenus, setPokemonGenus] = useState("");
    const [pokemonDescription, setPokemonDescription] = useState("");

    // Functions
    /**
     * onClick event handler for getting a new random pokemon. Handles
     * setting the pokemon generated state for displaying the 
     * PokemonCard.
     */
    function generateRandomPokemonOnClick() {
        if (!pokemonGenerated) {
            setPokemonGenerated(true)
        }

        getRandomPokemon();
    }

    /**
     * Generates a random pokemon by generating a random number in the 
     * range of valid pokemon numbers and then fetches the pokemon
     * info from the API
     */
    const getRandomPokemon = () => {
        const pokeNo = generatePokemonNumber();

        fetch(`${pokeAPIPokemonBaseUrl}/${statsPath}/${pokeNo}`)
            .then(res => res.json())
            .then(data => {
                setPokemonImageUrl(data.sprites[`front_default`]);
                setPokemonImageAlt(data.name);
                setPokemonName(data.name);
                setPokemonTypes(data.types.map(type => type.type.name));
            });

        fetch(`${pokeAPIPokemonBaseUrl}/${dexPath}/${pokeNo}`)
            .then(res => res.json())
            .then(data => {
                const dexDescriptions = data.flavor_text_entries;
                const genera = data.genera;

                const englishDexDesc = dexDescriptions.filter(isInEnglish);
                const englishGenus = genera.filter(isInEnglish);

                setPokemonDescription(englishDexDesc.length > 0 ? englishDexDesc[0].flavor_text : "");
                setPokemonGenus(englishGenus.length > 0 ? englishGenus[0].genus : "");
            })
    }

    /**
     * Randomly generates a pokemon's pokedex number
     * @returns {Number} A random number between 1 and the NUMBER_OF_POKEMONs
     */
    const generatePokemonNumber = () => {
        return Math.floor(Math.random() * NUMBER_OF_POKEMON) + 1;
    }

    /**
     * Callback function for checking if data is in english
     * @param {Object} data A data member of the PokeAPI response object
     * @returns {bool} Whether or not the data is in english
     */
    const isInEnglish = (data) => {
        return data.language.name === "en";
    }

    return {
        pokemonImageUrl,
        pokemonImageAlt,
        pokemonName,
        pokemonTypes,
        pokemonGenerated,
        pokemonDescription,
        pokemonGenus,
        generateRandomPokemonOnClick
    };
}

export default useRandomPokemonHook;

