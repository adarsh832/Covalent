import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, TrendingUp, CheckCircle, ArrowRight, Star } from 'lucide-react';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create an account as a client or an expert to get started on the platform.',
    icon: <Star className="w-8 h-8 text-secondary" />
  },
  {
    title: 'Post or Browse Projects',
    description: 'Clients post new projects. Experts browse projects that match their skills.',
    icon: <Building className="w-8 h-8 text-secondary" />
  },
  {
    title: 'Submit Proposals',
    description: 'Experts submit proposals outlining their approach, timeline, and budget.',
    icon: <ArrowRight className="w-8 h-8 text-secondary" />
  },
  {
    title: 'Review & Hire',
    description: 'Clients review proposals, chat with experts, and hire the best fit.',
    icon: <Users className="w-8 h-8 text-secondary" />
  },
  {
    title: 'Collaborate & Complete',
    description: 'Work together using platform tools. Mark the project as complete when finished.',
    icon: <CheckCircle className="w-8 h-8 text-secondary" />
  },
  {
    title: 'Payment & Feedback',
    description: 'Clients release payment and leave feedback. Experts build their reputation.',
    icon: <TrendingUp className="w-8 h-8 text-secondary" />
  }
];

const HowItWorks = () => (
  <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
    <div className="container mx-auto max-w-3xl">
      <Card className="mb-10 border-2 border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center covalent-text-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground text-center mb-10">
            Covalent connects clients with industry experts for project-based collaboration. Here’s how it works:
          </p>
          <div className="flex flex-col gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 bg-white/80 rounded-xl border border-border/60 shadow-sm p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full covalent-gradient">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-primary mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {idx + 1}. {step.title}
                  </div>
                  <div className="text-base text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default HowItWorks;