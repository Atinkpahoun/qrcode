import { useState } from "react";
import {QRCodeSVG} from "qrcode.react";

const QRGenerator = () => {
  const [images, setImages] = useState([]); // Stocke les images locales
  const [imageUrls, setImageUrls] = useState([]); // Stocke les URLs Cloudinary
  const [qrDataList, setQrDataList] = useState([]); // Stocke les QR Codes
  const [bgColor, setBgColor] = useState("");
  const [imageInt, setImageInt] = useState("");
  const [logoHeight, setLogoHeight] = useState(35);
  const [logoWidth, setLogoWidth] = useState(35);
  const [error, setError] = useState("");

  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState('');
  const [tempLogoWidth, setTempLogoWidth] = useState('');

  const [showColorMenu, setShowColorMenu] = useState(false);  // Pour le menu des couleurs
      const [showLogoMenu, setShowLogoMenu] = useState(false);    // Pour le menu des logos
  
        
      const toggleColorMenu = () => {
        setShowColorMenu((prev) => !prev);  // Bascule l'affichage du menu des couleurs
      };
      
      const toggleLogoMenu = () => {
        setShowLogoMenu((prev) => !prev);  // Bascule l'affichage du menu des logos
      };
      
     
  
      const handleImageUpload = (event) => {
          const file = event.target.files[0];
          if (!file) return;
      
          const reader = new FileReader();
          reader.onloadend = () => {
              setTempImageInt(reader.result);
          };
          reader.readAsDataURL(file);
        };

  // Fonction pour uploader une image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr"); // Remplace par ton upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnmnqtqx2/image/upload", // Remplace par ton Cloud Name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrls((prevUrls) => [...prevUrls, data.secure_url]); // Ajoute l'URL à la liste
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  // Gestion du fichier sélectionné
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setImages((prevImages) => [...prevImages, URL.createObjectURL(file)]); // Ajoute l'aperçu local
      uploadImage(file); // Upload l’image sur Cloudinary
    });
  };


  const handleClick = (e) => {
    e.preventDefault()

    if (!isValidUrl(url)) {
        setError("Veuillez entrer une URL valide.");
        return;
      }
      
    setError("");
    setQrValue(url);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoHeight(tempLogoHeight);
    setLogoWidth(tempLogoWidth);
  };
  // Fonction pour générer les QR Codes
  const generateQRCode = () => {
    setQrDataList(imageUrls); // Génère un QR Code pour chaque URL Cloudinary
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Input pour sélectionner plusieurs images */}
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />

      {/* Affichage des images sélectionnées */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg" />
        ))}
      </div>

      {/* Bouton pour générer les QR Codes */}
      {imageUrls.length > 0 && (
        <button
          onClick={generateQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Générer les QR Codes
        </button>
      )}

      {/* Affichage des QR Codes */}
      <div className="grid grid-cols-2 gap-4">
        {qrDataList.map((url, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <QRCodeSVG value={url} size={150} />

            <div className="p-4">
                                <button
                                  onClick={toggleColorMenu}
                                  className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
                                >
                                  Couleurs
                                  <FaChevronDown />
                                </button>
                                
                                {showColorMenu && (
                                  <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
                                    
                                    <div className="mb-4">
                                      <label className="text-lg font-medium">
                                        Couleur 
                                        <input
                                          type="color"
                                          value={color}
                                          onChange={(e) => {setTempColor(e.target.value)
                                          }}
                                          className="w-10 h-10 p-1 border rounded-md ml-2"
                                        />
                                      </label>
                                    </div>
                                    <div className="mb-4">
                                      <label className="text-lg font-medium">
                                        Couleur de Fond
                                        <input
                                          type="color"
                                          value={bgColor}
                                          onChange={(e) => {setTempBgColor(e.target.value);
                                          }}  
                                          className="w-10 h-10 p-1 border rounded-md ml-2"
                                        />
                                      </label>
                                    </div>
                                    
                                  </div>
                                )}
                              </div>
            
            
                                <div className="p-4">
                                    <button
                                      onClick={toggleLogoMenu}
                                      className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center "
                                    >
                                      Logo
                                      <FaChevronDown/>
                                    </button>
                                    
                                    {showLogoMenu && (
                                      <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageUpload}
                                          className="mb-4"
                                        />
                                        <label className="block text-lg font-medium mb-2">
                                          Hauteur
                                          <input
                                            type="number"
                                            className="border p-2 rounded-md w-72 mb-4"
                                            value={tempLogoHeight}
                                            onChange={(e) => setTempLogoHeight(e.target.value)}
                                            placeholder="Entrez la hauteur"
                                          />
                                        </label>
                                        <label className="block text-lg font-medium mb-2">
                                          Largeur
                                          <input
                                            type="number"
                                            className="border p-2 rounded-md w-72 mb-4"
                                            value={tempLogoWidth}
                                            onChange={(e) => setTempLogoWidth(e.target.value)}
                                            placeholder="Entrez la largeur"
                                          />
                                        </label>
                                      </div>
                                    )}
                                  </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRGenerator;
