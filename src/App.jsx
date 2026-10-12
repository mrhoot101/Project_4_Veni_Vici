import { useState } from 'react'
import Dogs from '../components/Dogs.jsx'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {

  let query = `https://api.apiflash.com/v1/urltoimage?access_key=e246cb6defa940b5bda014306058716c&url=https%3A%2F%2Fwww.thesprucepets.com%2Fthmb%2FKtgU8EZlQYQLq00UexKrjPlHO1s%3D%2F750x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%3Aformat(webp)%2Fthe-chow-chow-s-blue-black-tongue-988095310-61274505d9bc4a84badeda7d33ead681.jpg&width=500&height=500&response_type=json&no_cookie_banners=true&no_ads=true&no_tracking=true&wait_until=network_idle://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=https%3A%2F%2Fwww.thesprucepets.com%2Fthmb%2FKtgU8EZlQYQLq00UexKrjPlHO1s%3D%2F750x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%3Aformat(webp)%2Fthe-chow-chow-s-blue-black-tongue-988095310-61274505d9bc4a84badeda7d33ead681.jpg&width=500&height=500&response_type=json&no_cookie_banners=true&no_ads=true&no_tracking=true`;

  const [currentImage, setCurrentImage] = useState(null);

  const callAPI = async (query) => {
    const response = await axios.get(query);
    const json = await response.data;

    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    }
    else {
      setCurrentImage(json.url);
      reset();
    }
  }

  return (
    <div className="App">
      <h1>Dreaming with Dogs</h1>
      <h2>Welcome to Dreaming with Dogs!</h2>

      <Dogs/>
      currentImage && <img src={currentImage} alt="Generated" />

    </div>
  );
}

export default App
