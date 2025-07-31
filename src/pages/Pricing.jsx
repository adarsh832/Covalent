import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'per month',
    icon: <Star className="w-8 h-8 text-secondary" />,
    features: [
      'Browse projects',
      'Submit up to 3 proposals/month',
      'Basic support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '29',
    period: 'per month',
    icon: <Crown className="w-8 h-8 text-primary" />,
    features: [
      'Unlimited proposals',
      'Priority project access',
      'Advanced analytics',
      'Standard support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    icon: <Crown className="w-8 h-8 text-secondary" />,
    features: [
      'Dedicated account manager',
      'Custom integrations',
      'Team collaboration tools',
      'Premium support',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold covalent-text-gradient mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Pricing Plans
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose the plan that fits your needs. Simple, transparent pricing for every stage of your journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <Card
            key={plan.name}
            className={`flex flex-col border-2 ${plan.highlight ? 'border-secondary shadow-xl scale-105' : 'border-primary/20 shadow-md'} transition-transform duration-200 bg-white/90`}
          >
            <CardHeader className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${plan.highlight ? 'covalent-gradient' : 'bg-muted'}`}>{plan.icon}</div>
              <CardTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{plan.name}</CardTitle>
              <CardDescription className="text-center text-lg">
                <span className="text-4xl font-extrabold text-primary">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}</span>
                {plan.price !== 'Custom' && <span className="text-base text-muted-foreground">/{plan.period}</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`mt-auto w-full ${plan.highlight ? 'covalent-gradient text-white hover:opacity-90' : ''}`}>{plan.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default Pricing;