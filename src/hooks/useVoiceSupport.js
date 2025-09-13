import { useState, useEffect, useRef, useCallback } from 'react';

// Web-based voice support hook for low-literate users
export const useVoiceSupport = (options = {}) => {
  const {
    language = 'hi-IN',
    speechRate = 0.4, // Slow speech for better comprehension
    speechPitch = 0.9,
    autoRepeatDelay = 10000, // Auto-repeat instructions after 10 seconds
    maxAutoRepeats = 2,
    hapticFeedback = true,
  } = options;

  // State management
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);

  // Refs for cleanup and timers
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const autoRepeatTimer = useRef(null);
  const isInitialized = useRef(false);

  // Voice messages in Hindi for low-literate users
  const messages = {
    greeting: "नमस्ते! मैं आपका सहायक हूं। मैं आपकी आवाज़ सुनूंगा। बड़े हरे बटन को दबाकर बोलें।",
    mainMenu: "आप कह सकते हैं - मौसम, कीमत, या मदद। बोलने के लिए हरा बटन दबाएं।",
    weather: "मौसम की जानकारी दिखा रहा हूं।",
    prices: "बाज़ार की कीमतें दिखा रहा हूं।",
    help: "मैं आपकी मदद करूंगा। हरा बटन दबाएं और बोलें - मौसम, कीमत, या मदद।",
    listening: "सुन रहा हूं... बोलिए",
    notUnderstood: "मैं समझ नहीं पाया। फिर से बोलें। हरा बटन दबाएं।",
    error: "कोई समस्या है। फिर कोशिश करें। हरा बटन दबाएं।",
    buttonPress: "बटन दबाया गया",
    menuRepeat: "मैं फिर से बताता हूं",
    confirmation: "ठीक है, समझ गया",
    notSupported: "माफ़ करें, आपका ब्राउज़र आवाज़ की सुविधा नहीं देता।",
  };

  // Simple voice commands for low-literate users
  const simpleCommands = {
    weather: ['मौसम', 'weather', 'बारिश', 'धूप', 'ठंड', 'आसमान'],
    prices: ['कीमत', 'भाव', 'price', 'दाम', 'रेट', 'बाज़ार'],
    help: ['मदद', 'help', 'सहायता', 'बताओ', 'समझाओ'],
    repeat: ['फिर', 'दोबारा', 'repeat', 'again', 'वापस'],
    slow: ['धीरे', 'slow', 'आराम', 'धीमे'],
    home: ['घर', 'home', 'मुख्य', 'वापस'],
    diagnosis: ['पौधा', 'बीमारी', 'जांच', 'देखो', 'diagnosis'],
    shop: ['दुकान', 'खरीदना', 'shop', 'buy'],
  };

  // Vibration patterns for different feedback types
  const vibrationPatterns = {
    buttonPress: [50],
    recognition: [50, 50, 50],
    error: [200],
    success: [100, 50, 100],
  };

  // Initialize Web Speech APIs
  useEffect(() => {
    const initializeVoiceSupport = () => {
      try {
        // Check for Speech Recognition support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        // Check for Speech Synthesis support
        const speechSynthesis = window.speechSynthesis;
        
        if (SpeechRecognition && speechSynthesis) {
          setIsSupported(true);
          
          // Initialize Speech Recognition
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = language;
          
          // Setup recognition event handlers
          recognitionRef.current.onstart = () => {
            setIsListening(true);
            setError(null);
            vibrate('buttonPress');
            clearAutoRepeatTimer();
          };
          
          recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            setRecognizedText(`✅ "${event.results[0][0].transcript}"`);
            vibrate('recognition');
            
            // Process with confirmation
            setTimeout(() => {
              speak(messages.confirmation);
              setTimeout(() => {
                processVoiceCommand(transcript);
              }, 1500);
            }, 500);
          };
          
          recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            setError(event.error);
            vibrate('error');
            setTimeout(() => {
              speak(messages.error);
            }, 500);
          };
          
          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
          
          // Initialize Speech Synthesis
          synthRef.current = speechSynthesis;
          
          isInitialized.current = true;
        } else {
          setIsSupported(false);
          setError('Speech APIs not supported');
        }
      } catch (err) {
        console.error('Error initializing voice support:', err);
        setIsSupported(false);
        setError(err.message);
      }
    };

    if (!isInitialized.current) {
      initializeVoiceSupport();
    }

    return () => {
      cleanup();
    };
  }, [language]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    clearAutoRepeatTimer();
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  // Vibration helper
  const vibrate = useCallback((type) => {
    if (hapticFeedback && navigator.vibrate && vibrationPatterns[type]) {
      navigator.vibrate(vibrationPatterns[type]);
    }
  }, [hapticFeedback]);

  // Clear auto-repeat timer
  const clearAutoRepeatTimer = useCallback(() => {
    if (autoRepeatTimer.current) {
      clearTimeout(autoRepeatTimer.current);
      autoRepeatTimer.current = null;
    }
  }, []);

  // Text-to-speech function
  const speak = useCallback((text, options = {}) => {
    if (!synthRef.current || !isSupported) return;

    // Stop any current speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = options.rate || speechRate;
    utterance.pitch = options.pitch || speechPitch;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      clearAutoRepeatTimer();
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setRepeatCount(0);
      
      // Setup auto-repeat for instructions
      if (options.autoRepeat && repeatCount < maxAutoRepeats) {
        autoRepeatTimer.current = setTimeout(() => {
          speak(messages.mainMenu, { autoRepeat: true });
          setRepeatCount(prev => prev + 1);
        }, autoRepeatDelay);
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setError('Speech synthesis failed');
    };
    
    synthRef.current.speak(utterance);
  }, [language, speechRate, speechPitch, repeatCount, maxAutoRepeats, autoRepeatDelay, messages.mainMenu]);

  // Process voice commands
  const processVoiceCommand = useCallback((command, onCommandProcessed) => {
    let commandFound = false;

    // Check each command category
    for (const [category, keywords] of Object.entries(simpleCommands)) {
      if (keywords.some(keyword => command.includes(keyword))) {
        commandFound = true;
        
        // Call the callback if provided
        if (onCommandProcessed) {
          onCommandProcessed(category, command);
        }
        
        // Default handling
        handleDefaultCommand(category);
        break;
      }
    }

    if (!commandFound) {
      speak(`${messages.notUnderstood} ${messages.mainMenu}`);
    }
  }, [messages, speak]);

  // Default command handling
  const handleDefaultCommand = useCallback((command) => {
    switch (command) {
      case 'weather':
        speak(messages.weather);
        break;
      case 'prices':
        speak(messages.prices);
        break;
      case 'help':
        speak(`${messages.help} ${messages.mainMenu}`);
        break;
      case 'repeat':
        speak(`${messages.menuRepeat}. ${messages.mainMenu}`);
        break;
      case 'slow':
        speak(messages.mainMenu, { rate: 0.3 });
        break;
      default:
        speak(messages.mainMenu);
    }
  }, [messages, speak]);

  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || isListening || isSpeaking) return;

    try {
      setRecognizedText('');
      setError(null);
      recognitionRef.current.start();
      
      // Audio confirmation after a delay
      setTimeout(() => {
        if (isListening) {
          speak(messages.listening);
        }
      }, 1000);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError(err.message);
      speak(messages.error);
    }
  }, [isSupported, isListening, isSpeaking, speak, messages]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Welcome sequence
  const playWelcome = useCallback(() => {
    if (!isSupported) {
      speak(messages.notSupported);
      return;
    }
    
    setTimeout(() => {
      speak(messages.greeting);
      setTimeout(() => {
        speak(messages.mainMenu, { autoRepeat: true });
      }, 4000);
    }, 1000);
  }, [isSupported, speak, messages]);

  // Repeat instructions
  const repeatInstructions = useCallback(() => {
    vibrate('buttonPress');
    speak(messages.menuRepeat);
    setTimeout(() => {
      speak(messages.mainMenu, { autoRepeat: true });
    }, 1500);
  }, [speak, vibrate, messages]);

  return {
    // State
    isListening,
    isSpeaking,
    recognizedText,
    error,
    isSupported,
    
    // Actions
    startListening,
    stopListening,
    toggleListening,
    speak,
    playWelcome,
    repeatInstructions,
    processVoiceCommand,
    
    // Utilities
    vibrate,
    cleanup,
    
    // Data
    messages,
    simpleCommands,
  };
};