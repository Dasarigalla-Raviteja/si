import React from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceButton from './VoiceButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example of how to integrate voice support into any page
const VoiceIntegrationExample = () => {
  const navigate = useNavigate();

  // Handle voice commands with custom navigation
  const handleVoiceCommand = (category, originalCommand) => {
    console.log(`Voice command received: ${category} - "${originalCommand}"`);
    
    switch (category) {
      case 'weather':
        // Navigate to weather page
        navigate('/weather');
        break;
        
      case 'prices':
        // Navigate to marketplace/shop
        navigate('/shop');
        break;
        
      case 'help':
        // Navigate to help or advisory
        navigate('/advisory');
        break;
        
      case 'home':
        // Navigate to home page
        navigate('/home');
        break;
        
      case 'diagnosis':
        // Navigate to plant diagnosis
        navigate('/diagnose');
        break;
        
      case 'shop':
        // Navigate to shop
        navigate('/shop');
        break;
        
      default:
        console.log('Command not handled:', category);
    }
  };

  // Custom welcome message for this page
  const customWelcome = "नमस्ते! यह आवाज़ सहायता का उदाहरण है। आप मौसम, कीमत, या मदद कह सकते हैं।";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">
              🎙️ आवाज़ सहायता उदाहरण
            </CardTitle>
            <p className="text-green-600 text-sm">
              Voice Support Integration Example
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* Voice Button Integration */}
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-6">
            <VoiceButton
              onCommand={handleVoiceCommand}
              welcomeMessage={customWelcome}
              autoWelcome={true}
              size="xl"
              showRepeatButton={true}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Integration Instructions */}
      <div className="max-w-md mx-auto mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              🔧 Integration Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-700 space-y-3">
            <div>
              <strong>1. Import the component:</strong>
              <pre className="bg-white p-2 rounded text-xs mt-1 overflow-x-auto">
{`import VoiceButton from '@/components/VoiceButton';`}
              </pre>
            </div>
            
            <div>
              <strong>2. Add to any page:</strong>
              <pre className="bg-white p-2 rounded text-xs mt-1 overflow-x-auto">
{`<VoiceButton 
  onCommand={handleCommand}
  autoWelcome={true}
  size="lg"
/>`}
              </pre>
            </div>
            
            <div>
              <strong>3. Handle commands:</strong>
              <pre className="bg-white p-2 rounded text-xs mt-1 overflow-x-auto">
{`const handleCommand = (category) => {
  if (category === 'weather') {
    navigate('/weather');
  }
};`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Command Reference */}
      <div className="max-w-md mx-auto mt-6">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800">
              📝 Supported Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <strong className="text-amber-700">Hindi:</strong>
                <ul className="text-amber-600 space-y-1 mt-1">
                  <li>• "मौसम" → weather</li>
                  <li>• "कीमत" → prices</li>
                  <li>• "मदद" → help</li>
                  <li>• "घर" → home</li>
                  <li>• "पौधा" → diagnosis</li>
                  <li>• "दुकान" → shop</li>
                </ul>
              </div>
              <div>
                <strong className="text-amber-700">English:</strong>
                <ul className="text-amber-600 space-y-1 mt-1">
                  <li>• "weather" → weather</li>
                  <li>• "price" → prices</li>
                  <li>• "help" → help</li>
                  <li>• "home" → home</li>
                  <li>• "diagnosis" → diagnosis</li>
                  <li>• "shop" → shop</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Browser Compatibility */}
      <div className="max-w-md mx-auto mt-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">
              🌐 Browser Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700">
            <ul className="space-y-1">
              <li>✅ Chrome (Desktop & Mobile)</li>
              <li>✅ Edge (Desktop & Mobile)</li>
              <li>✅ Safari (iOS 14.3+)</li>
              <li>✅ Firefox (with permissions)</li>
              <li>✅ Capacitor Mobile Apps</li>
            </ul>
            <p className="mt-3 text-xs text-green-600">
              Works best on HTTPS websites and mobile apps
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceIntegrationExample;