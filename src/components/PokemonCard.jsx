import "./PokemonCard.css"

/**
 * 
 * @param {Object} props A props object featuring the following members
 * -pokemonImageUrl {String} Image source for Pokemon sprite
 * -pokemonImageAlt {String} Alt text for Pokemon image
 * -pokemonName {String} The Pokemon's name
 * -pokemonTypes {String[]} An array of a Pokemon's types
 * -pokemonDescription {String} A description of a Pokemon
 * -pokemonGenus {String} A Pokemon's genus
 * @returns {ReactElementComponent} A Pokemon Card displaying a Pokemon's
 * details
 */
function PokemonCard({
    pokemonImageUrl, pokemonImageAlt, pokemonName, pokemonTypes,
    pokemonDescription, pokemonGenus
}) {
    const typeSpriteSrcMap = new Map()
    const types = [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
        "fairy"
    ]

    for (const type of types) {
        typeSpriteSrcMap.set(type, `../../public/assets/type-sprite-${type}.png`)
    }

    console.log(typeSpriteSrcMap)

    return (
        <article className="pokemon-card">
            <img
                className="pokemon-card--sprite"
                src={pokemonImageUrl}
                alt={pokemonImageAlt}
            />
            <h1 className="pokemon-card--name">{pokemonName.toUpperCase()}</h1>
            <h2 className="pokemon-card--genus">{pokemonGenus}</h2>
            <span
                className="pokemon-card--types"
            >
                {pokemonTypes.map(
                    type => <img
                        className="pokemon-card--type-sprite"
                        src={typeSpriteSrcMap.get(type)}
                        alt={`${type} sprite`}
                    />
                )}
            </span>
            <p className="pokemon-card--description">
                {pokemonDescription}
            </p>
        </article>
    )
}

export default PokemonCard

