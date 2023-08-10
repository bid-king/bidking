/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import auction, { AuctionRoomResponse } from '../../api/auction';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export function useSellerDetail() {
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);

  const [detail, setDetail] = useState<AuctionRoomResponse | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isChecked, setChecked] = useState(false);
  const { isLogined, accessToken } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleCheck = () => {
    setChecked(!isChecked);
  };

  const handleDelete = () => {
    auction
      .delete(auctionId, accessToken)
      .then(() => {
        navigate('/seller');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    auction
      .get(auctionId)
      .then(data => {
        setDetail(data);
      })
      .catch(err => setError(err));
  }, [auctionId]);

  return {
    params,
    auctionId,
    detail,
    error,
    isLogined,
    handleCheck,
    handleDelete,
    isChecked,
  };
}
