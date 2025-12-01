import React, { useState, useRef, useEffect } from 'react';
import { Phone, Bell, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Translation } from '../types';

interface AuthProps {
  onComplete: () => void;
  onLanguageSelect?: (lang: string) => void;
  t: Translation;
}

type AuthStep = 'PHONE' | 'OTP' | 'PERMISSIONS_NOTIF' | 'PERMISSIONS_LOC';

const Auth: React.FC<AuthProps> = ({ onComplete, t }) => {
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock verification code
  const MOCK_OTP = "123456";

  // Refs for OTP inputs to manage focus
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset refs when step changes
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, [step]);

  const handlePhoneSubmit = () => {
    if (phone.length < 10) {
        setError("Please enter a valid 10-digit number");
        return;
    }
    setError(null);
    setLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
      // In a real app, this would be handled by the backend SMS gateway.
      // For this demo, we alert the code to the user.
      alert(`Station Easy Verification Code: ${MOCK_OTP}`);
    }, 1500);
  };

  const handleOtpVerify = () => {
    const enteredOtp = otp.join('');
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (enteredOtp === MOCK_OTP) {
          setLoading(false);
          setStep('PERMISSIONS_NOTIF');
      } else {
          setLoading(false);
          setError("Incorrect OTP. Please try again.");
          // Shake effect logic could go here
      }
    }, 1000);
  };

  const handlePermission = (nextStep: AuthStep | 'DONE') => {
    if (nextStep === 'DONE') {
      onComplete();
    } else {
      setStep(nextStep);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null); // Clear error on typing

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (step === 'PHONE') {
    return (
      <div className="h-screen bg-white p-6 flex flex-col max-w-md mx-auto relative">
         {/* Background Decoration */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-100 rounded-b-[30%]" />
         </div>

        <div className="mt-12 z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-6">
             {/* Train Logo */}
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M4 11V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                <rect width="16" height="8" x="4" y="11" rx="2" />
                <path d="M4 11h16" />
                <path d="M12 3V2" />
                <path d="M8 15h.01" />
                <path d="M16 15h.01" />
                <path d="M6 19v2" />
                <path d="M18 19v2" />
             </svg>
          </div>
          <div className="w-full text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.secureLogin}</h2>
              <p className="text-center text-gray-500 mb-8">{t.enterMobileDesc}</p>

              <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 text-left">
                <div className={`flex items-center bg-gray-50 border ${error ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100'} rounded-xl p-3 mb-2 transition-all`}>
                  <Phone size={20} className={`${error ? 'text-red-500' : 'text-blue-500'} mr-3`} />
                  <span className="text-gray-500 mr-2 border-r border-gray-300 pr-2">+91</span>
                  <input 
                    type="tel" 
                    placeholder="98765 43210" 
                    className="flex-1 outline-none text-lg bg-transparent text-gray-800 placeholder-gray-400 ml-2"
                    value={phone}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val) && val.length <= 10) {
                            setPhone(val);
                            setError(null);
                        }
                    }}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mb-6 pl-1 flex items-center gap-1"><AlertCircle size={12}/> {error}</p>}
                {!error && <div className="mb-8"></div>}

                <button 
                  onClick={handlePhoneSubmit}
                  disabled={phone.length < 10 || loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : t.sendOtp}
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'OTP') {
    return (
      <div className="h-screen bg-white p-6 flex flex-col items-center max-w-md mx-auto relative">
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
             <img src="https://picsum.photos/400/800?station" className="w-full h-full object-cover blur-sm" alt="Background" />
         </div>

         <div className="z-10 w-full mt-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-8">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M4 11V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                    <rect width="16" height="8" x="4" y="11" rx="2" />
                    <path d="M4 11h16" />
                    <path d="M12 3V2" />
                    <path d="M8 15h.01" />
                    <path d="M16 15h.01" />
                    <path d="M6 19v2" />
                    <path d="M18 19v2" />
                 </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.verifyOtp}</h2>
            
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 w-full">
                <p className="text-gray-500 mb-6">{t.enterCode}</p>
                <div className="flex justify-between gap-2 mb-2">
                    {otp.map((digit, idx) => (
                        <input 
                            key={idx}
                            ref={el => { inputRefs.current[idx] = el; }}
                            type="text" 
                            maxLength={1}
                            className={`w-10 h-12 bg-gray-50 border ${error ? 'border-red-300 focus:border-red-500 ring-red-200' : 'border-gray-200 focus:border-blue-600 focus:ring-blue-200'} rounded-lg text-center text-xl font-bold focus:bg-white outline-none transition-all focus:ring-2`}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        />
                    ))}
                </div>
                
                {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}
                {!error && <div className="mb-6"></div>}

                <div className="flex justify-between text-sm mb-6">
                    <span className="text-gray-500">{t.resendOtpIn}</span>
                    <span className="text-blue-600 font-semibold border border-blue-200 px-2 py-0.5 rounded">0:58</span>
                </div>

                <button 
                    onClick={handleOtpVerify}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 disabled:opacity-70"
                    disabled={otp.some(d => d === '') || loading}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : t.verifyAndProceed}
                </button>
            </div>
         </div>
      </div>
    );
  }

  // Permission Modals
  const isNotif = step === 'PERMISSIONS_NOTIF';
  return (
    <div className="h-screen bg-blue-600 p-6 flex flex-col items-center justify-center max-w-md mx-auto relative">
        <div className="bg-white z-10 w-full rounded-3xl p-6 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                {isNotif ? <Bell size={32} /> : <MapPin size={32} />}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isNotif ? t.enableNotif : t.enableLoc}
            </h3>
            
            <p className="text-gray-500 text-sm mb-6 px-4">
                {isNotif 
                    ? t.enableNotifDesc
                    : t.enableLocDesc
                }
            </p>

            <div className="flex gap-3">
                <button 
                    onClick={() => handlePermission(isNotif ? 'PERMISSIONS_LOC' : 'DONE')}
                    className="flex-1 py-3 text-blue-600 font-semibold text-sm border border-gray-200 rounded-lg hover:bg-blue-50"
                >
                    {t.notNow}
                </button>
                <button 
                    onClick={() => handlePermission(isNotif ? 'PERMISSIONS_LOC' : 'DONE')}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700"
                >
                    {t.allowAccess}
                </button>
            </div>
        </div>
    </div>
  );
};

export default Auth;