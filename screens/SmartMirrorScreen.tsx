
import React, { useRef, useEffect, useState } from 'react';
import { ClothingItem } from '../types';
import { ChevronLeft, RefreshCcw, Save, Sparkles, AlertCircle, Wand2, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Props {
  selectedOutfit: ClothingItem | null;
  onBack: () => void;
  onChangeOutfit: () => void;
  onSaveLook: () => void;
}

const SmartMirrorScreen: React.FC<Props> = ({ selectedOutfit, onBack, onChangeOutfit, onSaveLook }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streamStarted, setStreamStarted] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: 720, height: 1280 }, 
            audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamStarted(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    startCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Draw mirrored video frame
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to base64
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  };

  const handleAIRefine = async () => {
    if (!prompt.trim()) return;
    
    const base64Data = captureFrame();
    if (!base64Data) return;

    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: `Edit this trial room mirror image based on this request: ${prompt}. Maintain the person and the outfit if possible, but apply the requested stylistic change or addition.` }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setEditedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
      setShowAIModal(false);
    } catch (err) {
      console.error("AI Refinement failed:", err);
      alert("AI Refinement failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setPrompt('');
    }
  };

  return (
    <div className="relative h-full bg-black overflow-hidden flex flex-col">
      {/* Hidden canvas for capturing frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Live Camera View or Edited Result */}
      {editedImage ? (
        <img src={editedImage} className="absolute inset-0 w-full h-full object-cover" alt="AI Edited" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        />
      )}

      {/* Processing Animation */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col items-center justify-center">
            <div className="scanning-line" />
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[40px] flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-neon/20 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="text-neon w-10 h-10" />
                </div>
                <div className="text-center">
                    <p className="text-neon font-bold tracking-widest text-xs mb-2">GEMINI 2.5 POWERED</p>
                    <p className="text-white text-xl font-bold">Refining Your Look...</p>
                </div>
                <Loader2 className="text-white animate-spin" />
            </div>
        </div>
      )}

      {/* Simulated AI Outfit Overlay (Only if not using edited image) */}
      {selectedOutfit && streamStarted && !editedImage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-72 h-[450px] animate-pulse">
            <img 
              src={selectedOutfit.image} 
              alt="Overlay" 
              className="w-full h-full object-contain opacity-70 mix-blend-overlay scale-125"
              style={{ filter: 'contrast(1.2) brightness(0.9)' }}
            />
          </div>
        </div>
      )}

      {/* Mirror UI Overlay */}
      <div className="relative z-10 flex flex-col h-full p-6 text-white bg-gradient-to-b from-black/40 via-transparent to-black/60">
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="px-4 py-1.5 bg-neon/80 backdrop-blur-md rounded-full text-midnight font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {editedImage ? 'AI RESULT' : 'SMART MIRROR'}
          </div>
        </div>

        {/* Floating AI Button */}
        {!isProcessing && (
            <div className="absolute top-24 right-6 flex flex-col gap-3">
                <button 
                    onClick={() => setShowAIModal(true)}
                    className="w-14 h-14 bg-midnight/80 backdrop-blur-xl border-2 border-neon rounded-2xl flex items-center justify-center shadow-xl shadow-midnight/50 active:scale-90 transition-transform"
                >
                    <Wand2 className="w-7 h-7 text-neon" />
                </button>
                {editedImage && (
                    <button 
                        onClick={() => setEditedImage(null)}
                        className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center active:scale-90 transition-transform"
                    >
                        <RefreshCcw className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>
        )}

        <div className="mt-auto space-y-4">
          {selectedOutfit ? (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4">
              <div className="flex items-center gap-4 mb-4">
                 <img src={selectedOutfit.image} className="w-16 h-16 rounded-xl object-cover" />
                 <div>
                    <h3 className="font-bold text-lg">{selectedOutfit.name}</h3>
                    <p className="text-xs text-neon font-medium">{selectedOutfit.material}</p>
                 </div>
                 <div className="ml-auto">
                    <span className="text-sm">😊</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={onChangeOutfit}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Change
                </button>
                <button 
                  onClick={onSaveLook}
                  className="flex-1 py-3 bg-neon text-midnight font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Look
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 space-y-6">
                <AlertCircle className="w-12 h-12 text-white/40 mx-auto" />
                <p className="text-white/60">Choose an outfit to see it reflected in real-time.</p>
                <button 
                  onClick={onChangeOutfit}
                  className="w-full py-4 bg-neon text-midnight font-bold rounded-2xl shadow-xl shadow-neon/20"
                >
                  Select Clothes
                </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Edit Modal */}
      {showAIModal && (
          <div className="absolute inset-0 bg-midnight/20 backdrop-blur-sm z-[100] flex items-end">
              <div className="w-full bg-white rounded-t-[40px] p-8 animate-slide-up">
                  <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-midnight">AI Refinement</h3>
                        <p className="text-xs text-gray-400">Powered by Gemini 2.5 Flash Image</p>
                      </div>
                      <button onClick={() => setShowAIModal(false)} className="p-2 bg-gray-100 rounded-full">
                          <X className="w-5 h-5 text-gray-400" />
                      </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                      <textarea 
                        autoFocus
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. 'Add a retro filter' or 'Make the background a cyberpunk city'"
                        className="w-full bg-transparent border-none outline-none text-midnight font-medium resize-none"
                        rows={3}
                      />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                      {['Retro Filter', 'Neon Glow', 'Remove Person', 'City View'].map(chip => (
                          <button 
                            key={chip}
                            onClick={() => setPrompt(chip)}
                            className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-neon hover:text-midnight transition-colors"
                          >
                              {chip}
                          </button>
                      ))}
                  </div>

                  <button 
                    onClick={handleAIRefine}
                    disabled={!prompt.trim()}
                    className="w-full py-4 bg-midnight text-white font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                      <Send className="w-5 h-5" />
                      Generate Refined Look
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default SmartMirrorScreen;
