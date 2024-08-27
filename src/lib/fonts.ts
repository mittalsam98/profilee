import {
  Arimo,
  Barlow,
  DM_Sans,
  Dosis,
  Fira_Sans,
  Heebo,
  IBM_Plex_Sans,
  Inconsolata,
  Inter,
  Josefin_Sans,
  Kanit,
  Karla,
  Lato,
  Libre_Baskerville,
  Libre_Franklin,
  Lora,
  Manrope,
  Merriweather,
  Mukta,
  Mulish,
  Nanum_Gothic,
  Noto_Sans,
  Noto_Serif,
  Nunito,
  Oswald,
  Poppins,
  PT_Sans,
  PT_Sans_Narrow,
  PT_Serif,
  Quicksand,
  Raleway,
  Roboto,
  Rubik,
  Titillium_Web,
  Ubuntu,
  Work_Sans
} from 'next/font/google';

const arimo = Arimo({ subsets: ['latin'] });
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '700'] });
const dm_Sans = DM_Sans({ subsets: ['latin'] });
const dosis = Dosis({ subsets: ['latin'] });
const fira_Sans = Fira_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const heebo = Heebo({ subsets: ['latin'] });
const ibm_Plex_Sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const inconsolata = Inconsolata({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const josefin_Sans = Josefin_Sans({ subsets: ['latin'] });
const kanit = Kanit({ subsets: ['latin'], weight: ['400', '700'] });
const karla = Karla({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const libre_Baskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });
const libre_Franklin = Libre_Franklin({ subsets: ['latin'] });
const lora = Lora({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });
const mukta = Mukta({ subsets: ['latin'], weight: ['400', '700'] });
const mulish = Mulish({ subsets: ['latin'] });
const nanum_Gothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400', '700'] });
const noto_Sans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const noto_Serif = Noto_Serif({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const pt_Sans = PT_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const pt_Sans_Narrow = PT_Sans_Narrow({ subsets: ['latin'], weight: ['400', '700'] });
const pt_Serif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'] });
const quicksand = Quicksand({ subsets: ['latin'] });
const raleway = Raleway({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const rubik = Rubik({ subsets: ['latin'] });
const titillium_Web = Titillium_Web({ subsets: ['latin'], weight: ['400', '700'] });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });
const work_Sans = Work_Sans({ subsets: ['latin'] });

export const fontsDictionary = {
  Arimo: { name: 'Arimo', family: 'Arimo', instance: arimo },
  Barlow: { name: 'Barlow', family: 'Barlow', instance: barlow },
  DM_Sans: { name: 'DM Sans', family: 'DM_Sans', instance: dm_Sans },
  Dosis: { name: 'Dosis', family: 'Dosis', instance: dosis },
  Fira_Sans: { name: 'Fira Sans', family: 'Fira_Sans', instance: fira_Sans },
  Heebo: { name: 'Heebo', family: 'Heebo', instance: heebo },
  IBM_Plex_Sans: { name: 'IBM Plex Sans', family: 'IBM_Plex_Sans', instance: ibm_Plex_Sans },
  Inconsolata: { name: 'Inconsolata', family: 'Inconsolata', instance: inconsolata },
  Inter: { name: 'Inter', family: 'Inter', instance: inter },
  Josefin_Sans: { name: 'Josefin Sans', family: 'Josefin_Sans', instance: josefin_Sans },
  Kanit: { name: 'Kanit', family: 'Kanit', instance: kanit },
  Karla: { name: 'Karla', family: 'Karla', instance: karla },
  Lato: { name: 'Lato', family: 'Lato', instance: lato },
  Libre_Baskerville: {
    name: 'Libre Baskerville',
    family: 'Libre_Baskerville',
    instance: libre_Baskerville
  },
  Libre_Franklin: { name: 'Libre Franklin', family: 'Libre_Franklin', instance: libre_Franklin },
  Lora: { name: 'Lora', family: 'Lora', instance: lora },
  Manrope: { name: 'Manrope', family: 'Manrope', instance: manrope },
  Merriweather: { name: 'Merriweather', family: 'Merriweather', instance: merriweather },
  Mukta: { name: 'Mukta', family: 'Mukta', instance: mukta },
  Mulish: { name: 'Mulish', family: 'Mulish', instance: mulish },
  Nanum_Gothic: { name: 'Nanum Gothic', family: 'Nanum_Gothic', instance: nanum_Gothic },
  Noto_Sans: { name: 'Noto Sans', family: 'Noto_Sans', instance: noto_Sans },
  Noto_Serif: { name: 'Noto Serif', family: 'Noto_Serif', instance: noto_Serif },
  Nunito: { name: 'Nunito', family: 'Nunito', instance: nunito },
  Oswald: { name: 'Oswald', family: 'Oswald', instance: oswald },
  Poppins: { name: 'Poppins', family: 'Poppins', instance: poppins },
  PT_Sans: { name: 'PT Sans', family: 'PT_Sans', instance: pt_Sans },
  PT_Sans_Narrow: { name: 'PT Sans Narrow', family: 'PT_Sans_Narrow', instance: pt_Sans_Narrow },
  PT_Serif: { name: 'PT Serif', family: 'PT_Serif', instance: pt_Serif },
  Quicksand: { name: 'Quicksand', family: 'Quicksand', instance: quicksand },
  Raleway: { name: 'Raleway', family: 'Raleway', instance: raleway },
  Roboto: { name: 'Roboto', family: 'Roboto', instance: roboto },
  Rubik: { name: 'Rubik', family: 'Rubik', instance: rubik },
  Titillium_Web: { name: 'Titillium Web', family: 'Titillium_Web', instance: titillium_Web },
  Ubuntu: { name: 'Ubuntu', family: 'Ubuntu', instance: ubuntu },
  Work_Sans: { name: 'Work Sans', family: 'Work_Sans', instance: work_Sans }
};

export const fontsArray = Object.keys(fontsDictionary).map(
  (key) => fontsDictionary[key as keyof typeof fontsDictionary]
);
