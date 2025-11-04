import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signUpWithEmail } from "../../lib/firebase";
import api from "../../lib/api";

export default function Signup() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [authMethod, setAuthMethod] = useState('google'); // 'google' or 'email'
  const [emailData, setEmailData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleGoogleSignUp = async () => {
    if (isSigningUp) return;
    
    setIsSigningUp(true);
    try {
      console.log("🚀 Starting signup with Google...");
      const result = await signInWithGoogle();
      
      console.log("✅ Google signup successful:", result);
      
      // Call backend findOrCreate
      const firstName = result.name?.split(' ')[0] || '';
      const lastName = result.name?.split(' ').slice(1).join(' ') || '';
      
      const res = await api.post("/adminUserAuth/findOrCreate", {
        firebaseId: result.uid,
        email: result.email,
        firstName,
        lastName,
        photoURL: result.photoURL
      });
      
      const admin = res.data;
      console.log("✅ Admin:", admin.id);
      
      // Store auth data
      localStorage.setItem("firebaseId", result.uid);
      localStorage.setItem("adminId", admin.id);
      localStorage.setItem("email", admin.email || result.email);
      
      // NEW USER → Profile setup FIRST!
      console.log("✅ New user → Profile setup");
      navigate("/profilesetup");
      
    } catch (error) {
      console.error("❌ Google signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    
    if (emailData.password !== emailData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsSigningUp(true);
    try {
      console.log("🚀 Starting signup with email...");
      const displayName = `${emailData.firstName} ${emailData.lastName}`.trim();
      const result = await signUpWithEmail(emailData.email, emailData.password, displayName);
      
      console.log("✅ Email signup successful:", result);
      
      // Call backend findOrCreate
      const res = await api.post("/adminUserAuth/findOrCreate", {
        firebaseId: result.uid,
        email: result.email,
        firstName: emailData.firstName,
        lastName: emailData.lastName,
        photoURL: result.photoURL
      });
      
      const admin = res.data;
      console.log("✅ Admin:", admin.id);
      
      // Store auth data
      localStorage.setItem("firebaseId", result.uid);
      localStorage.setItem("adminId", admin.id);
      localStorage.setItem("email", admin.email || result.email);
      
      // NEW USER → Profile setup FIRST!
      console.log("✅ New user → Profile setup");
      navigate("/profilesetup");
      
    } catch (error) {
      console.error("❌ Email signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
        
        {/* Logo */}
        <div className="space-y-4">
          <img src="/logo.png" alt="Ignite Strategies" className="h-20 mx-auto" />
          
          <h1 className="text-3xl font-bold text-white">
            Welcome to Ignite!
          </h1>
          <p className="text-white/80 text-lg">
            How would you like to get started?
          </p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-white/10 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMethod('google')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              authMethod === 'google' 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Google
          </button>
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              authMethod === 'email' 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Email
          </button>
        </div>

        {/* Google Sign Up */}
        {authMethod === 'google' && (
          <button
            onClick={handleGoogleSignUp}
            disabled={isSigningUp}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🚀</span>
            <div className="text-left flex-1">
              <div className="font-bold">Set Up Your Organization</div>
              <div className="text-xs text-white/80">I'm starting fresh - create new org</div>
            </div>
          </button>
        )}

        {/* Email Sign Up Form */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={emailData.firstName}
                onChange={(e) => setEmailData({...emailData, firstName: e.target.value})}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={emailData.lastName}
                onChange={(e) => setEmailData({...emailData, lastName: e.target.value})}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={emailData.email}
              onChange={(e) => setEmailData({...emailData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={emailData.password}
              onChange={(e) => setEmailData({...emailData, password: e.target.value})}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={emailData.confirmPassword}
              onChange={(e) => setEmailData({...emailData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50"
            >
              {isSigningUp ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>
        )}

        {/* Already have account */}
        <p className="text-white/80 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-red-400 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>

        {/* Back to Home */}
        <div className="pt-4 border-t border-white/20">
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
