import calFriendImage from '../../assets/projects/calFriend.webp';
import myPrImage from '../../assets/projects/myPr.webp';
import olyImage from '../../assets/projects/oly.webp';
import omriAssociationImage from '../../assets/projects/omriAssociation.webp';
import smallBitesImage from '../../assets/projects/smallBites.webp';
import wiseNoteTakerImage from '../../assets/projects/wiseNoteTaker.webp';
import type { ProjectName } from './projects';

export const projectImages: Record<ProjectName, string> = {
  oly: olyImage,
  myPr: myPrImage,
  omriAssociation: omriAssociationImage,
  calFriend: calFriendImage,
  smallBites: smallBitesImage,
  wiseNoteTaker: wiseNoteTakerImage,
};
