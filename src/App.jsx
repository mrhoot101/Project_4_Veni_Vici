import { useState } from 'react'
import axios from 'axios';
import Dogs from '../components/Dogs.jsx'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
  let images = [
    {key: 1,
      name: "Chow Chow",
      url: "https://www.thesprucepets.com/thmb/KtgU8EZlQYQLq00UexKrjPlHO1s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-chow-chow-s-blue-black-tongue-988095310-61274505d9bc4a84badeda7d33ead681.jpg"
    },
    {key: 2,
      name: "Maltipoo",
      url: "https://www.thesprucepets.com/thmb/29c6R9LU3cdTRJCinDPnsp9Mh60=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-477970153-151e8e9e96e84f9dbb68613adb7bb10d.jpg"
    },
    {key: 3,
      name: "Labrador Retriever",
      url: "https://www.thesprucepets.com/thmb/29c6R9LU3cdTRJCinDPnsp9Mh60=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-477970153-151e8e9e96e84f9dbb68613adb7bb10d.jpg"
    },
    {key: 4,
      name: "Beagle",
      url: "https://www.thesprucepets.com/thmb/m29hlAY-vPlxWtpE0GeJRfhVibY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/beagle-of-12-weeks-155967777-588660e55f9b58bdb3b796eb.jpg"
    },
    {key: 5,
      name: "Golden Retriever",
      url: "https://www.thesprucepets.com/thmb/LYhZtlo8CxXFidUCzQ2I0p1XtHY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/golden-retriever-dog-1252460847-57203adfb2414174af722d9a31f2a18b.jpg"
    },
    {key: 6,
      name: "Border Collie",
      url: "https://www.thesprucepets.com/thmb/6eK3ztrHgMyMd_tC07E3Hc030Sc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/border-collie-3753041_640-09e4a4dc66214003a6f4387644733ecc.jpg"
    },
    {key: 7,
      name: "Dalmatian",
      url: "https://www.thesprucepets.com/thmb/YsSkmgzSVrr57fGgHF2phrVawQk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-of-dalmatian-dog-running-on-grass-700830815-58e7e5ac57c64646842f3a3b7c11bebb.jpg"
    },
    {key: 8,
      name: "Siberian Husky",
      url: "https://www.thesprucepets.com/thmb/xGKuarSm5pS4WDmo6rX16NNMMBU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/close-up-of-siberian-husky-relaxing-on-snowy-field-674493607-a21bafa0eb374e15a47bbf331ccf09d1.jpg"
    },
    {key: 9,
      name: "Pembroke Welsh Corgi",
      url: "https://www.thesprucepets.com/thmb/8nYSf1me_8OQtkFSFbGIADCJfXc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_corgi_1117986_recirc_917-ac4ab4ec3cb6469397c6c023e7c28b28.jpg"
    },
    {key: 10,
      name: "Pomeranian",
      url: "https://www.thesprucepets.com/thmb/lThpwogzgDC8OvR0mts6QBp2yOU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pomeranian-108995744-581636ae3df78cc2e891d882.jpg"
    },
    {key: 11,
      name: "Yorkshire Terrier",
      url: "https://www.thesprucepets.com/thmb/dYBwqmuIkAtv9eqbaJBzPaUevRs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-dog-breeds-we-can-t-get-enough-of-4589340-05-2989cb58543d42d9869c7c2204b48dab.jpg"
    },
    {key: 12,
      name: "Old English Sheepdog",
      url: "https://www.thesprucepets.com/thmb/ITXjWPGrS9efSMwx6bVNP8lYJQM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/old-english-sheepdog-sticking-out-tongue-713838563-5c0a7582c9e77c0001e281c7.jpg"
    },
    {key: 13,
      name: "American Staffordshire Terrier",
      url: "https://www.thesprucepets.com/thmb/W46YHLe5otz56NbUOLr1qQ5AC_8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-dog-breeds-we-can-t-get-enough-of-4589340-07-7dfef5866dd84fcc83964fd865ff8a25.jpg"
    },
    {key: 14,
      name: "Labrador Retriever",
      url: "https://www.thesprucepets.com/thmb/0CcPaUYnnVYB1BOqe1toyS6W3wo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_labrador_1117977_recirc_2681-9116ac57b06b48fbadb7cf6ea7c03ddb.jpg"
    }

  ];

  let [image, setImage] = useState({
    url: "",
    format: "png",
    no_ads: "false",
    width: "500",
    height: "400",
  });

  

  const [currentImage, setCurrentImage] = useState(null);
  
  let currentImageURL = 0;

  // let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${images[currentImageURL].url}&format=${currentIndex.format}&width=${currentIndex.width}&height=${currentIndex.height}&no_ads=${currentIndex.no_ads}&response_type=json&wait_until=network_idle`;

  const generateQuery = () => {
    let currentImageURL = Math.floor(Math.random() * images.length);

    const updatedImage = { ...image };
    updatedImage.url = images[currentImageURL].url;
    // setImage(updatedImage);

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${updatedImage.url}&format=${updatedImage.format}&width=${updatedImage.width}&height=${updatedImage.height}&no_ads=${updatedImage.no_ads}&response_type=json&wait_until=network_idle`;
    callAPI(query);
  }


  const callAPI = async (query) => {

    try {
      const response = await axios.get(query);
      const json = await response.data;

      if (json.url == null) {
        alert("Oops! Something went wrong with that query, let's try again!")
      }
      else {
        setCurrentImage(json.url);
      }
    }
    catch (error) {
      console.error("Error fetching image:", error);
      alert("An error occurred while fetching the image. Please try again.");
    }
  }

  return (
    <div className="App">
      <h1>Dreaming with Dogs</h1>
      <h2>Welcome to Dreaming with Dogs!</h2>

      
      {/* {currentImage && <img src={currentImage} alt="Generated" />} */}
      <button onClick={() => {
        generateQuery();
        }}>Generate Image</button>
      
      <Dogs image={currentImage} />

    </div>
  );
}

export default App
