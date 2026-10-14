
const Dogs = ({ image, qualities, name, handleQualityClick }) => {

    return (

        <div className="Dogs">
            <h3>Our Dogs</h3>
            <p>Here are some of our adorable dogs!</p>

            <h3>{name}</h3>

            {qualities && (
                <ul>
                    {qualities.map((quality, index) => (
                        <li key={index} onClick={() => handleQualityClick(quality)}>{quality}</li>
                    ))}
                </ul>
            )}

            {image && <img src={image} alt="Generated" />}
        </div>
    )
}

export default Dogs;