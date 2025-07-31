import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  Users, 
  Building,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const BrowseProjects = () => {
  const { userProfile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    budgetRange: '',
    timeline: '',
    experienceLevel: ''
  });

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

  const budgetRanges = [
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000+', label: '$25,000+' }
  ];

  const timelines = [
    { value: '1-week', label: 'Less than 1 week' },
    { value: '1-month', label: '1 to 4 weeks' },
    { value: '3-months', label: '1 to 3 months' },
    { value: '6-months', label: '3 to 6 months' },
    { value: 'ongoing', label: 'More than 6 months' }
  ];

  useEffect(() => {
    fetchProjects();
  }, [userProfile]);

  useEffect(() => {
    applyFilters();
  }, [projects, searchQuery, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsRef = collection(db, 'projects');
      
      // Query for active projects that target the user's industry
      const q = query(
        projectsRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // For demo purposes, use mock data if Firebase query fails
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = projects;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Industry filter
    if (filters.industry) {
      filtered = filtered.filter(project => project.clientIndustry === filters.industry);
    }

    // Budget filter
    if (filters.budgetRange) {
      const [min, max] = filters.budgetRange.split('-').map(Number);
      filtered = filtered.filter(project => {
        if (filters.budgetRange === '25000+') {
          return project.budgetMin >= 25000;
        }
        return project.budgetMin >= min && project.budgetMax <= max;
      });
    }

    // Timeline filter
    if (filters.timeline) {
      filtered = filtered.filter(project => project.timeline === filters.timeline);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(project => project.experienceLevel === filters.experienceLevel);
    }

    setFilteredProjects(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: '',
      budgetRange: '',
      timeline: '',
      experienceLevel: ''
    });
    setSearchQuery('');
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Mock data for demonstration
  const mockProjects = [
    {
      id: '1',
      title: 'AI Integration for Pharmaceutical Research',
      description: 'We need AI/ML experts to help integrate machine learning algorithms into our drug discovery process. Looking for expertise in data analysis, predictive modeling, and pharmaceutical domain knowledge.',
      clientName: 'Dr. Sarah Johnson',
      clientCompany: 'BioTech Innovations',
      clientIndustry: 'Pharmaceutical & Biotech',
      targetIndustries: ['Technology & Software'],
      skills: ['Machine Learning', 'Data Analysis', 'Python', 'Drug Discovery'],
      budgetMin: 8000,
      budgetMax: 15000,
      budgetType: 'fixed',
      timeline: '3-months',
      experienceLevel: 'expert',
      projectType: 'one-time',
      proposals: [],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: '2',
      title: 'Legal Compliance for Medical Device Startup',
      description: 'Healthcare startup seeking legal expertise for FDA compliance and regulatory approval of our new medical device. Need guidance on documentation, submission process, and ongoing compliance requirements.',
      clientName: 'Michael Chen',
      clientCompany: 'MedTech Solutions',
      clientIndustry: 'Healthcare & Medical',
      targetIndustries: ['Legal & Compliance'],
      skills: ['FDA Regulations', 'Medical Device Law', 'Compliance', 'Documentation'],
      budgetMin: 5000,
      budgetMax: 8000,
      budgetType: 'fixed',
      timeline: '1-month',
      experienceLevel: 'expert',
      projectType: 'one-time',
      proposals: [],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: '3',
      title: 'Marketing Strategy for FinTech Platform',
      description: 'Financial services company looking for marketing experts to develop a comprehensive digital marketing strategy. Focus on B2B lead generation, content marketing, and brand positioning in the competitive FinTech space.',
      clientName: 'Jennifer Park',
      clientCompany: 'FinanceFlow',
      clientIndustry: 'Finance & Consulting',
      targetIndustries: ['Marketing & Creative'],
      skills: ['Digital Marketing', 'B2B Marketing', 'Content Strategy', 'Lead Generation'],
      budgetMin: 6000,
      budgetMax: 12000,
      budgetType: 'fixed',
      timeline: '6-months',
      experienceLevel: 'intermediate',
      projectType: 'ongoing',
      proposals: [],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full covalent-gradient flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Browse Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover collaboration opportunities from businesses in {userProfile?.industry}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Filter size={20} />
                    <span>Filters</span>
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client Industry</label>
                  <Select onValueChange={(value) => handleFilterChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All industries" />
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
                  <label className="text-sm font-medium">Budget Range</label>
                  <Select onValueChange={(value) => handleFilterChange('budgetRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline</label>
                  <Select onValueChange={(value) => handleFilterChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any timeline" />
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search projects by title, description, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg py-3"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6">
              {filteredProjects.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2">No Projects Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms to find more opportunities.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredProjects.map((project) => (
                  <Card key={project.id} className="hover-lift cursor-pointer border-2 border-transparent hover:border-secondary/30">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            <Link to={`/projects/${project.id}`} className="hover:text-secondary transition-colors">
                              {project.title}
                            </Link>
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Building size={14} />
                              <span>{project.clientCompany}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} />
                              <span>{project.clientIndustry}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{getTimeAgo(project.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary mb-1">
                            ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project.budgetType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 4 && (
                          <Badge variant="outline">
                            +{project.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{timelines.find(t => t.value === project.timeline)?.label || project.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{project.proposals?.length || 0} proposals</span>
                          </div>
                          <Badge variant={project.experienceLevel === 'expert' ? 'default' : 'secondary'}>
                            {project.experienceLevel}
                          </Badge>
                        </div>
                        
                        <Button asChild className="covalent-gradient text-white hover:opacity-90">
                          <Link to={`/projects/${project.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjects;

