import { useState } from 'react'
import axios from 'axios';
import Dogs from '../components/Dogs.jsx'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
  let images = [
    {
      key: 1,
      name: "Mochi",
      attributes: ["Chow Chow", "Dense double coat", "China", "8-12 years"],
      url: "https://www.thesprucepets.com/thmb/KtgU8EZlQYQLq00UexKrjPlHO1s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-chow-chow-s-blue-black-tongue-988095310-61274505d9bc4a84badeda7d33ead681.jpg"
    },
    {
      key: 2,
      name: "Scout",
      attributes: ["Maltipoo", "Soft, wavy or curly coat", "United States", "10-15 years"],
      url: "https://www.thesprucepets.com/thmb/29c6R9LU3cdTRJCinDPnsp9Mh60=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-477970153-151e8e9e96e84f9dbb68613adb7bb10d.jpg"
    },
    {
      key: 3,
      name: "Buddy",
      attributes: ["Labrador Retriever", "Short double coat", "Canada", "10-12 years"],
      url: "https://www.thesprucepets.com/thmb/29c6R9LU3cdTRJCinDPnsp9Mh60=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-477970153-151e8e9e96e84f9dbb68613adb7bb10d.jpg"
    },
    {
      key: 4,
      name: "Max",
      attributes: ["Beagle", "Short, dense coat", "England", "10-15 years"],
      url: "https://www.thesprucepets.com/thmb/m29hlAY-vPlxWtpE0GeJRfhVibY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/beagle-of-12-weeks-155967777-588660e55f9b58bdb3b796eb.jpg"
    },
    {
      key: 5,
      name: "Daisy",
      attributes: ["Golden Retriever", "Dense double coat", "Scotland", "10-12 years"],
      url: "https://www.thesprucepets.com/thmb/LYhZtlo8CxXFidUCzQ2I0p1XtHY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/golden-retriever-dog-1252460847-57203adfb2414174af722d9a31f2a18b.jpg"
    },
    {
      key: 6,
      name: "Charlie",
      attributes: ["Border Collie", "Smooth or rough double coat", "United Kingdom", "12-15 years"],
      url: "https://www.thesprucepets.com/thmb/6eK3ztrHgMyMd_tC07E3Hc030Sc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/border-collie-3753041_640-09e4a4dc66214003a6f4387644733ecc.jpg"
    },
    {
      key: 7,
      name: "Luna",
      attributes: ["Dalmatian", "Short, dense coat", "Croatia", "11-13 years"],
      url: "https://www.thesprucepets.com/thmb/YsSkmgzSVrr57fGgHF2phrVawQk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-of-dalmatian-dog-running-on-grass-700830815-58e7e5ac57c64646842f3a3b7c11bebb.jpg"
    },
    {
      key: 8,
      name: "Milo",
      attributes: ["Siberian Husky", "Thick double coat", "Siberia", "12-14 years"],
      url: "https://www.thesprucepets.com/thmb/xGKuarSm5pS4WDmo6rX16NNMMBU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/close-up-of-siberian-husky-relaxing-on-snowy-field-674493607-a21bafa0eb374e15a47bbf331ccf09d1.jpg"
    },
    {
      key: 9,
      name: "Coco",
      attributes: ["Pembroke Welsh Corgi", "Medium-length double coat", "Wales", "12-13 years"],
      url: "https://www.thesprucepets.com/thmb/8nYSf1me_8OQtkFSFbGIADCJfXc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_corgi_1117986_recirc_917-ac4ab4ec3cb6469397c6c023e7c28b28.jpg"
    },
    {
      key: 10,
      name: "Toby",
      attributes: ["Pomeranian", "Long double coat", "Germany and Poland", "12-16 years"],
      url: "https://www.thesprucepets.com/thmb/lThpwogzgDC8OvR0mts6QBp2yOU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pomeranian-108995744-581636ae3df78cc2e891d882.jpg"
    },
    {
      key: 11,
      name: "Bella",
      attributes: ["Yorkshire Terrier", "Long, silky single coat", "England", "11-15 years"],
      url: "https://www.thesprucepets.com/thmb/dYBwqmuIkAtv9eqbaJBzPaUevRs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-dog-breeds-we-can-t-get-enough-of-4589340-05-2989cb58543d42d9869c7c2204b48dab.jpg"
    },
    {
      key: 12,
      name: "Duke",
      attributes: ["Old English Sheepdog", "Long, shaggy double coat", "England", "10-12 years"],
      url: "https://www.thesprucepets.com/thmb/ITXjWPGrS9efSMwx6bVNP8lYJQM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/old-english-sheepdog-sticking-out-tongue-713838563-5c0a7582c9e77c0001e281c7.jpg"
    },
    {
      key: 13,
      name: "Rocky",
      attributes: ["American Staffordshire Terrier", "Short, stiff coat", "United States", "12-16 years"],
      url: "https://www.thesprucepets.com/thmb/W46YHLe5otz56NbUOLr1qQ5AC_8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cute-dog-breeds-we-can-t-get-enough-of-4589340-07-7dfef5866dd84fcc83964fd865ff8a25.jpg"
    },
    {
      key: 14,
      name: "Waffles",
      attributes: ["Labrador Retriever", "Short double coat", "Canada", "10-12 years"],
      url: "https://www.thesprucepets.com/thmb/0CcPaUYnnVYB1BOqe1toyS6W3wo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_labrador_1117977_recirc_2681-9116ac57b06b48fbadb7cf6ea7c03ddb.jpg"
    },
    {
      key: 15,
      name: "Juniper",
      attributes: ["German Shepherd", "Dense double coat", "Germany", "9-13 years"],
      url: "https://images.dog.ceo/breeds/german-shepherd/n02106662_320.jpg"
    },
    {
      key: 16,
      name: "Frenchie",
      attributes: ["French Bulldog", "Short, smooth coat", "France", "10-12 years"],
      url: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4500.jpg"
    },
    {
      key: 17,
      name: "Puffy",
      attributes: ["Poodle", "Curly, low-shedding coat", "Germany", "10-18 years"],
      url: "https://images.dog.ceo/breeds/poodle-standard/n02113799_5766.jpg"
    },
    {
      key: 18,
      name: "Sunny",
      attributes: ["Rottweiler", "Short double coat", "Germany", "9-10 years"],
      url: "https://images.dog.ceo/breeds/rottweiler/n02106550_1323.jpg"
    },
    {
      key: 19,
      name: "Nala",
      attributes: ["Dachshund", "Smooth, wirehaired, or longhaired", "Germany", "12-16 years"],
      url: "https://images.dog.ceo/breeds/dachshund/reese.jpg"
    },
    {
      key: 20,
      name: "Mimi",
      attributes: ["Shih Tzu", "Long, flowing double coat", "Tibet/China", "10-18 years"],
      url: "https://images.dog.ceo/breeds/shihtzu/n02086240_1205.jpg"
    },
    {
      key: 21,
      name: "Maximus",
      attributes: ["Doberman Pinscher", "Short, smooth coat", "Germany", "10-12 years"],
      url: "https://images.dog.ceo/breeds/doberman/n02107142_17147.jpg"
    },
    {
      key: 22,
      name: "Giant",
      attributes: ["Great Dane", "Short, smooth coat", "Germany", "7-10 years"],
      url: "https://images.dog.ceo/breeds/dane-great/n02109047_4267.jpg"
    },
    {
      key: 23,
      name: "Ziggy",
      attributes: ["Boxer", "Short, smooth coat", "Germany", "10-12 years"],
      url: "https://images.dog.ceo/breeds/boxer/n02108089_2360.jpg"
    },
    {
      key: 24,
      name: "Taco",
      attributes: ["Chihuahua", "Smooth or long coat", "Mexico", "14-16 years"],
      url: "https://images.dog.ceo/breeds/chihuahua/n02085620_4951.jpg"
    },
    {
      key: 25,
      name: "Bean",
      attributes: ["Australian Shepherd", "Medium-length double coat", "United States", "12-15 years"],
      url: "https://images.dog.ceo/breeds/australian-shepherd/leroy.jpg"
    },
    {
      key: 26,
      name: "Pudding",
      attributes: ["Bernese Mountain Dog", "Long, thick double coat", "Switzerland", "7-10 years"],
      url: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_160.jpg"
    },
    {
      key: 27,
      name: "Roo",
      attributes: ["Basset Hound", "Short, smooth coat", "France", "12-13 years"],
      url: "https://images.dog.ceo/breeds/hound-basset/n02088238_9154.jpg"
    },
    {
      key: 28,
      name: "Walnut",
      attributes: ["Boston Terrier", "Short, smooth coat", "United States", "11-13 years"],
      url: "https://images.dog.ceo/breeds/terrier-boston/bostonterrier_000002.jpg"
    },
    {
      key: 29,
      name: "Zuzu",
      attributes: ["Cavalier King Charles Spaniel", "Medium-length silky coat", "England", "12-15 years"],
      url: "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_4199.jpg"
    },
    {
      key: 30,
      name: "Juno",
      attributes: ["English Bulldog", "Short, smooth coat", "England", "8-10 years"],
      url: "https://images.dog.ceo/breeds/bulldog-english/bunz.jpg"
    },
    {
      key: 31,
      name: "Huckleberry",
      attributes: ["Pug", "Short, smooth coat", "China", "13-15 years"],
      url: "https://images.dog.ceo/breeds/pug/n02110958_5555.jpg"
    },
    {
      key: 32,
      name: "Snowy",
      attributes: ["Samoyed", "Thick, fluffy double coat", "Siberia", "12-14 years"],
      url: "https://images.dog.ceo/breeds/samoyed/n02111889_3566.jpg"
    },
    {
      key: 33,
      name: "Hachi",
      attributes: ["Akita", "Thick double coat", "Japan", "10-13 years"],
      url: "https://images.dog.ceo/breeds/akita/512px-ainu-dog.jpg"
    },
    {
      key: 34,
      name: "Odie",
      attributes: ["Maltese", "Long, silky single coat", "Malta", "12-15 years"],
      url: "https://images.dog.ceo/breeds/maltese/n02085936_8447.jpg"
    },
    {
      key: 35,
      name: "Pippin",
      attributes: ["Newfoundland", "Thick, water-resistant double coat", "Canada", "9-10 years"],
      url: "https://images.dog.ceo/breeds/newfoundland/n02111277_3653.jpg"
    },
    {
      key: 36,
      name: "Roo",
      attributes: ["Miniature Schnauzer", "Wiry double coat", "Germany", "12-15 years"],
      url: "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_1956.jpg"
    },
    {
      key: 37,
      name: "Remy",
      attributes: ["Weimaraner", "Short, smooth coat", "Germany", "10-13 years"],
      url: "https://images.dog.ceo/breeds/weimaraner/n02092339_3165.jpg"
    },
    {
      key: 38,
      name: "Bernie",
      attributes: ["Saint Bernard", "Short or long double coat", "Switzerland", "8-10 years"],
      url: "https://images.dog.ceo/breeds/stbernard/n02109525_2648.jpg"
    },
    {
      key: 39,
      name: "Shiba",
      attributes: ["Shiba Inu", "Short double coat", "Japan", "13-16 years"],
      url: "https://images.dog.ceo/breeds/shiba/shiba-10.jpg"
    },
    {
      key: 40,
      name: "Papi",
      attributes: ["Papillon", "Long, silky single coat", "France/Belgium", "14-16 years"],
      url: "https://images.dog.ceo/breeds/papillon/n02086910_5017.jpg"
    },
    {
      key: 41,
      name: "Havana",
      attributes: ["Havanese", "Long, soft double coat", "Cuba", "14-16 years"],
      url: "https://images.dog.ceo/breeds/havanese/00100trportrait_00100_burst20191103202017556_cover.jpg"
    },
    {
      key: 42,
      name: "Ridge",
      attributes: ["Rhodesian Ridgeback", "Short, dense coat", "Southern Africa", "10-12 years"],
      url: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_7480.jpg"
    },
    {
      key: 43,
      name: "Mabel",
      attributes: ["English Springer Spaniel", "Medium-length, feathered coat", "England", "12-14 years"],
      url: "https://images.dog.ceo/breeds/springer-english/n02102040_629.jpg"
    },
    {
      key: 44,
      name: "Viz",
      attributes: ["Vizsla", "Short, smooth coat", "Hungary", "12-14 years"],
      url: "https://images.dog.ceo/breeds/vizsla/n02100583_11163.jpg"
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
  const [banList, setBanList] = useState([]);

  const generateQuery = () => {

    let currentItem = images[Math.floor(Math.random() * images.length)];

    let isBanned = currentItem.attributes.some((attribute) => banList.includes(attribute));

    // let currentImageURL = Math.floor(Math.random() * images.length);
    if (isBanned) {
      generateQuery();
    }
    else {
      const updatedImage = { ...image };
      updatedImage.url = currentItem.url;
      setImage(updatedImage);

      let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${updatedImage.url}&format=${updatedImage.format}&width=${updatedImage.width}&height=${updatedImage.height}&no_ads=${updatedImage.no_ads}&response_type=json&wait_until=network_idle`;
      callAPI(query);
    }
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
      <div >
        <h1>Dreaming with Dogs</h1>
        <h2>Welcome to Dreaming with Dogs!</h2>


        {/* {currentImage && <img src={currentImage} alt="Generated" />} */}
        <button onClick={() => {
          generateQuery();
        }}>Generate Image</button>
        <Dogs image={currentImage}
          attributes={images.find(img => img.url === image.url)?.attributes}
          handleAttributeClick={(attribute) => banList.includes(attribute) ? null : setBanList([...banList, attribute])} />

      </div>
      <div className="banned-qualities">
        <h3>Banned Attributes</h3>
        <ul>
          {banList.map((quality, index) => (
            <li key={index} onClick={() => banList.includes(quality) ? setBanList(banList.filter(q => q != quality)) : null}>{quality}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
