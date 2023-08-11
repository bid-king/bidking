/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import auction, { SellerAuctionDetail } from '../../api/auction';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export function useSellerDetailOffLive() {
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);
  const data: SellerAuctionDetail = {
    id: 3,
    sellerId: 2,
    name: '사장님이 미쳤어요! 아이패드 300원!!',
    startedAt: '2023-08-22T14:55:11',
    auctionRoomLiveState: 'OFF_LIVE',
    auctionRoomType: 'COMMON',
    sellerNickname: 'ㅁㄴㅇㅇ',
    imageURL:
      'https://demo-userdata-ec2-ehdgus.s3.ap-northeast-2.amazonaws.com/a171b44b-901c-4e22-a301-71a1975baa43__be5f4a17-c200-4106-8842-49e369a3a8a6.jpg',
    itemList: [
      {
        itemId: 1,
        itemName: '아이패드11',
        category: '패션',
        price: 2222222222222,
        itemImageUrl:
          'https://demo-userdata-ec2-ehdgus.s3.ap-northeast-2.amazonaws.com/92d5afdd-0d14-4515-beee-730ff6897871__120fc98a-7760-4c6f-94e1-e9c3c79477ed.jpg',
        itemDescription: '설명은 생략한다',
        itemOrdering: 1,
        successTime: null,
        successMemberId: null,
        successMemberNickname: null,
        deliveryAddress: '안녕하세요경기도의정부시',
        deliveryMsg: null,
        orderState: 'DELIVERING',
      },
      {
        itemId: 2,
        itemName: '아이패드22',
        category: '패션',
        price: 33333333333333,
        itemImageUrl:
          'https://demo-userdata-ec2-ehdgus.s3.ap-northeast-2.amazonaws.com/d2f1c8d5-b89e-4337-a32e-a1f1d3049d51__a69ea2b9-0b24-4cf0-9868-1324f9b7a47f.jpg',
        itemDescription: '설명은 생략한다2',
        itemOrdering: 2,
        successTime: null,
        successMemberId: null,
        successMemberNickname: null,
        deliveryAddress: null,
        deliveryMsg: null,
        orderState: 'COMPLETED',
      },
    ],
  };
  const [detail, setDetail] = useState<SellerAuctionDetail | null>(data);
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
      .getSeller(auctionId)
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
