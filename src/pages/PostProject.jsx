import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  X, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const PostProject = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    targetIndustries: [],
    skills: [],
    budgetType: 'fixed', // 'fixed' or 'hourly'
    budgetMin: '',
    budgetMax: '',
    timeline: '',
    experienceLevel: '',
    projectType: 'one-time', // 'one-time' or 'ongoing'
    attachments: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [targetIndustryInput, setTargetIndustryInput] = useState('');

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

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' }
  ];

  const timelines = [
    { value: '1-week', label: 'Less than 1 week' },
    { value: '1-month', label: '1 to 4 weeks' },
    { value: '3-months', label: '1 to 3 months' },
    { value: '6-months', label: '3 to 6 months' },
    { value: 'ongoing', label: 'More than 6 months' }
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

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addTargetIndustry = () => {
    if (targetIndustryInput && !formData.targetIndustries.includes(targetIndustryInput)) {
      setFormData({
        ...formData,
        targetIndustries: [...formData.targetIndustries, targetIndustryInput]
      });
      setTargetIndustryInput('');
    }
  };

  const removeTargetIndustry = (industryToRemove) => {
    setFormData({
      ...formData,
      targetIndustries: formData.targetIndustries.filter(industry => industry !== industryToRemove)
    });
  };

  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.industry) {
      setError('Please fill in all required fields.');
      return false;
    }
    
    if (formData.targetIndustries.length === 0) {
      setError('Please select at least one target industry for collaboration.');
      return false;
    }
    
    if (!formData.budgetMin || !formData.budgetMax) {
      setError('Please specify your budget range.');
      return false;
    }
    
    if (parseInt(formData.budgetMin) >= parseInt(formData.budgetMax)) {
      setError('Maximum budget must be greater than minimum budget.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        clientId: currentUser.uid,
        clientName: userProfile.fullName,
        clientCompany: userProfile.companyName,
        clientIndustry: userProfile.industry,
        status: 'active',
        proposals: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        budgetMin: parseInt(formData.budgetMin),
        budgetMax: parseInt(formData.budgetMax)
      };

      await addDoc(collection(db, 'projects'), projectData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting project:', error);
      setError('Failed to post project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <Card className="border-2 border-green-200">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-primary mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Project Posted Successfully!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your project has been published and experts from relevant industries will start submitting proposals soon.
              </p>
              <Button asChild className="covalent-gradient text-white hover:opacity-90">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Post a New Project
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with experts from other industries to drive your business forward.
          </p>
        </div>

        <Card className="hover-lift border-2 border-transparent hover:border-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="text-secondary" size={24} />
              <span>Project Details</span>
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your project to attract the right collaborators.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-6 border-destructive/50 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., AI Integration for Pharmaceutical Research"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, goals, and what kind of expertise you're looking for..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Your Industry *
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

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Project Type *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('projectType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time Project</SelectItem>
                        <SelectItem value="ongoing">Ongoing Collaboration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Target Industries */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Collaboration Requirements</h3>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Target Industries for Collaboration *
                  </Label>
                  <div className="flex space-x-2">
                    <Select onValueChange={setTargetIndustryInput}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select industries you want to collaborate with" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.filter(industry => industry !== formData.industry).map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addTargetIndustry} size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  {formData.targetIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.targetIndustries.map((industry, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{industry}</span>
                          <button
                            type="button"
                            onClick={() => removeTargetIndustry(industry)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skillInput" className="text-sm font-medium">
                    Required Skills & Expertise
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="skillInput"
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g., Machine Learning, Regulatory Compliance, Data Analysis"
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Experience Level Required
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('experienceLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select required experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Budget and Timeline */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Budget & Timeline</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Budget Type
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('budgetType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgetMin" className="text-sm font-medium">
                        Minimum Budget * ($)
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          id="budgetMin"
                          name="budgetMin"
                          type="number"
                          required
                          value={formData.budgetMin}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="5000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetMax" className="text-sm font-medium">
                        Maximum Budget * ($)
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          id="budgetMax"
                          name="budgetMax"
                          type="number"
                          required
                          value={formData.budgetMax}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="10000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Project Timeline
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expected timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="covalent-gradient text-white hover:opacity-90 px-8"
                  disabled={loading}
                >
                  {loading ? 'Posting Project...' : 'Post Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostProject;

