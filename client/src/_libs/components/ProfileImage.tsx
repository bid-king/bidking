/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc?: string;
  myWidth: string;
  myHeight: string;
}
export function ProfileImage({ imgSrc = '/image/profile.png', myWidth = '3.375rem', myHeight = '3.375rem' }: Props) {
  return (
    <img
      src={imgSrc}
      css={{
        borderRadius: '50%',
        width: `${myWidth}`,
        height: `${myHeight}`,
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
