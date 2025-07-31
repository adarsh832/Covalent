import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Star,
  Briefcase,
  FileText,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const [stats, setStats] = useState({
    activeProjects: 3,
    totalEarnings: 12800,
    completedProjects: 15,
    rating: 4.8
  });

  const recentProjects = [
    {
      id: 1,
      title: 'Biotech-Manufacturing Integration',
      client: 'TechManufacturing Inc.',
      status: 'active',
      budget: '$5,000',
      deadline: '2025-08-15',
      progress: 65
    },
    {
      id: 2,
      title: 'Healthcare Legal Compliance',
      client: 'HealthTech Solutions',
      status: 'pending',
      budget: '$3,200',
      deadline: '2025-08-20',
      progress: 0
    },
    {
      id: 3,
      title: 'Finance Marketing Strategy',
      client: 'FinanceFlow',
      status: 'completed',
      budget: '$4,500',
      deadline: '2025-07-25',
      progress: 100
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'AI Integration for Pharmaceutical Research',
      industry: 'Pharmaceutical & Biotech',
      budget: '$8,000 - $12,000',
      proposals: 5,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      title: 'Legal Compliance for Medical Device Startup',
      industry: 'Healthcare & Medical',
      budget: '$3,000 - $5,000',
      proposals: 3,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      title: 'Marketing Strategy for FinTech Platform',
      industry: 'Finance & Consulting',
      budget: '$6,000 - $10,000',
      proposals: 8,
      timeAgo: '6 hours ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isClient = userProfile?.userType === 'client';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome back, {userProfile?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground text-lg">
              {isClient ? 'Manage your projects and find expert collaborators' : 'Discover new opportunities and grow your business'}
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button asChild className="covalent-gradient text-white hover:opacity-90">
              <Link to={isClient ? "/post-project" : "/browse-projects"}>
                <Plus className="mr-2" size={18} />
                {isClient ? 'Post Project' : 'Browse Projects'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/messages">
                <MessageSquare className="mr-2" size={18} />
                Messages
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isClient ? 'Active Projects' : 'Active Contracts'}
                  </p>
                  <p className="text-3xl font-bold text-primary">{stats.activeProjects}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Briefcase className="text-secondary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isClient ? 'Total Invested' : 'Total Earnings'}
                  </p>
                  <p className="text-3xl font-bold text-primary">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Projects</p>
                  <p className="text-3xl font-bold text-primary">{stats.completedProjects}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-3xl font-bold text-primary">{stats.rating}</p>
                    <Star className="text-yellow-500 fill-current" size={20} />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Users className="text-yellow-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects / Active Contracts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{isClient ? 'Recent Projects' : 'Active Contracts'}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={isClient ? "/my-projects" : "/my-contracts"}>
                      View All
                    </Link>
                  </Button>
                </CardTitle>
                <CardDescription>
                  {isClient ? 'Track your posted projects and collaborations' : 'Manage your ongoing work and deliverables'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">{project.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <span className="flex items-center text-muted-foreground">
                            <DollarSign size={14} className="mr-1" />
                            {project.budget}
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            <Clock size={14} className="mr-1" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary mb-1">{project.progress}%</div>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-secondary rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opportunities / Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isClient ? 'Quick Actions' : 'New Opportunities'}
                </CardTitle>
                <CardDescription>
                  {isClient ? 'Manage your account and projects' : 'Fresh projects matching your expertise'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isClient ? (
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/post-project">
                        <Plus className="mr-2" size={18} />
                        Post New Project
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/find-experts">
                        <Search className="mr-2" size={18} />
                        Find Experts
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/messages">
                        <MessageSquare className="mr-2" size={18} />
                        Messages
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/profile">
                        <Settings className="mr-2" size={18} />
                        Profile Settings
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium text-primary text-sm mb-1">{opportunity.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{opportunity.industry}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-secondary font-medium">{opportunity.budget}</span>
                          <span className="text-muted-foreground">{opportunity.proposals} proposals</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{opportunity.timeAgo}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/browse-projects">
                        View All Opportunities
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

