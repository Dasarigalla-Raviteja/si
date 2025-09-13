import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, RotateCcw } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const VoiceButton = ({ 
  onCommand, 
  welcomeMessage,
  className = "",
  size = "lg",
  variant = "default",
  autoWelcome = false,
  showRepeatButton = true,
  customCommands = {},
}) => {
  const {
    isListening,
    isSpeaking,
    recognizedText,
    error,
    isSupported,
    toggleListening,
    speak,
    playWelcome,
    repeatInstructions,
    processVoiceCommand,
    vibrate,
  } = useVoiceSupport();

  // Play welcome message on mount if requested
  useEffect(() => {
    if (autoWelcome && isSupported) {
      playWelcome();
    }
  }, [autoWelcome, isSupported, playWelcome]);

  // Custom command processing
  const handleVoiceCommand = (category, originalCommand) => {
    // Call the parent callback if provided
    if (onCommand) {
      onCommand(category, originalCommand);
    }
  };

  // Enhanced processVoiceCommand with custom commands
  const handleProcessCommand = (command) => {
    processVoiceCommand(command, handleVoiceCommand);
  };

  // Button press handler with audio feedback
  const handleButtonPress = () => {
    vibrate('buttonPress');
    speak("बटन दबाया गया");
    
    setTimeout(() => {
      toggleListening();
    }, 800);
  };

  // Repeat instructions handler
  const handleRepeat = () => {
    vibrate('buttonPress');
    repeatInstructions();
  };

  // Custom welcome handler
  const handleWelcome = () => {
    if (welcomeMessage) {
      speak(welcomeMessage);
    } else {
      playWelcome();
    }
  };

  // Get button styling based on state
  const getButtonStyle = () => {
    if (!isSupported) {
      return "bg-gray-400 cursor-not-allowed";
    }
    if (isListening) {
      return "bg-red-500 hover:bg-red-600 animate-pulse";
    }
    if (isSpeaking) {
      return "bg-blue-500 hover:bg-blue-600";
    }
    return "bg-green-500 hover:bg-green-600";
  };

  // Get button text based on state  
  const getButtonText = () => {
    if (!isSupported) return "आवाज़ समर्थित नहीं";
    if (isListening) return "सुन रहा हूं...";
    if (isSpeaking) return "बोल रहा हूं...";
    return "यहाँ दबाएं";
  };

  // Get button icon
  const getButtonIcon = () => {
    if (!isSupported) return <MicOff className="w-6 h-6" />;
    if (isListening) return <div className="w-6 h-6 bg-white rounded-full animate-pulse" />;
    if (isSpeaking) return <Volume2 className="w-6 h-6" />;
    return <Mic className="w-6 h-6" />;
  };

  const buttonSizes = {
    sm: "h-12 px-4 text-sm",
    md: "h-16 px-6 text-base", 
    lg: "h-20 px-8 text-lg",
    xl: "h-28 px-12 text-xl",
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="text-red-600 text-sm">
            ⚠️ आपका ब्राउज़र आवाज़ की सुविधा नहीं देता
          </div>
          <div className="text-red-500 text-xs mt-1">
            कृपया Chrome, Edge, या Safari का उपयोग करें
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`voice-button-container ${className}`}>
      {/* Main Voice Button */}
      <Button
        onClick={handleButtonPress}
        disabled={isSpeaking || !isSupported}
        className={`
          ${getButtonStyle()} 
          ${buttonSizes[size]}
          text-white font-bold rounded-2xl shadow-lg 
          transition-all duration-300 transform hover:scale-105
          disabled:hover:scale-100 disabled:opacity-50
          flex flex-col items-center justify-center space-y-2
          min-w-[200px]
        `}
      >
        {getButtonIcon()}
        <span className="font-bold">{getButtonText()}</span>
        {isListening && (
          <span className="text-sm opacity-90">अब बोलें</span>
        )}
      </Button>

      {/* Status Display */}
      {recognizedText && (
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-center text-gray-700 text-sm">
            {recognizedText}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center text-red-600 text-sm">
            ❌ समस्या: फिर कोशिश करें
          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex gap-3 mt-4 justify-center">
        {/* Repeat Button */}
        {showRepeatButton && (
          <Button
            onClick={handleRepeat}
            disabled={isSpeaking || isListening}
            variant="outline"
            className="h-12 px-4 border-green-300 text-green-700 hover:bg-green-50 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>दोबारा सुनें</span>
          </Button>
        )}

        {/* Custom Welcome Button */}
        {welcomeMessage && (
          <Button
            onClick={handleWelcome}
            disabled={isSpeaking || isListening}
            variant="outline" 
            className="h-12 px-4 border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center space-x-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>सहायता</span>
          </Button>
        )}
      </div>

      {/* Voice Instructions */}
      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="text-center">
          <h3 className="font-semibold text-green-800 mb-3">आप कह सकते हैं:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>🌤</span>
              <span className="text-green-700">"मौसम"</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💰</span>
              <span className="text-green-700">"कीमत"</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>❓</span>
              <span className="text-green-700">"मदद"</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🏠</span>
              <span className="text-green-700">"घर"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Status Bar */}
      <div className="mt-4 p-2 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className={`w-2 h-2 rounded-full ${
            isSpeaking ? 'bg-blue-500 animate-pulse' : 
            isListening ? 'bg-red-500 animate-pulse' : 
            'bg-green-500'
          }`} />
          <span>
            {isSpeaking ? '🔊 बोल रहा हूं...' : 
             isListening ? '👂 सुन रहा हूं...' : 
             '✅ तैयार हूं - बटन दबाएं'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoiceButton;