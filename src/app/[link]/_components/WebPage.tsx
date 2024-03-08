import { socialMediaDataByName } from '@/app/(main)/builder/_components/page-elements';
import { AdhocLinks, SocialMediaDataContext } from '@/types/types';
import { JsonArray, JsonValue } from '@prisma/client/runtime/library';
import Image from 'next/image';
import Link from 'next/link';

interface PropsTypes {
  profileImg?: string | null;
  title: string;
  bio?: string | null;
  adhocLinks?: JsonArray;
  socialLinks?: JsonValue;
}

export default function Webpage({ profileImg, title, bio, socialLinks, adhocLinks }: PropsTypes) {
  let updatedAdhocLinkType: AdhocLinks[] = [];
  if (adhocLinks && typeof adhocLinks === 'object' && Array.isArray(adhocLinks)) {
    updatedAdhocLinkType = adhocLinks as AdhocLinks[];
  }
  return (
    <div className='h-full w-full absolute max-w-lg shadow-md shadow-slate-400 p-8 mx-auto text-center bg-white '>
      <figure className='p-2'>
        {profileImg && typeof profileImg === 'string' && (
          <Image
            src={
              typeof profileImg === 'string'
                ? `https://profilee-webapp.s3.amazonaws.com/${profileImg}`
                : URL.createObjectURL(profileImg as File)
            }
            alt='Profile pic'
            width={150}
            height={150}
            className='flex h-[130px] w-[130px] m-auto rounded-full border border-border hover:cursor-pointer bg-background/50 '
          />
        )}
        <div className='text-center space-y-4'>
          <figcaption className='font-medium'>
            <div className='text-cyan-900 text-xl'>{title}</div>
            <div className='text-gray-500 font-light'>{bio}</div>
          </figcaption>
        </div>
      </figure>
      <div className='mx-auto'>
        {socialLinks && Object.entries(socialLinks).length > 0 && (
          <div className='flex gap-3 flex-wrap justify-center py-3'>
            {Object.entries(socialLinks).map(([platform, value]) => (
              <Link href={new URL(value)} key={platform} target='_blank'>
                {socialMediaDataByName[platform]?.icon}
              </Link>
            ))}
          </div>
        )}

        {updatedAdhocLinkType.map((link) => {
          return link.isActive ? (
            <div className='pt-6 text-center space-y-4 '>
              <Link
                href={link.link}
                target='_blank'
                key={link.id}
                className='flex items-center rounded-lg border border-gray-400 px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150'
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
