'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Input
          type='text'
          placeholder='Your Name'
          required
          className='h-12'
        />
      </div>
      <div>
        <Input
          type='email'
          placeholder='Your Email'
          required
          className='h-12'
        />
      </div>
      <div>
        <Input
          type='text'
          placeholder='Subject'
          required
          className='h-12'
        />
      </div>
      <div>
        <textarea
          placeholder='Your Message'
          required
          className='min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        />
      </div>
      <Button 
        type='submit' 
        className='h-12 w-full bg-gray-900 text-white hover:bg-gray-800'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}