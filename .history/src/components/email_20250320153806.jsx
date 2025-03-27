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

      <input
        type="text"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md w-80 mb-4"
      />
      <input type="text"
      placeholder="Subject" 
      onChange={(e) => setSubject(e.target.value)}
      value={subject}
      className="border p-2 rounded-md w-80 mb-4" />
      <input type="text"
        placeholder="Message" 
        className="border p-2 rounded-md w-80 mb-4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
       />
       <input 
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
         />
       

      {/* Génération du QR Code */}
      {email && <QRCodeCanvas value={generateMailtoLink()} size={200} fgColor={color} />}

    </div>
  );
};

export default Email;
