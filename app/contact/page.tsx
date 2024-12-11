import ContactForm from '@/components/contact/form';
import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'react-feather';

export const metadata: Metadata = {
  title: 'Contact Us - Timlukfab',
};

export default function Page() {
  return (
    <main className='pb-16 pt-6'>
      <div className='wrapper'>
        <h2 className='mb-8 text-2xl font-bold'>Contact Us</h2>

        <div className='grid gap-12 md:grid-cols-2'>
          {/* Contact Information */}
          <div>
            <h3 className='mb-6 text-xl font-semibold'>Get in Touch</h3>
            <div className='space-y-6 text-gray-600'>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-gray-900' />
                <span>North Hollywood, Los Angeles, California.</span>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-gray-900' />
                <a href='tel:+13107024047' className='hover:text-gray-900'>
                  +1 (310) 702-4047
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-gray-900' />
                <a
                  href='mailto:info@timlukfab.com'
                  className='hover:text-gray-900'
                >
                  info@timlukfab.com
                </a>
              </div>
            </div>

            <div className='mt-8'>
              <h3 className='mb-4 text-xl font-semibold'>Business Hours</h3>
              <div className='space-y-2 text-gray-600'>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                <p>Saturday: 10:00 AM - 4:00 PM (PST)</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='rounded-lg bg-gray-50 p-6'>
            <h3 className='mb-6 text-xl font-semibold'>Send us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
