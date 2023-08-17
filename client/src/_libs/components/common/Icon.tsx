/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { HTMLAttributes } from 'react';

export function Icon({ type, color, rem = '1' }: Props) {
  return (
    <span
      css={{
        display: 'inline-block',
        width: `${rem}rem`,
        height: `${rem}rem`,
        '& svg, path': {
          fill: COLOR_VARIANT[color],
          width: `${rem}rem`,
          height: `${rem}rem`,
        },
      }}
      dangerouslySetInnerHTML={{ __html: ICON_URL[type] }}
    />
  );
}

const COLOR_VARIANT = {
  light: colors.black,
  dark: colors.white,
  black: colors.black,
  white: colors.white,
  lightgrey: colors.lightgrey,
  confirm: colors.confirm,
  warn: colors.warn,
  progress: colors.progress,
  ok: colors.ok,
};

const ICON_URL = {
  arrowRight:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M321-48 218-151l329-329-329-329 103-103 432 432L321-48Z"/></svg>',
  check:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-208 122-468l90-90 170 170 366-366 90 90-456 456Z"/></svg>',
  confirm:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M479.85-66Q434-66 401.5-98.65q-32.5-32.651-32.5-78.5 0-45.85 32.65-78.35 32.651-32.5 78.5-32.5 45.85 0 78.35 32.65 32.5 32.651 32.5 78.5 0 45.85-32.65 78.35Q525.699-66 479.85-66ZM385-368v-518h190v518H385Z"/></svg>',
  gavel:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M112-59v-95h526v95H112Zm253-194L106-511l117-118 260 258-118 118Zm296-297L403-810l118-116 259 258-119 118Zm163 430L270-674l88-89 554 555-88 88Z"/></svg>',
  hamburger:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M86-191v-126h788v126H86Zm0-226v-126h788v126H86Zm0-226v-126h788v126H86Z"/></svg>',
  img: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M212-86q-53 0-89.5-36.5T86-212v-536q0-53 36.5-89.5T212-874h536q53 0 89.5 36.5T874-748v536q0 53-36.5 89.5T748-86H212Zm0-126h536v-536H212v536Zm11-56h514L570-500 450-340l-90-120-137 192Zm-11 56v-536 536Z"/></svg>',
  more: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480.5-114q-39.5 0-67.5-27.906T385-209q0-39.6 27.906-67.8Q440.812-305 480-305q40 0 67.5 28.075t27.5 67.5Q575-170 547.5-142t-67 28Zm0-271q-39.5 0-67.5-27.906T385-480q0-40 27.906-67.5T480-575q40 0 67.5 27.5t27.5 67q0 39.5-27.5 67.5t-67 28Zm0-270q-39.5 0-67.5-28.283t-28-68Q385-791 412.906-818.5T480-846q40 0 67.5 27.5t27.5 67.217q0 39.717-27.5 68T480.5-655Z"/></svg>',
  noti: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>',
  question:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M408-325q0-101 20-148.5t70-83.5q37-26 53.5-49.5T568-662q0-32-22-53.5T489-737q-42 0-70.5 26.5T378-640l-151-64q28-85 95-138.5T489-896q117 0 180 67.5T732-665q0 66-21.5 110T641-470q-45 38-56.5 63T573-325H408Zm81 283q-46 0-78-32t-32-78q0-46 32-78.5t78-32.5q46 0 78.5 32.5T600-152q0 46-32.5 78T489-42Z"/></svg>',
  search:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M782-82 523-341q-29 20-67.5 32T372-297q-118 0-200.5-82.5T89-580q0-118 82.5-200.5T372-863q118 0 200.5 82.5T655-580q0 46-12 83.5T611-431l260 261-89 88ZM372-423q66 0 111.5-45.5T529-580q0-66-45.5-111.5T372-737q-66 0-111.5 45.5T215-580q0 66 45.5 111.5T372-423Z"/></svg>',
  send: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M89-128v-704l831 352L89-128Zm111-167 437-185-437-185v110l255 75-255 75v110Zm0 0v-370 370Z"/></svg>',
  shorten:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m296-314-88-88 272-272 272 272-88 88-184-184-184 184Z"/></svg>',
  starFilled:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m183-11 79-338L-1-577l346-29 135-319 135 319 346 29-263 228 79 338-297-180L183-11Z"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg>',
  unable:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-168-88-88 224-224-224-224 88-88 224 224 224-224 88 88-224 224 224 224-88 88-224-224-224 224Z"/></svg>',
};
interface Props extends HTMLAttributes<HTMLDivElement> {
  color: 'light' | 'dark' | 'black' | 'white' | 'lightgrey' | 'confirm' | 'warn' | 'progress' | 'ok';
  rem?: string;
  type:
    | 'arrowRight'
    | 'check'
    | 'confirm'
    | 'gavel'
    | 'hamburger'
    | 'img'
    | 'more'
    | 'noti'
    | 'question'
    | 'search'
    | 'send'
    | 'shorten'
    | 'starFilled'
    | 'star'
    | 'unable';
}
