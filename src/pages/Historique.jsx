import React, { useEffect, useState } from "react";
import DownloadQR from "../composants/DownloadQR";
import ModifierQRCodeDrawer from "../components/ModifierQRCodeDrawer";
import axios from "axios";
import api from "../services/Api";


function Historique() {
  const [qrcodes, setQrcodes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedType, setSelectedType] = useState("tous");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [qrCodeSelectionné, setQrCodeSelectionné] = useState(null);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  useEffect(() => {
    filterData();
  }, [qrcodes, selectedType, search, fromDate, toDate]);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/qrcodes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQrcodes(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des QR codes :", error);
    } finally {
      setLoading(false);
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

    if (filterDate) {
      data = data.filter((qr) => {
        const creationDate = new Date(qr.date_creation).toISOString().split("T")[0];
        return creationDate === filterDate;
      });
    }

    setFiltered(data);
  };

  const handleModify = async (qr) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/qrcodes/${qr.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (res.data && res.data.qrcode) {
        setQrCodeSelectionné(res.data.qrcode);
        setIsEditing(true);
      } else {
        alert("QR code introuvable.");
      }
      setIsEditing(true);
    } catch (error) {
      console.error("Erreur lors du chargement du QR code :", error);
      alert("Impossible de charger les données complètes du QR code.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce QR code ?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/qrcodes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQrcodes((prev) => prev.filter((qr) => qr.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du QR code :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };  

  return (
    <div className="pt-5 xl:pt-12 justify-center doto">
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
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-[#0000FF] rounded-md p-2"
        />
      </div>

      {loading ? (
            <div className="text-center mt-10 text-blue-500">Chargement en cours...</div>
          ) : (
      <div className="flex flex-wrap justify-center gap-5 lg:gap-10 mt-8">
        {filtered.map((qr) => (
          <div
            key={qr.id}
            className="flex rounded border-2 border-[#0000FF] p-2 md:p-4 max-w-[500px] shadow"
          >
            <div className="justify-center flex flex-col pr-2 md:pr-4 border-r border-[#0000FF]">
            <img
                className="h-28 w-28 object-contain cursor-pointer"
                src={qr.image_url || "/src/assets/degrader1.gif"}
                alt="qr preview"
                
             />




              <div className="justify-center flex flex-col mt-4 space-y-3">
                <button className="border-2 border-[#0000FF] rounded px-6 bg-blue-50 py-1">
                  {qr.scan_count} scans
                </button>
                <DownloadQR qrId={qr.id} />
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between space-y-6">
              <div className="space-y-3">
                <h1 className="text-[#0000FF] font-medium text-lg capitalize">{qr.type}</h1>
                <h1>{qr.nom}</h1>
                <h1>
                  Créé : {
                    (() => {
                      const [date, time] = qr.date_creation.split(" ");
                      return `${date} à ${time}`;
                    })()
                  }
                </h1>

                <h1>
                    Modifié : {
                      (() => {
                        const updated = new Date(qr.updated_at);
                        const date = updated.toLocaleDateString('fr-FR'); // jj/mm/aaaa
                        const time = updated.toLocaleTimeString('fr-FR'); // hh:mm:ss
                        return `${date} à ${time}`;
                      })()
                    }
                </h1>
              </div>
              <button
                className="rounded px-6 py-1 bg-[#0000FF] text-white"
                onClick={() => handleModify(qr)}
              >
                Modifier
              </button>

              <button
                onClick={() => handleDelete(qr.id)}
                className="text-red-600 hover:text-red-800"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>)}

      {isEditing && (
        <ModifierQRCodeDrawer
          qrCodeData={qrCodeSelectionné}
          onClose={() => setIsEditing(false)}
          onUpdate={() => {
            fetchQRCodes();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default Historique;
