import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import QRCode from 'react-qr-code';
import {
  Youtube,
  Send,
  ExternalLink,
  Share2,
  Globe,
  Copy,
  Loader2,
  CheckCircle,
  X,
  Lock,
  ArrowRight, // Using for button instead of DollarSign
} from 'lucide-react';

// --- Constants ---
const PROFILE_IMAGE_URL = "/logo-algofxsignals.jpeg"; // Local path
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
  // styleClasses prop is removed - styling handled in LinkItem component now
}

// --- Link Data (Using URLs from your previously pasted code) ---
const linksData: LinkInfo[] = [
  {
    title: 'Join VIP Signals Community',
    url: 'https://t.me/+0NrXsmvievJiNmJk',
    icon: <Send className="w-5 h-5" />,
  },
  {
    title: 'Get AutoPips Signal Copier',
    url: 'https://copier.algofxsignals.com/',
    icon: <Copy className="w-5 h-5" />,
  },
  {
    title: 'Watch Trading Strategy Videos',
    // NOTE: Still recommend checking if this googleusercontent URL is correct.
    url: 'https://www.youtube.com/@AIEAMastery',
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: 'Visit Main Website',
    url: 'https://algofxsignals.com',
    icon: <Globe className="w-5 h-5" />,
  },
];

// --- Sub-Components ---

const ProfileHeader: React.FC<{ onShareClick: () => void }> = ({ onShareClick }) => (
  <div className="flex flex-col items-center text-center px-4 group"> {/* Added group for hover effect */}
    <div className="relative mb-4">
      <img
        src={PROFILE_IMAGE_URL}
        alt="AlgoFX Signals Logo"
        className="w-28 h-28 rounded-full mx-auto ring-4 ring-blue-500/70 shadow-lg transition-transform duration-300 group-hover:scale-105" // Scale on hover
      />
      <button
        onClick={onShareClick}
        aria-label="Share profile"
        className="absolute -bottom-1 -right-1 bg-slate-700 p-2.5 rounded-full text-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-950" // Adjusted offset color
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
    <h1 className="text-3xl font-bold text-neutral-100 mb-1 tracking-tight">{USERNAME}</h1>
    <p className="text-neutral-300 text-base max-w-xs mx-auto">{BIO}</p>
  </div>
);

// Redesigned Link Button Component
const LinkItem: React.FC<{ link: LinkInfo }> = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/50 p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black shadow-md hover:shadow-lg"
  >
    <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">{link.icon}</span>
    <span className="flex-1 text-neutral-200 font-medium group-hover:text-white transition-colors duration-300 text-center">{link.title}</span>
    <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300" />
  </a>
);

// Redesigned Subscription Form
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
    // Styling with subtle background, border, more padding
    <div className="bg-slate-800/40 border border-slate-700/40 p-6 sm:p-8 rounded-xl shadow-lg text-center mx-2 relative overflow-hidden">
      {/* Optional subtle background accent */}
      {/* <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div> */}

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Get Your FREE Gold Trading EA</h2>
      <p className="text-neutral-300 mb-6 text-base leading-relaxed">Enter your email for instant access to the download link & start automating your gold trades today!</p>

      {subscribed ? (
        <div className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg text-center shadow flex items-center justify-center gap-2" role="alert">
           <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Success! Check your inbox (and spam!) for your EA download link.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your best email"
            // Updated Input Style
            className="w-full bg-slate-700/50 border border-slate-600 text-neutral-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-slate-400 text-center text-base transition duration-300"
            required
            disabled={isLoading}
            aria-label="Email for free EA"
          />
          <button
            type="submit"
            // Using Gold/Amber Accent Color
            className={`w-full font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-base border border-amber-600 shadow-md transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 focus:ring-offset-slate-800 ${
              isLoading
                ? 'bg-amber-300/50 text-amber-200/70 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-300 text-black'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Get Instant Access <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </> // Added Arrow icon
            )}
          </button>
          {error && (
             <p className="text-red-400 bg-red-900/30 border border-red-700 px-3 py-2 rounded-md text-sm mt-2">{error}</p> // Enhanced error style
          )}
        </form>
      )}
      <p className="text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
        <Lock size={12} /> Your email is safe. Unsubscribe anytime.
      </p>
    </div>
  );
};

// Using the previously refined dark QR Code Modal
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
      // New background gradient
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-neutral-200 py-12 sm:py-20 font-sans">
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

        <div className="max-w-lg mx-auto space-y-10 px-4"> {/* Slightly wider max-width, added padding */}
          <ProfileHeader onShareClick={() => setShowQR(true)} />
          <SubscriptionFormEnhanced />

          {/* Links Section with consistent styling */}
          <div className="space-y-4 pt-4"> {/* Added top padding */}
             <h3 className="text-center text-neutral-400 text-sm font-medium uppercase tracking-wider pb-2">Connect & Learn More</h3> {/* Updated heading */}
            {linksData.map((link, index) => (
              <LinkItem key={index} link={link} /> // Using redesigned LinkItem
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
// Remember dependencies: react-helmet-async, react-qr-code, lucide-react