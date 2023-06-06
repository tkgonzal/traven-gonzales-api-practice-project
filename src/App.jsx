import PokemonCard from "./components/PokemonCard.jsx";
import useRandomPokemonHook from "./hooks/useRandomPokemonHook.js"

import "./App.css"

/**
 * Primary App Component, allows the user to click a button and view a 
 * random pokemon
 * @returns {ReactElementComponent} Main App Component
 */
function App() {
  const {
    pokemonImageUrl,
    pokemonImageAlt,
    pokemonName,
    pokemonTypes,
    pokemonGenerated,
    pokemonDescription,
    pokemonGenus,
    generateRandomPokemonOnClick
  } = useRandomPokemonHook();

  return (
    <main>
      {
        pokemonGenerated &&
        <PokemonCard
          pokemonImageUrl={pokemonImageUrl}
          pokemonImageAlt={pokemonImageAlt}
          pokemonName={pokemonName}
          pokemonTypes={pokemonTypes}
          pokemonDescription={pokemonDescription}
          pokemonGenus={pokemonGenus}
        />
      }
      <button
        className="generate-btn"
        onClick={generateRandomPokemonOnClick}
      >
        Gotta catch em all!
      </button>
    </main>
  )
}

export default App

