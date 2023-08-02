/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../_libs/design/colors';
import { Text } from '../../_libs/components/common/Text';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Input } from '../../_libs/components/common/Input';
import { AuctionCreateCard } from '../../_libs/components/auctionCreate/AuctionCreateCard';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import { QuestionModal } from '../../_libs/components/auctionCreate/QuestionModal';
import { Checkbox } from '../../_libs/components/common/Checkbox';
import { useAuctionCreateBox } from '../../_libs/hooks/useAuctionCreateBox';
import { RadioButton } from '../../_libs/components/common/RadioButton';

export function AuctionCreateBox() {
  const {
    auctionRoomType,
    itemPermissionChecked,
    deliveryRulesChecked,
    handleAuctionTitle,
    handleStartedAt,
    handleAuctionRoomType,
    handleItemPermissionChecked,
    handleDeliveryRulesChecked,
    image,
    itemList,
    addItem,
    handleImageChange,
    createAuction,
  } = useAuctionCreateBox();

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
        <div className="auctionTitle">
          <label htmlFor="auctionTitle-input">
            <Text type="bold" content="경매 제목을 입력하세요" />
          </label>
          <Spacing rem="1" />
          <Input id="auctionTitle-input" placeholder="" inputType="text" onChange={handleAuctionTitle} />
        </div>
        <Spacing rem="2" />

        <div className="startedAt">
          <label htmlFor="startedAt-input">
            <Text type="bold" content="경매 날짜와 시간을 선택하세요" />
          </label>
          <Spacing rem="1" />
          <Input id="startedAt-input" placeholder="" inputType="datetime-local" onChange={handleStartedAt} />
        </div>
        <Spacing rem="2" />

        <div className="auctionRoomType">
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text type="bold" content="경매 방식을 선택하세요" />
            <Spacing rem="1" dir="h" />
            <div
              css={{
                marginTop: '0.2rem',
              }}
            >
              <QuestionModal
                content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
              />
            </div>
          </div>
          <Spacing rem="1" />
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="p" content="일반경매" />
            <Spacing rem="1" dir="h" />
            <RadioButton
              name="auctionRoomType"
              value="GENERAL"
              checkedValue={auctionRoomType}
              onChange={handleAuctionRoomType}
            />
          </div>
          <div
            css={{
              display: 'flex',
            }}
          >
            <Text type="p" content="네덜란드" />
            <Spacing rem="1" dir="h" />
            <RadioButton
              name="auctionRoomType"
              value="REVERSE"
              checkedValue={auctionRoomType}
              onChange={handleAuctionRoomType}
            />
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
            className="itemPermissionChecked"
            css={{
              display: 'flex',
              color: colors.warn,
              alignItems: 'center',
            }}
          >
            <Text type="p" content="경매 금지 품목과 관련 규정을 숙지하였습니다." />
            <Spacing rem="1" dir="h" />
            <div
              css={{
                marginTop: '0.2rem',
              }}
            >
              <QuestionModal
                content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
              />
            </div>
            <Spacing rem="1" dir="h" />
            <div
              css={{
                paddingTop: '0.5rem',
              }}
            >
              <Checkbox
                theme="light"
                id="itemPermissionChecked"
                value="itemPermissionChecked"
                onChange={handleItemPermissionChecked}
              />
            </div>
          </div>
          <div
            className="deliveryRulesChecked"
            css={{
              display: 'flex',
              color: colors.warn,
              alignItems: 'center',
            }}
          >
            <Text type="p" content="상품이 낙찰되면 +n일까지 상품을 발송하고, 송장번호를 낙찰자에게 제공하겠습니다." />
            <Spacing rem="1" dir="h" />
            <div
              css={{
                marginTop: '0.2rem',
              }}
            >
              <QuestionModal
                content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
              />
            </div>
            <Spacing rem="1" dir="h" />
            <div
              css={{
                paddingTop: '0.5rem',
              }}
            >
              <Checkbox
                theme="light"
                id="deliveryRulesChecked"
                value="deliveryRulesChecked"
                onChange={handleDeliveryRulesChecked}
              />
            </div>
          </div>
        </div>

        <Spacing rem="2" />
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ConfirmButton label="물품추가" onClick={addItem} />
        </div>
        <Spacing rem="2" />

        {itemList.map((item, index) => {
          return (
            <div key={item}>
              <AuctionCreateCard ordering={itemList.length - index} />
              <Spacing rem="2" />
            </div>
          );
        })}
        {itemPermissionChecked && deliveryRulesChecked ? (
          <ConfirmButton btnType="confirm" label="경매등록" onClick={createAuction} />
        ) : (
          <ConfirmButton btnType="disabled" label="경매등록" />
        )}
      </div>
    </div>
  );
}
