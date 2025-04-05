import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import QRCode from 'react-qr-code';
import {
  Youtube,
  Send,
  ExternalLink,
  Share2,
  // DollarSign, // Not used in button text
  Globe,
  Copy,
  Loader2,
  CheckCircle,
  X,
  Lock,
} from 'lucide-react';

// --- Constants ---
const PROFILE_IMAGE_URL = "/logo-algofxsignals.jpeg"; // Using local path
const USERNAME = "@AlgoFXSignals";
const BIO = "Automated Trading Solutions That Actually Work";
const PAGE_TITLE = "AlgoFX Signals - Free Gold EA & VIP Community";
const META_DESCRIPTION = "Get your FREE automated Gold Trading EA Robot from AlgoFX Signals and join our exclusive VIP community for trading signals.";

// IMPORTANT: Ensure VITE_API_URL is set in your .env file
const API_URL = import.meta.env.VITE_API_URL;

interface LinkInfo {
  title: string;
  url: string;
  icon: React.ReactNode;
  styleClasses: string; // Using original styling approach from pasted code
}

// --- Link Data (Using URLs from your pasted code) ---
const linksData: LinkInfo[] = [
  {
    title: 'Join VIP Signals Community', // Prioritized visually maybe
    url: 'https://t.me/+0NrXsmvievJiNmJk', // From your code
    icon: <Send className="w-5 h-5" />,
    styleClasses: 'bg-sky-500 hover:bg-sky-600',
  },
  {
    title: 'Get AutoPips Signal Copier',
    url: 'https://copier.algofxsignals.com/', // From your code
    icon: <Copy className="w-5 h-5" />,
    styleClasses: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: 'Watch Trading Strategy Videos',
    // NOTE: This URL looks potentially incorrect (googleusercontent proxy?), please double-check it.
    url: 'https://www.youtube.com/@AIEAMastery', // From your code
    icon: <Youtube className="w-5 h-5" />,
    styleClasses: 'bg-red-500 hover:bg-red-600',
  },
  {
    title: 'Visit Main Website',
    url: 'https://algofxsignals.com', // From your code
    icon: <Globe className="w-5 h-5" />,
    styleClasses: 'bg-blue-500 hover:bg-blue-600',
  },
];

// --- Sub-Components (Same as previous 'boosted' response) ---

const ProfileHeader: React.FC<{ onShareClick: () => void }> = ({ onShareClick }) => (
  <div className="text-center px-4">
    <div className="relative inline-block mb-3">
      <img
        src={PROFILE_IMAGE_URL}
        alt="AlgoFX Signals Logo"
        className="w-24 h-24 rounded-full mx-auto ring-4 ring-blue-500/60 shadow-lg"
      />
      <button
        onClick={onShareClick}
        aria-label="Share profile"
        className="absolute -bottom-1 -right-1 bg-gray-700 p-2 rounded-full text-white hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
    <h1 className="text-2xl font-bold text-neutral-100 mb-1">{USERNAME}</h1>
    <p className="text-neutral-300 text-base">{BIO}</p>
  </div>
);

const LinkButton: React.FC<{ link: LinkInfo }> = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-3 p-4 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg text-white font-medium ${link.styleClasses}`}
  >
    {link.icon}
    <span className="flex-1 text-center">{link.title}</span>
    <ExternalLink className="w-4 h-4 opacity-60" />
  </a>
);

const SubscriptionFormEnhanced: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API_URL) {
      setError("Configuration error: API endpoint is missing.");
      console.error("VITE_API_URL is not defined.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/proxy/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Subscription error:', response.status, errorData);
        setError(`Subscription failed (Status ${response.status}). Please try again or contact support.`);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError("Network error. Please check connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500 p-6 rounded-xl shadow-xl text-center mx-2">
      <h2 className="text-2xl font-bold text-white mb-2">Unlock Your FREE Gold Trading EA</h2>
      <p className="text-blue-100 mb-5 text-base">Enter your email below for instant access to the download link & start automating your trades!</p>

      {subscribed ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative text-center shadow" role="alert">
           <CheckCircle className="inline w-5 h-5 mr-2 align-text-bottom" />
          <span className="block sm:inline font-medium">Success! Check your inbox (and spam folder!) for your EA download link.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your best email address"
            className="w-full bg-white/90 border border-gray-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-center text-lg"
            required
            disabled={isLoading}
            aria-label="Email for free EA"
          />
          <button
            type="submit"
            className={`w-full font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-lg border border-yellow-600 shadow-md transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-blue-700 ${
              isLoading
                ? 'bg-yellow-300 text-yellow-700 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-300 text-black'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              'Send My Free EA Now!'
            )}
          </button>
          {error && (
             <p className="text-red-200 bg-red-900/50 px-3 py-2 rounded-md text-sm mt-2">{error}</p>
          )}
        </form>
      )}
      <p className="text-blue-200 text-xs mt-4 flex items-center justify-center gap-1">
        <Lock size={12} /> We respect your privacy. No spam.
      </p>
    </div>
  );
};

const QRCodeModal: React.FC<{ isOpen: boolean; onClose: () => void; url: string }> = ({ isOpen, onClose, url }) => {
   if (!isOpen) return null;
   return (
     <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={onClose}>
       <div className="bg-slate-800 p-6 rounded-xl max-w-xs w-full shadow-2xl border border-slate-700" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end mb-2"> <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button> </div>
         <div className="bg-white p-4 rounded-lg flex justify-center mb-4"> <QRCode value={url} size={180} fgColor="#000000" bgColor="#FFFFFF" /> </div>
         <p className="text-neutral-300 text-center text-sm mb-4">Scan code to share this page</p>
         <button onClick={onClose} className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800"> Close </button>
       </div>
     </div>
   );
 };


// --- Main App Component ---
function App() {
  const [showQR, setShowQR] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
    if (!API_URL) console.warn("VITE_API_URL not set.");
  }, []);

  return (
    // Use HelmetProvider at your app root
    // <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-10 sm:py-16 font-sans">
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={META_DESCRIPTION} />
          <meta property="og:title" content={PAGE_TITLE} />
          <meta property="og:description" content={META_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={PROFILE_IMAGE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={PAGE_TITLE} />
          <meta name="twitter:description" content={META_DESCRIPTION} />
          <meta name="twitter:image" content={PROFILE_IMAGE_URL} />
        </Helmet>

        <div className="max-w-md mx-auto space-y-8">
          <ProfileHeader onShareClick={() => setShowQR(true)} />
          <SubscriptionFormEnhanced />
          <div className="space-y-4 px-2 sm:px-0">
             <h3 className="text-center text-neutral-400 text-sm font-medium uppercase tracking-wider pt-2">More Resources</h3>
            {linksData.map((link, index) => (
              <LinkButton key={index} link={link} />
            ))}
          </div>
        </div>
        <QRCodeModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          url={pageUrl}
        />
      </div>
    // </HelmetProvider>
  );
}

export default App;
// Remember to wrap your app entry point with <HelmetProvider>
// Ensure TailwindCSS is configured, and run `npm install react-helmet-async react-qr-code lucide-react`