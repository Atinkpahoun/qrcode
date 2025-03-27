import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Email = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("")

    const generateMailtoLink = () => {
        if (!email) return "";
        return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Générateur de QR Code</h1>

      <form action=""></form>

      
       

      {/* Génération du QR Code */}
      {email && <QRCodeCanvas value={generateMailtoLink()} size={200} fgColor={color} />}

    </div>
  );
};

export default Email;
