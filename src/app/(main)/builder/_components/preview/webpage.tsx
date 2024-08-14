import useDesigner from '@/hooks/use-designer';
import Image from 'next/image';
import Link from 'next/link';
import { socialMediaDataByName } from '../page-elements';

export default function Webpage() {
  const { state } = useDesigner();

  return (
    <div className='max-w-lg mx-auto px-3 overflow-hidden text-center '>
      <figure className='p-2'>
        {state.userProfile.profileImg && (
          <Image
            src={
              typeof state.userProfile.profileImg === 'string'
                ? `https://profilee-webapp.s3.amazonaws.com/${state.userProfile.profileImg}`
                : URL.createObjectURL(state.userProfile.profileImg)
            }
            alt='Profile pic'
            width={150}
            height={150}
            className='flex h-[120px] w-[120px] m-auto rounded-full border border-border hover:cursor-pointer bg-background/50 '
          />
        )}
        <div className='text-center space-y-4'>
          <figcaption className='font-medium'>
            <div className='text-cyan-900 text-xl' style={{ color: state.userProfile.titleColor }}>
              {state.userProfile.title}
            </div>
            <div className='text-gray-500 font-light' style={{ color: state.userProfile.bioColor }}>
              {state.userProfile.bio}
            </div>
          </figcaption>
        </div>
      </figure>
      <div className='mx-auto'>
        {Object.entries(state.socialLinks).length > 0 && (
          <div className='flex gap-3 flex-wrap justify-center py-3'>
            {Object.entries(state.socialLinks).map(([platform, value]) => (
              <Link href={value} key={platform} target='_blank'>
                {socialMediaDataByName[platform]?.icon}
              </Link>
            ))}
          </div>
        )}

        {state.adhocLinks?.map((link) => {
          return link.isActive ? (
            <div className='pt-6 text-center space-y-4'>
              <Link
                href={link.link}
                target='_blank'
                key={link.id}
                style={{
                  background: link.theme.backgroundColor ? link.theme.backgroundColor : '',
                  color: link.theme.textColor ? link.theme.textColor : '',
                  borderColor: link.theme.textColor ? link.theme.borderColor : ''
                }}
                className={`flex items-center rounded-lg border  px-5 py-4 text-sm leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150`}
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
