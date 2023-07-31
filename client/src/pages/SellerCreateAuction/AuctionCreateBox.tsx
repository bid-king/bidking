/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent } from 'react';
import colors from '../../_libs/design/colors';
import { Text } from '../../_libs/components/common/Text';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Input } from '../../_libs/components/common/Input';
import { AuctionCreateCard } from '../../_libs/components/auctionCreate/AuctionCreateCard';
import { RoundButton } from '../../_libs/components/common/RoundButton';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';

interface Props {}

export function AuctionCreate() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div
      css={{
        width: '50rem',
        borderRadius: '0.5rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.backgroundDark2,
        color: colors.white,
      }}
    >
      <Text type="h2" content="경매 등록"></Text>
      <Spacing rem="2" />
      <div
        css={{
          padding: '0.5rem',
        }}
      >
        <div className="title">
          <label htmlFor="title-input">
            <Text type="bold" content="경매 제목을 입력하세요" />
          </label>
          <Spacing rem="1" />
          <Input id="title-input" placeholder="" inputType="title" />
        </div>
        <Spacing rem="2" />

        <div className="date">
          <label htmlFor="date-input">
            <Text type="bold" content="경매 날짜와 시간을 선택하세요" />
          </label>
          <Spacing rem="1" />
          <Input id="date-input" placeholder="" inputType="date" />
        </div>
        <Spacing rem="2" />

        <div className="auction-method-check">
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="bold" content="경매 방식을 선택하세요" />
            <Spacing rem="1" dir="h" />
            물음표
          </div>
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="p" content="일반경매" />
            <Spacing rem="1" dir="h" />
            <input type="checkbox" name="" id="" />
          </div>
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="p" content="네덜란드" />
            <Spacing rem="1" dir="h" />
            <input type="checkbox" name="" id="" />
          </div>
        </div>
        <Spacing rem="2" />

        <div className="auction-image">
          <Text type="bold" content="경매 정보를 알려줄 수 있는 썸네일을 등록하세요" />
          <Spacing rem="1" />
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <p>Selected image: {image.name}</p>}
          </div>
        </div>
        <Spacing rem="2" />

        <div className="auction-confirm-check">
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="bold" content="경매할 상품과 순서를 입력하세요." />
            <Spacing rem="1" dir="h" />
          </div>
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
              color: colors.warn,
              alignItems: 'center',
            }}
          >
            <Text type="p" content="경매 금지 품목과 관련 규정을 숙지하였습니다." />
            <Spacing rem="1" dir="h" />
            물음표
            <Spacing rem="1" dir="h" />
            <input type="checkbox" name="" id="" />
          </div>
          <div
            css={{
              display: 'flex',
              color: colors.warn,
              alignItems: 'center',
            }}
          >
            <Text type="p" content="상품이 낙찰되면 +n일까지 상품을 발송하고, 송장번호를 낙찰자에게 제공하겠습니다." />
            <Spacing rem="1" dir="h" />
            물음표
            <Spacing rem="1" dir="h" />
            <input type="checkbox" name="" id="" />
          </div>
        </div>

        <Spacing rem="2" />
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <RoundButton color="white" size="large" label="물품 추가" />
          <ConfirmButton btnType="certification" />
        </div>
        <Spacing rem="2" />

        <AuctionCreateCard
          theme="dark"
          item={{
            itemId: '1',
            itemName: '낙찰된 상품명',
            category: '카테고리',
            itemImage: 'img src',
            itemDescription: '상품 설명',
            itemOrdering: '1',
            paymentState: 'PAYMENT_OK',
            successTime: '2023-03-03 22:00:00',
            successPrice: '4000',
            successMemberNickname: '윤다정',
            deliveryAddress: '서울시 우리 집',
            deliveryMsg: '잘 보내주세요',
            invoice: { courier: 'LOGEN', invoiceNumber: '1313242435354646' },
          }}
        />
      </div>
    </div>
  );
}
