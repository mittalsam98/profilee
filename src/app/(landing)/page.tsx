import LandingPage from './_components/landing-page';

export default function Home() {
  return (
    <div className='text-center  dark:bg-[#1F1F1F]'>
      <LandingPage />
      {/* Gradient Backgrounds */}
      <div className='blob w-[800px] h-[800px] rounded-[999px] absolute top-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100'></div>
      <div className='blob w-[1000px] h-[1000px] rounded-[999px] absolute bottom-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-100 via-gray-100 to-blue-100'></div>
      <div className='blob w-[600px] h-[600px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-slate-100 via-Fuchsia-100 to-blue-100'></div>
      <div className='blob w-[300px] h-[300px] rounded-[999px] absolute bottom-[-10px] right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-green-100 via-cyan-100 to-Fuchsia-100'></div>
    </div>
  );
}
