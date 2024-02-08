import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import { ArrowRight, Check, HelpCircle, Minus } from 'lucide-react';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { TbInfoCircleFilled } from 'react-icons/tb';

export default async function PricingSection() {
  const session = await getServerAuthSession();
  const user = session?.user;

  const pricingItems = [
    {
      plan: 'Free',
      price: '0',
      tagline: 'For your personal Profilee',
      features: [
        {
          text: 'Unlimited Profilee links',
          footnote: 'Create unlimited social and adhoc links'
        },
        {
          text: 'Unique custom username',
          footnote: 'The maximum file size of a single PDF file.'
        },
        {
          text: 'Profile bio and picture'
        },
        {
          text: 'QR Code',
          footnote: 'Generate QR code that you can share with your friends'
        },
        {
          text: 'Color Customization',
          negative: true
        },
        {
          text: 'Links analytics dashboard',
          negative: true
        },
        {
          text: 'Create multiple Profilee links',
          negative: true
        }
      ]
    },
    {
      plan: 'Pro',
      price: '2',
      tagline: 'For growing influencers',
      features: [
        {
          text: 'Unlimited Profilee links',
          footnote: 'Create unlimited social and adhoc links'
        },
        {
          text: 'Unique custom username',
          footnote: 'The maximum file size of a single PDF file.'
        },
        {
          text: 'Profile bio and picture'
        },
        {
          text: 'QR Code',
          footnote: 'Generate QR code that you can share with your friends'
        },
        {
          text: 'Color Customization'
        },
        {
          text: 'Links analytics dashboard'
        },
        {
          text: 'Create multiple Profilee links'
        }
      ]
    }
  ];

  return (
    <>
      <div id='pricing' className='mb-8 mt-24 text-center max-w-6xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-5xl font-bold'>Plans fit for you</h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            All plans start free. Pay for what you want
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, features, price }) => {
              return (
                <div
                  key={plan}
                  className={cn('relative rounded-2xl bg-white shadow-lg', {
                    'border-2 border-blue-600 shadow-blue-200': plan === 'Pro',
                    'border border-gray-200': plan !== 'Pro'
                  })}
                >
                  {plan === 'Pro' && (
                    <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                      Coming Soon
                    </div>
                  )}

                  <div className='p-5'>
                    <h3 className='my-3 text-center font-display text-3xl font-bold'>{plan}</h3>
                    <p className='text-gray-500'>{tagline}</p>
                    <p className='my-5 font-display text-6xl font-semibold'>${price}</p>
                    <p className='text-gray-500'>per month</p>
                  </div>
                  {plan === 'Pro' && (
                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                      <div className='flex items-center space-x-1'>
                        <p> Less than one burger cost </p>
                      </div>
                    </div>
                  )}

                  <ul className='my-10 space-y-5 px-8'>
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className='flex space-x-5'>
                        <div className='flex-shrink-0'>
                          {negative ? (
                            <MdCancel className='h-6 w-6 text-gray-300' />
                          ) : (
                            <IoCheckmark className='h-6 w-6 text-blue-500' />
                          )}
                        </div>
                        {footnote ? (
                          <div className='flex items-center space-x-1'>
                            <p
                              className={cn('text-gray-600', {
                                'text-gray-400': negative
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className='cursor-default ml-1.5'>
                                <TbInfoCircleFilled className='h-4 w-4 text-zinc-500' />
                              </TooltipTrigger>
                              <TooltipContent className='w-80 p-2'>{footnote}</TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn('text-gray-600', {
                              'text-gray-400': negative
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* <div className='p-5'>
                    {plan === 'Free' ? (
                      <Link
                        href={user ? '/dashboard' : '/sign-in'}
                        className={buttonVariants({
                          className: 'w-full',
                          variant: 'secondary'
                        })}
                      >
                        {user ? 'Upgrade now' : 'Sign up'}
                        <ArrowRight className='h-5 w-5 ml-1.5' />
                      </Link>
                    ) : user ? (
                      <input />
                    ) : (
                      <Link
                        href='/sign-in'
                        className={buttonVariants({
                          className: 'w-full'
                        })}
                      >
                        {user ? 'Upgrade now' : 'Sign up'}
                        <ArrowRight className='h-5 w-5 ml-1.5' />
                      </Link>
                    )}
                  </div> */}
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
