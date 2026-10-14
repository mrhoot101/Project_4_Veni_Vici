
const Dogs = ({ image }) => {

    return (

        <div className="Dogs">
            <h3>Our Dogs</h3>
            <p>Here are some of our adorable dogs!</p>
            {image && <img src={image} alt="Generated" />}
        </div>
    )
}

export default Dogs;