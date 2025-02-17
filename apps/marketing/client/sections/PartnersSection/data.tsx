import CollabLogo from 'client/icons/logos/CollabLogo';
import DexterityLogo from 'client/icons/logos/DexterityLogo';
import GsrLogo from 'client/icons/logos/GsrLogo';
import HackVCLogo from 'client/icons/logos/HackVCLogo';
import HrtLogo from 'client/icons/logos/HrtLogo';
import JaneStreetLogo from 'client/icons/logos/JaneStreetLogo';
import SeliniLogo from 'client/icons/logos/SeliniLogo';
import WintermuteLogo from 'client/icons/logos/WintermuteLogo';
import { LINKS } from 'config/links';

export const PARTNERS = [
  { name: 'Wintermute', logo: WintermuteLogo, link: LINKS.wintermute },
  { name: 'Selini', logo: SeliniLogo, link: LINKS.selini },
  { name: 'Hack VC', logo: HackVCLogo, link: LINKS.hackVC },
  { name: 'GSR', logo: GsrLogo, link: LINKS.gsr },
  {
    name: 'Jane Street',
    logo: JaneStreetLogo,
    link: LINKS.janeStreet,
  },
  {
    name: 'Dexterity Capital',
    logo: DexterityLogo,
    link: LINKS.dexterity,
  },
  {
    name: 'Collab+Currency',
    logo: CollabLogo,
    link: LINKS.collabCurrency,
  },
  { name: 'HRT', logo: HrtLogo, link: LINKS.hrt },
];
