package com.widzard.bidking.item.dto.request;

import com.widzard.bidking.image.dto.ImageDto;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemUpdateRequest {

    private Long id;

    @NotBlank(message = "상품명을 입력하세요")
    private String itemName;

    @NotNull(message = "카테고리를 선택하세요")
    private Long itemCategoryId;

    @NotNull(message = "시작가를 입력하세요")
    private Long startPrice;

    @NotBlank(message = "설명을 입력하세요")
    private String description;

    @Setter
    @NotNull(message = "순서를 입력하세요")
    private int ordering;

    @NotNull(message = "이미지를 설정하세요")
    private ImageDto imageDto;

//    private InvoiceDto invoice; //TODO invoice 구현 후
}
