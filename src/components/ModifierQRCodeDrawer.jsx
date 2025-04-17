  import React from "react";
  import ModifierUrl from "../components/Modifier/ModifierUrl";
  import ModifierEmail from "./Modifier/ModifierEmail";
  import ModifierTexte from "./Modifier/ModifierTexte";
  import ModifierTelephone from "./Modifier/ModifierTelephone";
  import ModifierImage from "./Modifier/ModifierImage";

  function ModifierQRCodeDrawer({ qrCodeData, onClose, onUpdate }) {
  
    const parsedData = {
      ...qrCodeData,
      data: qrCodeData.data ? JSON.parse(qrCodeData.data) : {},
      customization: qrCodeData.customization ? JSON.parse(qrCodeData.customization) : {},
    };

    const renderComponent = () => {
      switch (qrCodeData.type) {
        case "url":
          console.log("qrCodeData envoyé au drawer :", qrCodeData);
          return <ModifierUrl qrCodeData={parsedData} onClose={onClose} onUpdate={onUpdate} />;

        case "email":
          return <ModifierEmail qrCodeData={parsedData} onClose={onClose} onUpdate={onUpdate} />;
        case "texte":
          return <ModifierTexte qrCodeData={parsedData} onClose={onClose} onUpdate={onUpdate} />;
          case "tel":
            return <ModifierTelephone qrCodeData={parsedData} onClose={onClose} onUpdate={onUpdate} />;
          
        case "image":
          return <ModifierImage qrCodeData={parsedData} onClose={onClose} onUpdate={onUpdate} />;
        default:
          return <p>Type de QR code non pris en charge.</p>;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-start p-5 overflow-auto">
        <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-3xl">
          <button onClick={onClose} className="text-red-500 float-right">✖</button>
          <div className="pt-6">{renderComponent()}</div>
        </div>
      </div>
    );
  }
  export default ModifierQRCodeDrawer
