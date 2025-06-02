import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://backend-api-sx0t.onrender.com';

const ReadinessForm = () => {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    const navigate = useNavigate();

    const fetchAndSet = async (url, setter) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setter(data);
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            setter([]);
        }
    };

    // Fetch all states from backend
    useEffect(() => {
        fetchAndSet(`${BASE_URL}/api/states`, setStates);
    }, []);

    // Fetch districts when state is selected
    useEffect(() => {
        if (selectedState) {
            fetchAndSet(`${BASE_URL}/api/districts/${selectedState}`, setDistricts);
            if (districts.length > 0) setDistricts(districts); // avoid resetting if same state
            if (selectedDistrict) setSelectedDistrict(''); // reset district selection on state change
            setBlocks([]);
            setSelectedBlock('');
            setVillages([]);
            setSelectedVillage('');
        } else {
            setDistricts([]);
            setSelectedDistrict('');
            setBlocks([]);
            setSelectedBlock('');
            setVillages([]);
            setSelectedVillage('');
        }
    }, [selectedState]);

    // Fetch blocks when district is selected
    useEffect(() => {
        if (selectedState && selectedDistrict) {
            fetchAndSet(`${BASE_URL}/api/blocks/${selectedState}/${selectedDistrict}`, setBlocks);
            if (selectedBlock) setSelectedBlock(''); // reset block selection on district change
            setVillages([]);
            setSelectedVillage('');
        } else {
            setBlocks([]);
            setSelectedBlock('');
            setVillages([]);
            setSelectedVillage('');
        }
    }, [selectedDistrict, selectedState]);

    // Fetch villages when block is selected
    useEffect(() => {
        if (selectedState && selectedDistrict && selectedBlock) {
            fetchAndSet(`${BASE_URL}/api/villages/${selectedState}/${selectedDistrict}/${selectedBlock}`, setVillages);
            if (selectedVillage) setSelectedVillage(''); // reset village selection on block change
        } else {
            setVillages([]);
            setSelectedVillage('');
        }
    }, [selectedBlock, selectedDistrict, selectedState]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/readiness-score', {
            state: {
                state: selectedState,
                district: selectedDistrict,
                block: selectedBlock,
                village: selectedVillage,
            },
        });
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 m-10">
            <h2 className="text-2xl font-bold mb-4">Select Location</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow- space-y-4 w-full max-w-lg">
                
                {/* State Selection */}
                <div>
                    <label className="block text-gray-700">State</label>
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    >
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District Selection */}
                <div>
                    <label className="block text-gray-700">District</label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedState}
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Block Selection */}
                <div>
                    <label className="block text-gray-700">Block / Tehsil</label>
                    <select
                        value={selectedBlock}
                        onChange={(e) => setSelectedBlock(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedDistrict}
                    >
                        <option value="">Select Block</option>
                        {blocks.map((block) => (
                            <option key={block} value={block}>
                                {block}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Village Selection */}
                <div>
                    <label className="block text-gray-700">Village / Habitation</label>
                    <select
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedBlock}
                    >
                        <option value="">Select Village</option>
                        {villages.map((village) => (
                            <option key={village.name} value={village.name}>
                                {village.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                    >
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReadinessForm;
