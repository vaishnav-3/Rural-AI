import React, { useState, useEffect } from "react";
import SuggestionCard from "./card"; // Import the SuggestionCard component
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { progress } from "framer-motion";


const MAP_API_KEY = "AIzaSyAs69xs8PnRAYu14WB4MaCGhKQov-8jOFM";




const ReadinessScore = () => {
  const location = useLocation();
  const {
    village: selectedVillage,
    state: selectedState,
    district: selectedDistrict,
    block: selectedBlock,
  } = location.state || {};

  const [villageDetails, setVillageDetails] = useState(null);
  const [villageInfo, setVillageInfo] = useState(null);
  const [geminiSuggestions, setGeminiSuggestions] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const [developmentScores, setDevelopmentScores] = useState(null);
  const [ProgressScores, setProgressScores] = useState(null);

  const defaultLocation = { lat: 20.0743, lng: 73.6610 };

  // Fetch village data
  useEffect(() => {
    if (!selectedState || !selectedDistrict || !selectedBlock || !selectedVillage) {
      setVillageDetails(defaultLocation);
      return;
    }

    fetch("https://backend-api-sx0t.onrender.com/villageinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: selectedState,
        district: selectedDistrict,
        block: selectedBlock,
        village: selectedVillage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.facilities &&
          Array.isArray(data.facilities) &&
          data.facilities.length > 0 &&
          data.facilities[0].latitude &&
          data.facilities[0].longitude
        ) {
          const lat = parseFloat(data.facilities[0].latitude);
          const lng = parseFloat(data.facilities[0].longitude);
          setVillageDetails({ lat, lng });
          setVillageInfo(data);
        } else {
          setVillageDetails(defaultLocation);
        }
      })
      .catch(() => setVillageDetails(defaultLocation));
  }, [selectedVillage, selectedState, selectedDistrict, selectedBlock]);

  // Fetch Gemini suggestions
  useEffect(() => {
    if (!selectedState || !selectedDistrict || !selectedBlock || !selectedVillage || !villageInfo) return;

    const fetchGeminiSuggestions = async () => {
      setLoadingSuggestions(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3000/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            village: selectedVillage,
            block: selectedBlock,
            district: selectedDistrict,
            state: selectedState,
            facilities: villageInfo?.facilities || [],
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setGeminiSuggestions(data.suggestions);
        } else {
          setError("Failed to load development suggestions.");
        }
      } catch (error) {
        setError("Failed to fetch development suggestions.");
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchGeminiSuggestions();
  }, [selectedVillage, selectedState, selectedDistrict, selectedBlock, villageInfo]);

  // Fetch Gemini development scores
  useEffect(() => {
    if (!selectedState || !selectedDistrict || !selectedBlock || !selectedVillage || !villageInfo) return;

    const fetchGeminiScores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gemini-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            village: selectedVillage,
            block: selectedBlock,
            district: selectedDistrict,
            state: selectedState,
            facilities: villageInfo?.facilities || [],
          }),
        });

        const data = await response.json();
        console.log("Development Scores:", data);
        if (response.ok) {
          setDevelopmentScores(data.scores);
          // const datu = data.scores.education?.reason;
          // console.log("Development datu:", datu);
        }
      } catch (error) {
        console.error("Failed to fetch development scores:", error);
      }
    };

    fetchGeminiScores();
  }, [selectedVillage, selectedState, selectedDistrict, selectedBlock, villageInfo]);


  useEffect(() => {
    if (!selectedState || !selectedDistrict || !selectedBlock || !selectedVillage || !villageInfo) return;

    const fetchGeminiProgress = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gemini-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            village: selectedVillage,
            block: selectedBlock,
            district: selectedDistrict,
            state: selectedState,
            facilities: villageInfo?.facilities || [],
          }),
        });

        const data = await response.json();
        console.log("Development Scores:", data);
        if (response.ok) {
          setProgressScores(data.progress);
          // const datu = data.scores.education?.reason;
          // console.log("Development datu:", datu);
        }
      } catch (error) {
        console.error("Failed to fetch development scores:", error);
      }
    };

    fetchGeminiProgress();
  }, [selectedVillage, selectedState, selectedDistrict, selectedBlock, villageInfo]);


  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-red-500">
          ❌ No village selected. Please go back and select a location.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-4">{selectedVillage || "Unknown Village"}</h1>

      <div className="mt-6 w-full h-96">
        {!villageDetails ? (
          <p className="text-yellow-300 text-lg text-center">🛰️ Loading map...</p>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={villageDetails}
            zoom={12}
          >
            <Marker position={villageDetails} animation={window.google.maps.Animation.DROP} />
          </GoogleMap>
        )}
      </div>
          <div className="mt-6 w-full bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">About {selectedVillage}</h2>
      {villageInfo ? (
        <>
          <p className="text-gray-300 mb-4">
            {selectedDistrict && `Located in ${selectedDistrict} District, ${selectedState}.`}
            <br />
            {selectedBlock && `Belongs to ${selectedBlock} Block.`}
          </p>

          <div className="bg-gray-700 p-4 rounded-md shadow">
            <table className="w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-900 text-gray-200">
                  <th className="border border-gray-600 px-4 py-2">Attribute</th>
                  <th className="border border-gray-600 px-4 py-2">Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Latitude</td>
                  <td className="border border-gray-600 px-4 py-2">
                    {villageDetails?.lat || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Longitude</td>
                  <td className="border border-gray-600 px-4 py-2">
                    {villageDetails?.lng || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-gray-300">Loading village information...</p>
      )}
    </div>
      <div className="mt-6 w-full  bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Development Suggestions</h2>
        {loadingSuggestions ? (
          <p className="text-yellow-300">🤖 Generating suggestions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          geminiSuggestions && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {geminiSuggestions.map((suggestion, index) => (
                <SuggestionCard key={index} title={suggestion.title} points={suggestion.points} />
              ))}
            </div>
          )
        )}
      </div>
      <div className="mt-6 w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Village Development Scores</h2>
        <div className="bg-white p-4 rounded-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={
                developmentScores
                  ? [
                      { name: "Education", score: developmentScores.education?.score || 0 },
                      { name: "Healthcare", score: developmentScores.healthcare?.score || 0 },
                      { name: "Water Supply", score: developmentScores.waterSupply?.score || 0 },
                      { name: "Electricity", score: developmentScores.electricity?.score || 0 },
                    ]
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* {developmentScores && (
          <div className="mt-6 space-y-2 text-sm text-gray-900">
            <p><strong>Education:</strong> {developmentScores.education?.reason}</p>
            <p><strong>Healthcare:</strong> {developmentScores.healthcare?.reason}</p>
            <p><strong>Water Supply:</strong> {developmentScores.waterSupply?.reason}</p>
            <p><strong>Electricity:</strong> {developmentScores.electricity?.reason}</p>
          </div>
        )} */}
      </div>
        <div className="mt-6 w-full bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Village Progress Over Time</h2>

    <div className="bg-white p-4 rounded-md">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={
            ProgressScores
              ? ProgressScores.map((item) => ({
                  name: item.year,
                  Education: item.education,
                  Healthcare: item.healthcare,
                  Water: item.waterSupply,
                  Electricity: item.electricity,
                }))
              : []
          }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Education" stroke="#8884d8" />
          <Line type="monotone" dataKey="Healthcare" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Water" stroke="#ffc658" />
          <Line type="monotone" dataKey="Electricity" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
    </div>
  );
};

export default ReadinessScore;