import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, Mail, Lock, User, Building, AlertCircle, Users, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: '',
    companyName: '',
    industry: '',
    skills: '',
    bio: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const industries = [
    'Pharmaceutical & Biotech',
    'Technology & Software',
    'Manufacturing & Engineering',
    'Finance & Consulting',
    'Healthcare & Medical',
    'Legal & Compliance',
    'Marketing & Creative',
    'Research & Development'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
      setError('Please fill in all required fields.');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.userType || !formData.industry) {
      setError('Please complete your profile information.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) return;
    
    setLoading(true);

    try {
      const userData = {
        fullName: formData.fullName,
        userType: formData.userType,
        companyName: formData.companyName,
        industry: formData.industry,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        bio: formData.bio
      };
      
      await signup(formData.email, formData.password, userData);
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Failed to create account. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-md">
        <Card className="hover-lift border-2 border-transparent hover:border-secondary/30">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full covalent-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <CardTitle className="text-3xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
              Join Covalent
            </CardTitle>
            <CardDescription className="text-lg">
              {step === 1 ? 'Create your account' : 'Complete your profile'}
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-secondary' : 'bg-muted'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-secondary' : 'bg-muted'}`}></div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-6 border-destructive/50 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 1 ? (
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full covalent-gradient text-white hover:opacity-90 py-3"
                >
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    I am a *
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectChange('userType', 'client')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.userType === 'client' 
                          ? 'border-secondary bg-secondary/10' 
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <Briefcase className="mx-auto mb-2 text-secondary" size={24} />
                      <div className="font-medium">Client</div>
                      <div className="text-xs text-muted-foreground">Looking for expertise</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectChange('userType', 'service_provider')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.userType === 'service_provider' 
                          ? 'border-secondary bg-secondary/10' 
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <Users className="mx-auto mb-2 text-secondary" size={24} />
                      <div className="font-medium">Service Provider</div>
                      <div className="text-xs text-muted-foreground">Offering expertise</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Industry *
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.userType === 'service_provider' && (
                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-sm font-medium">
                      Skills & Expertise
                    </Label>
                    <Input
                      id="skills"
                      name="skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., Software Development, Data Analysis, Marketing Strategy"
                    />
                    <p className="text-xs text-muted-foreground">Separate skills with commas</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself and your company..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 covalent-gradient text-white hover:opacity-90 py-3"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-secondary hover:text-secondary/80 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-secondary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-secondary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;

