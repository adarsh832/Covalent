import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Users, 
  Zap, 
  Shield, 
  Star,
  Building,
  TrendingUp,
  CheckCircle,
  Quote
} from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerChildren, StaggerItem } from '../components/ScrollAnimations';

const Homepage = () => {
  const industries = [
    {
      name: 'Pharmaceutical & Biotech',
      icon: '🧬',
      description: 'Drug discovery, clinical research, regulatory compliance',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Technology & Software',
      icon: '💻',
      description: 'AI/ML, software development, data analytics',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Manufacturing & Engineering',
      icon: '⚙️',
      description: 'Process optimization, automation, quality control',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Finance & Consulting',
      icon: '📊',
      description: 'Financial modeling, risk assessment, strategy',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Healthcare & Medical',
      icon: '🏥',
      description: 'Medical devices, patient care, health tech',
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'Legal & Compliance',
      icon: '⚖️',
      description: 'Regulatory affairs, IP law, compliance',
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Post Your Challenge',
      description: 'Describe your cross-industry collaboration needs and the expertise you\'re seeking.',
      icon: <Building className="w-8 h-8 text-secondary" />
    },
    {
      number: '02',
      title: 'Connect with Experts',
      description: 'Receive proposals from verified professionals across different industries.',
      icon: <Users className="w-8 h-8 text-secondary" />
    },
    {
      number: '03',
      title: 'Collaborate & Grow',
      description: 'Work together to solve complex challenges and drive innovation forward.',
      icon: <TrendingUp className="w-8 h-8 text-secondary" />
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Scientific Officer',
      company: 'BioTech Innovations',
      content: 'Covalent helped us connect with AI experts who transformed our drug discovery process. The collaboration exceeded all expectations.',
      rating: 5,
      avatar: '👩‍🔬'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'MedTech Solutions',
      content: 'Finding the right legal expertise for FDA compliance was seamless. Our product launch timeline was accelerated by months.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Jennifer Park',
      role: 'Marketing Director',
      company: 'FinanceFlow',
      content: 'The marketing strategy developed through Covalent increased our B2B leads by 300%. Truly game-changing collaboration.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="container mx-auto text-center">
          <FadeInUp delay={0.2}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 Launching Cross-Industry Collaboration Platform
            </Badge>
          </FadeInUp>
          
          <FadeInUp delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Covalent
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.6}>
            <p className="text-2xl md:text-3xl text-secondary font-medium mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Stronger Together
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.8}>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Break down industry silos and unlock unprecedented innovation. Connect with experts across 
              pharmaceutical, technology, manufacturing, and beyond to solve your most complex business challenges.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="covalent-gradient text-white hover:opacity-90 px-8 py-4 text-lg">
                <Link to="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-secondary/10">
                <Link to="/how-it-works">
                  Learn How It Works
                </Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Cross-Industry Expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect professionals from diverse industries to create innovative solutions that wouldn't be possible in isolation.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {industries.map((industry, index) => (
              <StaggerItem key={index}>
                <Card className="hover-lift border-2 border-transparent hover:border-secondary/30 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{industry.icon}</div>
                    <CardTitle className="text-xl mb-2">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{industry.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our streamlined process makes cross-industry collaboration simple, secure, and successful.
              </p>
            </div>
          </FadeInUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <FadeInUp key={index} delay={index * 0.2}>
                <div className="text-center">
                  <ScaleIn delay={index * 0.2 + 0.3}>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full covalent-gradient flex items-center justify-center">
                      {step.icon}
                    </div>
                  </ScaleIn>
                  <div className="text-6xl font-bold text-secondary/20 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Why Choose Covalent?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  We're not just another freelancing platform. We're the bridge between industries, 
                  fostering collaborations that drive real innovation.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Shield className="w-6 h-6 text-secondary" />,
                      title: 'Verified Experts',
                      description: 'All professionals are thoroughly vetted and industry-certified.'
                    },
                    {
                      icon: <Zap className="w-6 h-6 text-secondary" />,
                      title: 'Fast Matching',
                      description: 'AI-powered matching connects you with the right expertise quickly.'
                    },
                    {
                      icon: <Users className="w-6 h-6 text-secondary" />,
                      title: 'Collaborative Tools',
                      description: 'Built-in project management and communication tools.'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInLeft>
            
            <FadeInRight>
              <div className="relative">
                <div className="w-full h-96 rounded-2xl covalent-gradient opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🤝</div>
                    <p className="text-xl font-medium">Collaboration in Action</p>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how businesses across industries are achieving breakthrough results through Covalent collaborations.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <Card className="hover-lift border-2 border-transparent hover:border-secondary/30 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-3xl">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-secondary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                    <p className="text-muted-foreground italic leading-relaxed">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Transform Your Business?
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already breaking barriers and creating innovative solutions together.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90">
                <Link to="/signup">
                  Start Collaborating Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white/10">
                <Link to="/find-projects">
                  Browse Opportunities
                </Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

