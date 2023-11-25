package com.widzard.bidking.auction.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import static org.springframework.util.StringUtils.isEmpty;
import static com.widzard.bidking.bookmark.entity.QBookmark.bookmark;
import static com.widzard.bidking.auction.entity.QAuctionRoom.auctionRoom;
import static com.widzard.bidking.item.entity.QItem.item;

@Slf4j
@Repository
@RequiredArgsConstructor
public class AuctionListSearch {

    private final JPAQueryFactory queryFactory;

    public Page<AuctionRoom> findAllBySearchCondition(AuctionListRequest auctionListRequest, Pageable pageable){
        List<AuctionRoom> auctionRoomList = queryFactory
            .select(auctionRoom)
            .distinct()
            .from(auctionRoom)
            .join(auctionRoom.itemList, item)
            .where(categoryEqual(auctionListRequest.getCategoryList()),
                keywordEqual(auctionListRequest.getKeyword()),
                auctionRoom.auctionRoomLiveState.ne(AuctionRoomLiveState.valueOf("OFF_LIVE")))
            .orderBy(getLongOrderSpecifier())
            .offset(auctionListRequest.getPage())
            .limit(auctionListRequest.getPerPage())
            .fetch();

        JPAQuery<AuctionRoom> countQuery = fetchCount(auctionListRequest);
        return PageableExecutionUtils.getPage(auctionRoomList, pageable , countQuery::fetchCount);
    }

    public Page<AuctionRoom> findAllBySearchConditionOnlyBookmarked(AuctionListRequest auctionListRequest, Member member,
        Pageable pageable){
            List<AuctionRoom> auctionRoomList = queryFactory
                .select( auctionRoom)
                .distinct()
                .from(auctionRoom)
                .join(auctionRoom.itemList, item)
                .leftJoin(bookmark).on(bookmark.auctionRoom.eq(auctionRoom))
                .where(categoryEqual(auctionListRequest.getCategoryList()),
                    keywordEqual(auctionListRequest.getKeyword()),
                    auctionRoom.auctionRoomLiveState.ne(AuctionRoomLiveState.valueOf("OFF_LIVE")),
                    bookmark.isAdded.isTrue().and(bookmark.member.eq(member))
                )
                .orderBy(getLongOrderSpecifier())
                .offset(auctionListRequest.getPage())
                .limit(auctionListRequest.getPerPage())
                .fetch();

        JPAQuery<AuctionRoom> countQuery = fetchCountWithBookmark(auctionListRequest, member);
        return PageableExecutionUtils.getPage(auctionRoomList, pageable , countQuery::fetchCount);
    }

    private JPAQuery<AuctionRoom> fetchCount(AuctionListRequest auctionListRequest) {
        return queryFactory
            .select(auctionRoom)
            .from(auctionRoom)
            .join(auctionRoom.itemList, item)
            .where(categoryEqual(auctionListRequest.getCategoryList()),
                keywordEqual(auctionListRequest.getKeyword()),
                auctionRoom.auctionRoomLiveState.ne(AuctionRoomLiveState.valueOf("OFF_LIVE")));
    }

    private JPAQuery<AuctionRoom> fetchCountWithBookmark(AuctionListRequest auctionListRequest, Member member) {
        return queryFactory
            .select(auctionRoom)
            .from(auctionRoom)
            .join(auctionRoom.itemList, item)
            .leftJoin(bookmark).on(bookmark.auctionRoom.eq(auctionRoom))
            .where(categoryEqual(auctionListRequest.getCategoryList()),
                keywordEqual(auctionListRequest.getKeyword()),
                auctionRoom.auctionRoomLiveState.ne(AuctionRoomLiveState.valueOf("OFF_LIVE")),
                bookmark.isAdded.isTrue().and(bookmark.member.eq(member)));
    }

    private OrderSpecifier<Long> getLongOrderSpecifier() {
        return Expressions
            .numberTemplate(Long.class,
                "FUNCTION('TIMESTAMPDIFF', SECOND, CURRENT_TIMESTAMP(), FUNCTION('TIMESTAMP', started_at))")
            .asc();
    }

    private BooleanExpression categoryEqual(List<Long> categoryList) {
        if (categoryList == null || categoryList.isEmpty()) {
            // categoryList가 비어있을 때 전체 카테고리 적용
            return item.itemCategory.id.in(1L, 2L, 3L, 4L, 5L, 6L);
        } else {
            return item.itemCategory.id.in(categoryList);
        }
    }

    private BooleanExpression keywordEqual(String keyword){
        if (isEmpty(keyword)) {
            return null;
        } else {
            return auctionRoom.name.contains(keyword)
                .or(item.name.contains(keyword))
                .or(item.description.contains(keyword));
        }
    }
}
