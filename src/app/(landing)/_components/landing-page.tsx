import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { RiGithubLine } from 'react-icons/ri';
import PricingSection from './pricing-section';
import Hero from './hero';

export default function LandingPage() {
  return (
    <div className='relative w-full flex flex-col items-center'>
      <Hero />
      <PricingSection />
    </div>
  );
}
