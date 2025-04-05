import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import {
  Instagram,
  Youtube,
  Twitter,
  Send,
  Mail,
  ExternalLink,
  Share2,
  DollarSign,
  Globe,
  Copy
} from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add metadata to the document head
  useEffect(() => {
    document.title = 'AlgoFX Signals - Automated Trading Solutions';
    
    // Create meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Automated Trading Solutions That Actually Work - Get free Gold Trading EA and join our VIP Signals Community';
    document.head.appendChild(metaDescription);

    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    metaOgTitle.content = 'AlgoFX Signals';
    document.head.appendChild(metaOgTitle);

    const metaOgDescription = document.createElement('meta');
    metaOgDescription.setAttribute('property', 'og:description');
    metaOgDescription.content = 'Automated Trading Solutions That Actually Work';
    document.head.appendChild(metaOgDescription);

    const metaOgType = document.createElement('meta');
    metaOgType.setAttribute('property', 'og:type');
    metaOgType.content = 'website';
    document.head.appendChild(metaOgType);

    const metaTwitterCard = document.createElement('meta');
    metaTwitterCard.name = 'twitter:card';
    metaTwitterCard.content = 'summary_large_image';
    document.head.appendChild(metaTwitterCard);

    // Cleanup function to remove tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(metaOgTitle);
      document.head.removeChild(metaOgDescription);
      document.head.removeChild(metaOgType);
      document.head.removeChild(metaTwitterCard);
    };
  }, []);

  // Get API URL from environment variables or use the direct Render URL as fallback
  const API_URL = import.meta.env.VITE_API_URL || 'https://algofxsignals-api.onrender.com';

  // Updated to use Render.com backend
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Sending request to proxy server...');
      
      const response = await fetch(`${API_URL}/api/proxy/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', response.status, errorData);
        alert(`Something went wrong. Server responded with ${response.status}`);
      }
    } catch (err) {
      console.error('Connection error:', err);
      alert("Error sending request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const links = [
    {
      title: 'Watch Trading Strategy Videos',
      url: 'https://www.youtube.com/@AIEAMastery',
      icon: <Youtube className="w-5 h-5" />,
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    },
    {
      title: 'Join VIP Signals Community',
      url: 'https://t.me/+0NrXsmvievJiNmJk',
      icon: <Send className="w-5 h-5" />,
      bgColor: 'bg-sky-500',
      hoverColor: 'hover:bg-sky-600',
    },
    {
      title: 'Get AutoPips Signal Copier',
      url: 'https://copier.algofxsignals.com/view/SLeB3RyCrD432RNu',
      icon: <Copy className="w-5 h-5" />,
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      title: 'Visit Main Website',
      url: 'https://algofxsignals.com',
      icon: <Globe className="w-5 h-5" />,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Profile Section */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/578bef02b59603dc1d8da018a394d883~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=3f11c1bb&x-expires=1743678000&x-signature=Vjdnd%2F3k032GlZ%2BAOm7Wv1vP5hY%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-blue-500/50"
            />
            <button 
              onClick={() => setShowQR(!showQR)}
              className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-2">@AlgoFXSignals</h1>
          <p className="text-gray-300 mb-4">Automated Trading Solutions That Actually Work</p>
          
          {/* QR Code Modal */}
          {showQR && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-xl max-w-sm w-full">
                <div className="flex justify-center mb-4">
                  <QRCode 
                    value={window.location.href}
                    size={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-800 text-center mb-4">Scan to visit this page</p>
                <button
                  onClick={() => setShowQR(false)}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 ${link.bgColor} ${link.hoverColor} p-4 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg`}
            >
              {link.icon}
              <span className="flex-1">{link.title}</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
          ))}
        </div>

        {/* Email Subscription for Gold EA */}
        <div className="bg-gray-800/50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Get Your Free Gold Trading EA</h2>
          <p className="text-gray-300 mb-4">Enter your email to receive the download link for our automated Gold trading robot!</p>
          {subscribed ? (
            <div className="text-green-400 text-center py-2">
              Success! Check your email for the download link 🚀
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`${isLoading ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-600'} px-4 py-2 rounded-lg transition-colors flex items-center justify-center`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <DollarSign className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;