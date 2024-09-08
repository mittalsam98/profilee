import useDesigner from '@/hooks/use-designer';
import Image from 'next/image';
import Link from 'next/link';
import { socialMediaDataByName } from '../page-elements';

export default function Webpage() {
  const { state } = useDesigner();

  return (
    <div
      style={{ background: state.generalAppearance.primaryBackgroundColor }}
      className='relative w-full h-full mx-auto overflow-hidden text-center'
    >
      {/* Secondary Background */}
      {state.generalAppearance.useSecondaryBackground && (
        <div
          style={{ background: state.generalAppearance.secondaryBackgroundColor }}
          className='relative h-28'
        >
          <figure className='absolute inset-x-0 bottom-[-60px] flex justify-center'>
            {state.userProfile.pic && (
              <Image
                src={
                  typeof state.userProfile.pic === 'string'
                    ? `https://profilee-webapp.s3.amazonaws.com/${state.userProfile.pic}`
                    : URL.createObjectURL(state.userProfile.pic)
                }
                alt='Profile pic'
                width={120}
                height={120}
                className='rounded-full border border-border hover:cursor-pointer bg-background/50'
              />
            )}
          </figure>
        </div>
      )}

      {/* Primary Background */}
      {!state.generalAppearance.useSecondaryBackground && (
        <figure className='flex justify-center pt-8'>
          {state.userProfile.pic && (
            <Image
              src={
                typeof state.userProfile.pic === 'string'
                  ? `https://profilee-webapp.s3.amazonaws.com/${state.userProfile.pic}`
                  : URL.createObjectURL(state.userProfile.pic)
              }
              alt='Profile pic'
              width={120}
              height={120}
              className='rounded-full border border-border hover:cursor-pointer bg-background/50'
            />
          )}
        </figure>
      )}

      {/* Title and Bio */}
      <div
        className={`text-center space-y-4 ${
          state.generalAppearance.useSecondaryBackground ? 'mt-16' : 'mt-2'
        } `}
      >
        <figcaption className='font-medium'>
          <div className='text-cyan-900 text-xl' style={{ color: state.userProfile.titleColor }}>
            {state.userProfile.title}
          </div>
          <div className='text-gray-500 font-light' style={{ color: state.userProfile.bioColor }}>
            {state.userProfile.bio}
          </div>
        </figcaption>
      </div>

      {/* Social Links */}
      <div className='mx-auto px-2'>
        {Object.entries(state.socialLinks).length > 0 && (
          <div className='flex gap-3 flex-wrap justify-center py-3'>
            {Object.entries(state.socialLinks).map(([platform, value]) => (
              <Link href={value} key={platform} target='_blank'>
                {socialMediaDataByName[platform]?.icon}
              </Link>
            ))}
          </div>
        )}

        {/* Adhoc Links */}
        {state.adhocLinks?.map((link) => {
          return link.isActive ? (
            <div className='pt-6 text-center space-y-4' key={link.id}>
              <Link
                href={link.link}
                target='_blank'
                style={{
                  background: link.theme.backgroundColor ? link.theme.backgroundColor : '',
                  color: link.theme.textColor ? link.theme.textColor : '',
                  borderColor: link.theme.textColor ? link.theme.borderColor : ''
                }}
                className='flex items-center rounded-lg border px-5 py-4 text-sm leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150'
              >
                {link.name}
              </Link>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
