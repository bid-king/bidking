/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { ProfileImage } from '../common/ProfileImage';
import { Link } from 'react-router-dom';
import { Spacing } from '../common/Spacing';
import member from '../../../api/member';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUserInformation } from '../../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { DashBoard } from '../common/DashBoard';
import order, { DashBoardResponce } from '../../../api/order';
import seller, { SellerDashBoardResponce } from '../../../api/seller';

export function NavBarModal({ theme = 'light' }: Props) {
  const { isLogined, accessToken, id, nickname } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<SellerDashBoardResponce | DashBoardResponce | null>(null);

  const handleLogout = () => {
    if (isLogined) {
      member
        .logout(accessToken)
        .then(() => {
          const logOutState = { id: null, accessToken: '', isLogined: false, nickname: '', refreshToken: '' };
          dispatch(setUserInformation(logOutState));
          navigate('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // 구매자 대쉬보드
  useEffect(() => {
    if (id && isLogined && theme === 'light') {
      order
        .getStatus(id, accessToken)
        .then(res => {
          setStatus(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [theme]);

  // 판매자 대쉬보드
  useEffect(() => {
    if (id && isLogined && theme === 'dark') {
      seller
        .getStatus(id, accessToken)
        .then(res => {
          setStatus(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [theme]);

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
        <Text type="h2" content={nickname} />
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
        <DashBoard
          theme={theme}
          type="small"
          deliveryWaiting={status?.deliveryWaiting}
          paymentWaiting={status?.paymentWaiting}
          penalty={status?.penalty}
        />
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

        <Link to={`/purchased/${id}`}>
          <Text type="bold" content="구매내역" />
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
