import { socialMediaDataByName } from '@/app/(main)/builder/_components/page-elements';
import { AdhocLinks } from '@/types/types';
import { GeneralAppearance, UserProfile } from '@prisma/client';
import { JsonArray, JsonValue } from '@prisma/client/runtime/library';
import Link from 'next/link';
import LinkClient from './LinkClient';
import { fontsDictionary } from '@/lib/fonts';

interface PropsTypes {
  userId: string;

  socialLinks?: JsonValue;
  adhocLinks?: JsonArray;
  userProfile: Omit<UserProfile, 'id' | 'userId'> | null;
  generalAppearance: Omit<GeneralAppearance, 'id' | 'userId'> | null;
}

export default function WebpageServer({
  userProfile,
  adhocLinks,
  userId,
  generalAppearance,
  socialLinks
}: PropsTypes) {
  let updatedAdhocLinkType: AdhocLinks[] = [];
  if (adhocLinks && typeof adhocLinks === 'object' && Array.isArray(adhocLinks)) {
    updatedAdhocLinkType = adhocLinks as AdhocLinks[];
  }

  console.log({ userProfile, generalAppearance });
  if (!userProfile || !generalAppearance) {
    return;
  }

  const fontInstance =
    fontsDictionary[generalAppearance.fontFamily as keyof typeof fontsDictionary]?.instance ?? null;

  console.log({ fontInstance: fontInstance?.className, generalAppearance });
  return (
    <div
      style={{ background: generalAppearance.primaryBackgroundColor }}
      className={
        (fontInstance?.className ? fontInstance.className : '') +
        ' h-full w-full absolute max-w-lg shadow-md shadow-slate-400 mx-auto text-center bg-white'
      }
    >
      {generalAppearance.useSecondaryBackground && (
        <div
          style={{ background: generalAppearance.secondaryBackgroundColor }}
          className='relative h-28'
        >
          <figure className='absolute inset-x-0 bottom-[-60px] flex justify-center'>
            {userProfile.pic && (
              <img
                src={`https://profilee-webapp.s3.amazonaws.com/${
                  userProfile.pic
                }?lastUpdated=${Date.now()}`}
                alt='Profile pic'
                width={150}
                height={150}
                className='flex h-[130px] w-[130px] m-auto rounded-full border border-border hover:cursor-pointer bg-background/50'
              />
            )}
          </figure>
        </div>
      )}

      {/* Primary Background */}
      {!generalAppearance.useSecondaryBackground && (
        <figure className='flex justify-center pt-8'>
          {userProfile.pic && (
            <img
              src={`https://profilee-webapp.s3.amazonaws.com/${
                userProfile.pic
              }?lastUpdated=${Date.now()}`}
              alt='Profile pic'
              width={150}
              height={150}
              className='flex h-[130px] w-[130px] m-auto rounded-full border border-border hover:cursor-pointer bg-background/50'
            />
          )}
        </figure>
      )}

      {/* Title and Bio */}
      <div
        className={`text-center space-y-4 ${
          generalAppearance.useSecondaryBackground ? 'mt-16' : 'mt-2'
        } `}
      >
        <figcaption className='font-medium'>
          <div className='text-cyan-900 text-xl' style={{ color: userProfile.titleColor }}>
            {userProfile.title}
          </div>
          <div className='text-gray-500 font-light' style={{ color: userProfile.bioColor }}>
            {userProfile.bio}
          </div>
        </figcaption>
      </div>
      <div className='mx-auto px-4'>
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
