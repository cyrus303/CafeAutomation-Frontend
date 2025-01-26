import { useState } from 'react';
import UserForm from './components/UserForm';
import QRCode from './components/QRCode';
import './App.css';

function App() {
  const [showOffer, setShowOffer] = useState(true);

  const handleCouponDisplay = () => {
    setShowOffer(false);
  };

  return (
    <div className="min-h-screen bg-cafe-pattern bg-cover bg-fixed bg-center bg-opacity-50 relative">
      <div className="absolute inset-0 bg-cafe-50/90"></div>
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cafe-900 mb-4">Welcome to Café Delight</h1>
          {showOffer && (
            <p className="text-xl text-cafe-700">Get a Free Coffee When You Join Our Community!</p>
          )}
        </header>

        {/* Main Content */}
        <main className={showOffer ? "grid md:grid-cols-2 gap-8" : "max-w-md mx-auto"}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            {showOffer && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-cafe-800 mb-4">Special Offer</h2>
                <p className="text-gray-600">
                  Join our coffee-loving community today and receive a complimentary
                  signature drink of your choice! Plus, get exclusive access to:
                </p>
                <ul className="list-disc list-inside mt-4 text-gray-600">
                  <li>Weekly special promotions</li>
                  <li>Early access to seasonal drinks</li>
                  <li>Birthday rewards</li>
                  <li>Member-only events</li>
                </ul>
              </div>
            )}
            <UserForm onCouponDisplay={handleCouponDisplay} />
          </div>

          {showOffer && (
            <div className="space-y-8">
              <QRCode />
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-cafe-800 mb-4">Privacy Notice</h3>
                <p className="text-sm text-gray-600">
                  We value your privacy. Your information will be used only for sending promotional
                  offers and updates about our café. You can unsubscribe at any time.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <a href="#" className="underline hover:text-cafe-700">Privacy Policy</a>
                  {' • '}
                  <a href="#" className="underline hover:text-cafe-700">Terms & Conditions</a>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>© 2024 Café Delight. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;