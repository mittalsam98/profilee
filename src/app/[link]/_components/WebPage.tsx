import { socialMediaDataByName } from '@/app/(main)/builder/_components/page-elements';
import { AdhocLinks } from '@/types/types';
import { JsonArray, JsonValue } from '@prisma/client/runtime/library';
import Link from 'next/link';
import LinkClient from './LinkClient';

interface PropsTypes {
  userId: string;
  profileImg?: string | null;
  title: string;
  bio?: string | null;
  adhocLinks?: JsonArray;
  socialLinks?: JsonValue;
}

export default function WebpageServer({
  profileImg,
  title,
  bio,
  socialLinks,
  adhocLinks,
  userId
}: PropsTypes) {
  let updatedAdhocLinkType: AdhocLinks[] = [];
  if (adhocLinks && typeof adhocLinks === 'object' && Array.isArray(adhocLinks)) {
    updatedAdhocLinkType = adhocLinks as AdhocLinks[];
  }

  return (
    <div className='h-full w-full absolute max-w-lg shadow-md shadow-slate-400 p-8 mx-auto text-center bg-white'>
      <figure className='p-2'>
        {profileImg && typeof profileImg === 'string' && (
          <img
            src={
              typeof profileImg === 'string'
                ? `https://profilee-webapp.s3.amazonaws.com/${profileImg}`
                : URL.createObjectURL(profileImg as File)
            }
            alt='Profile pic'
            width={150}
            height={150}
            className='flex h-[130px] w-[130px] m-auto rounded-full border border-border hover:cursor-pointer bg-background/50'
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
        <LinkClient adhocLinks={updatedAdhocLinkType} userId={userId} />
      </div>
    </div>
  );
}
/*
ctx[{"id":"6e7e839c-5e7e-457a-a097-76ed92f933b1","link":"dd","name":"sa","theme":{"textAlign":"CENTER","textColor":"#000","borderColor":"","borderRadius":"SM","backgroundColor":"#fff"},"isActive":true},{"id":"b4bd5263-cd96-4eda-9529-68302c607373","link":"dfdsa","name":"teste","theme":{"textAlign":"CENTER","textColor":"#000","borderColor":"","borderRadius":"SM","backgroundColor":"#fff"},"isActive":true},{"id":"e258dfb7-64e3-4ef9-9eec-55b4d106f8a5","link":"fdsafdsac","name":"tesf","theme":{"textAlign":"CENTER","textColor":"#000","borderColor":"","borderRadius":"SM","backgroundColor":"#fff"},"isActive":true}]
 */
