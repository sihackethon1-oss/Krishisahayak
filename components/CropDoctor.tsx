
import React, { useState, useRef } from 'react';
import { Camera, Upload, Send, RefreshCw, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { diagnoseCrop } from '../services/geminiService';

const CropDoctor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const result = await diagnoseCrop(base64Data);
      setDiagnosis(result);
    } catch (error) {
      console.error(error);
      setDiagnosis("Failed to diagnose. Please check your API connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setDiagnosis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Crop Doctor</h2>
        <p className="text-gray-500 mt-2">Upload or capture a photo of a leaf or crop part to get an instant AI diagnosis and treatment plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            className={`aspect-square rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center cursor-pointer overflow-hidden ${
              image ? 'border-green-500 bg-white' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-green-300'
            }`}
            onClick={() => !image && fileInputRef.current?.click()}
          >
            {image ? (
              <div className="relative w-full h-full">
                <img src={image} alt="Crop" className="w-full h-full object-cover rounded-xl" />
                <button 
                  onClick={(e) => { e.stopPropagation(); reset(); }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-gray-700">Select Image</h4>
                <p className="text-sm text-gray-500 mt-1">Tap to open camera or browse gallery</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleImageUpload} 
                />
              </>
            )}
          </div>

          <button
            onClick={handleDiagnose}
            disabled={!image || isLoading}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              !image || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-green-600 text-white hover:bg-green-700 transform hover:-translate-y-1'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Analyzing Crop...' : 'Run AI Diagnosis'}
          </button>
        </div>

        {/* Diagnosis Result */}
        <div className="flex flex-col h-full">
          {diagnosis ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full">
              <div className="flex items-center gap-3 mb-6 text-green-600">
                <CheckCircle2 className="w-7 h-7" />
                <h3 className="text-xl font-bold text-gray-800">Expert Diagnosis</h3>
              </div>
              <div className="prose prose-green max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm md:text-base">
                  {diagnosis}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-3xl border-2 border-gray-200 border-dashed p-8 h-full flex flex-col items-center justify-center text-center text-gray-400">
              <AlertCircle className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-sm">Results will appear here after analysis.</p>
              <p className="text-xs mt-2 px-8">Our AI analyzes visual patterns of pests, fungi, and nutrient deficiencies.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p><b>Note:</b> AI diagnosis is for advisory purposes. Always consult with a local KVK officer or expert before applying chemical pesticides.</p>
      </div>
    </div>
  );
};

export default CropDoctor;
