import React from "react";

const DownloadQR = ({ qrRef, qrSvgRef, leNom }) => {
  const downloadPNG = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${leNom || "QRCode"}.png`;
    link.click();
  };

  const downloadSVG = () => {
    const svg = qrSvgRef.current?.querySelector("svg");
    if (!svg) {
      console.error("QR code SVG not found!");
      return;
    }
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = `${leNom || "QRCode"}.svg`;
    link.click();
    
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="mt-4 flex gap-4">
      <button onClick={downloadPNG} className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Télécharger PNG
      </button>
      <button onClick={downloadSVG} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
        Télécharger SVG
      </button>
    </div>
  );
};

export default DownloadQR;
