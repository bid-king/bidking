/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  rem?: number;
}
export function ProfileImage({ src = '/image/profile.png', rem = 2 }: Props) {
  return (
    <img
      src={src}
      css={{
        borderRadius: '100%',
        width: `${rem}rem`,
        height: `${rem}rem`,
      }}
      onError={e => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = '/image/profile.png';
      }}
    />
  );
}

// div태그로 profile이미지 구현했지만 background 이미지가 짤림
// export function ProfileImage2({
//   imgSrc = '../components/static/test.png',
// }: Props): JSX.Element {
//   return (
//     <div
//       css={{
//         border: '1px solid black',
//         borderRadius: '50%',
//         width: '3.375rem',
//         height: '3.375rem',
//       }}
//     >
//       <div
//         css={{
//           backgroundImage: `url(${imgSrc})`,
//         }}
//       ></div>
//     </div>
//   );
// }
