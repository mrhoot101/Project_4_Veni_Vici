
const Dogs = ({ image, attributes, handleAttributeClick }) => {

    return (

        <div className="Dogs">
            <h3>Our Dogs</h3>
            <p>Here are some of our adorable dogs!</p>

            {attributes && (
                <ul >
                    {attributes.map((attribute, index) => (
                        <li key={index}  onClick={() => handleAttributeClick(attribute)}>{attribute}</li>
                    ))}
                </ul>
            )}

            {image && <img src={image} alt="Generated" />}
        </div>
    )
}

export default Dogs;