import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import DownloadQR from "../composants/DownloadQR";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';

function Historique() {
  const [qrcodes, setQrcodes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedType, setSelectedType] = useState("tous");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchQRCodes();
  }, []);

  useEffect(() => {
    filterData();
  }, [qrcodes, selectedType, search, fromDate, toDate]);

  const fetchQRCodes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/qrcodes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQrcodes(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des QR codes :", error);
    }
  };

  const filterData = () => {
    let data = [...qrcodes];

    if (selectedType !== "tous") {
      data = data.filter((qr) => qr.type === selectedType);
    }

    if (search.trim() !== "") {
      data = data.filter((qr) =>
        qr.nom.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (fromDate) {
      data = data.filter((qr) => new Date(qr.date_creation) >= new Date(fromDate));
    }

    if (toDate) {
      data = data.filter((qr) => new Date(qr.date_creation) <= new Date(toDate));
    }

    setFiltered(data);
  };

  const handleModify = (id) => {
    window.location.href = `/modifier/${id}`;
  };

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  return (
    <div className="pt-24 xl:pt-28 justify-center doto">
      <h1 className="text-2xl xl:text-3xl font-bold text-[#0000FF] text-center">
        Bienvenu(e) dans l'historique de vos codes QR
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mt-6 xl:mt-10">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-blue-50 border-2 border-[#0000FF] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-blue-50 border-2 border-[#0000FF] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
        >
          <option value="tous">Tous les codes QR</option>
          <option value="url">URL</option>
          <option value="email">Email</option>
          <option value="texte">Texte</option>
          <option value="téléphone">Téléphone</option>
          <option value="image">Image</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border border-[#0000FF] rounded-md p-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border border-[#0000FF] rounded-md p-2"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8 lg:gap-10 mt-8">
        {filtered.map((qr) => {
          
          const color = qr.customization?.color || "#000000";
          const bgColor = qr.customization?.bgColor || "#ffffff";
          const imageInt = qr.customization?.imageInt;
          const taille = qr.customization?.logoTaille || 35;

          const value = qr.data?.texte || qr.data?.url || qr.data?.email || qr.data?.tel || qr.data?.texte || "";

          return (
            <div
              key={qr.id}
              className="flex flex-col md:flex-row rounded border-2 border-[#0000FF] p-4 max-w-[500px] shadow"
            >
              <div className="space-x-2 justify-center flex flex-row md:flex-col pb-4 md:pb-0 pr-0 md:pr-4 border-b md:border-b-0 border-r-0 md:border-r border-[#0000FF]">
                <div ref={qrSvgRef}>
                  <QRCodeSVG
                    value={value}
                    fgColor={color}
                    bgColor={bgColor}
                    size={100}
                    level="H"
                    imageSettings={
                      imageInt
                        ? {
                            src: imageInt,
                            height: taille,
                            width: taille,
                            excavate: true,
                          }
                        : undefined
                    }
                  />
                </div>
                <div ref={qrRef} className="hidden">
                  <QRCodeCanvas
                    value={value}
                    fgColor={color}
                    bgColor={bgColor}
                    size={250}
                    level="H"
                    imageSettings={
                      imageInt
                        ? {
                            src: imageInt,
                            height: taille,
                            width: taille,
                            excavate: true,
                          }
                        : undefined
                    }
                  />
                </div>

                <div className="justify-center flex flex-col mt-4 space-y-3">
                  <button className="border-2 border-[#0000FF] rounded px-3 md:px-6 bg-blue-50 py-1">
                    {qr.scan_count} scans
                  </button>
                  <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={qr.nom} />
                </div>
              </div>

              <div className="pt-4 md:pt-0 pl-0 md:pl-4 justify-between space-y-6">
                <div className="space-y-3">
                  <h1 className="text-[#0000FF] font-bold text-xl capitalize">{qr.type}</h1>
                  <h1>{qr.nom}</h1>
                  <h1>Créé : {new Date(qr.date_creation).toLocaleDateString()}</h1>
                  <h1>Modifié : {new Date(qr.updated_at).toLocaleDateString()}</h1>
                </div>
                <div className="flex space-x-5 items-center">
                  <button
                    className="rounded px-6 py-1 bg-[#0000FF] text-white"
                    onClick={() => handleModify(qr.id)}
                  >
                    Modifier
                  </button>
                  <FaTrash color="red" size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Historique;
