/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { ProfileImage } from '../common/ProfileImage';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { Spacing } from '../common/Spacing';
import member from '../../../api/member';
import { useAppDispatch } from '../../../store/hooks';
import { setUserInformation } from '../../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export function NavBarModal({ theme = 'light' }: Props) {
  const id = useAppSelector(state => state.user.id);
  const isLogined = useAppSelector(state => state.user.isLogined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (isLogined) {
      member.logout;
      dispatch(setUserInformation({ id: null, accessToken: '', isLogined: false, nickname: '' }));
      navigate('/');
    }
  };
  return (
    <div
      css={{
        margin: '1rem',
        borderRadius: '0.5rem',
        padding: '1rem',
        ...THEME_VARIANT[theme],
      }}
    >
      <div
        className="nickName"
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text type="h2" content="NickName" />
      </div>
      <Spacing rem="1" />
      <div
        className="dashBoard"
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        대쉬보드 컴포넌트
      </div>
      <Spacing rem="1" />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link to={`/mypage/${id}`}>
          <Text type="bold" content="개인정보 수정" />
        </Link>
        <Spacing rem="1" />

        <div
          css={{
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          <Text type="bold" content="로그아웃" />
        </div>
      </div>
    </div>
  );
}

interface Props {
  theme: 'light' | 'dark';
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.backgroundLight}`,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};
