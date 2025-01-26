import { useState } from 'react';
import clsx from 'clsx';

interface VerificationFormProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
}

const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cafe-500 focus:border-transparent text-center text-2xl tracking-widest";

export default function VerificationForm({ phoneNumber, onVerificationComplete }: VerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call to verify code
    try {
      // In a real implementation, this would be an API call to verify the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit code is accepted
      if (verificationCode.length === 6) {
        onVerificationComplete();
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-cafe-800 mb-4">Verify Your Phone Number</h3>
      <p className="text-gray-600 mb-6">
        We've sent a verification code to {phoneNumber}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              if (value.length <= 6) {
                setVerificationCode(value);
              }
            }}
            className={clsx(inputClasses, error && 'border-red-500')}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || verificationCode.length !== 6}
          className={clsx(
            "w-full bg-cafe-700 text-white py-3 px-6 rounded-lg transition duration-200",
            isLoading || verificationCode.length !== 6 
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-cafe-800"
          )}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </div>
  );
}