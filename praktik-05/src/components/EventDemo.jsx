import React, { useState } from 'react';
import { Mouse, Keyboard, Hand, Info } from 'lucide-react';

const EventDemo = () => {
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [keyInfo, setKeyInfo] = useState('');

  // Click Events
  const handleClick = () => {
    setMessage('Tombol diklik!');
  };

  const handleDoubleClick = () => {
    setMessage('Double click terdeteksi!');
  };

  // Mouse Events
  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseEnter = () => {
    setMessage('Mouse masuk area!');
  };

  const handleMouseLeave = () => {
    setMessage('Mouse keluar area!');
  };

  // Keyboard Events
  const handleKeyDown = (event) => {
    setKeyInfo(`Key: ${event.key}, Code: ${event.code}`);
  };

  const handleKeyUp = () => {
    setTimeout(() => setKeyInfo(''), 1000);
  };

  // Context Menu
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMessage('Context menu dicegah!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Demo Penanganan Event
          </h1>
          <p className="text-slate-600 text-lg">
            Eksplorasi berbagai event interaksi di React
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-8 animate-in fade-in slide-in-from-top duration-300">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Info className="text-blue-500" size={20} />
                <p className="text-blue-800 font-medium">{message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Button Events Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Hand className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Button Events</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Klik Saya
              </button>

              <button
                onDoubleClick={handleDoubleClick}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Double Klik Saya
              </button>

              <button
                onContextMenu={handleContextMenu}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Right Click Saya
              </button>
            </div>
          </div>

          {/* Mouse Area Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-100 p-3 rounded-xl">
                <Mouse className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Mouse Events</h2>
            </div>

            <div
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-8 border-2 border-dashed border-pink-300 hover:border-pink-400 transition-all duration-200 cursor-crosshair min-h-64 flex flex-col items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Mouse className="text-pink-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Area Interaksi Mouse
              </h3>
              <p className="text-slate-600 mb-4">Gerakkan mouse di area ini</p>
              <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-slate-200">
                <p className="text-slate-700 font-mono text-sm">
                  X: <span className="text-pink-600 font-bold">{position.x}</span> | 
                  Y: <span className="text-purple-600 font-bold ml-2">{position.y}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Section - Full Width */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Keyboard className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Keyboard Events</h2>
          </div>

          <input
            type="text"
            placeholder="Ketik sesuatu di sini..."
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
          />
          
          {keyInfo && (
            <div className="mt-4 bg-indigo-50 rounded-lg p-4 border border-indigo-200 animate-in fade-in slide-in-from-bottom duration-200">
              <p className="text-indigo-800 font-mono text-sm">{keyInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDemo;
