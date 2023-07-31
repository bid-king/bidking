package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AuctionListSearch {

    private final EntityManager entityManager;

    public List<AuctionRoom> findAllBySearchCondition(AuctionListRequest auctionListRequest) {
        StringBuilder jpqlBuilder = new StringBuilder(
            "SELECT DISTINCT a FROM AuctionRoom a JOIN a.itemList i");

        boolean isFirst = true;
        // 카테고리 적용
        isFirst = applyCategory(auctionListRequest, jpqlBuilder, isFirst);

        // 검색어 적용
        isFirst = applyKeyword(auctionListRequest, jpqlBuilder, isFirst);

        // auctionRoomLiveState가 "OFF_LIVE"가 아닌 경우만 조회
        searchBeforeOrOnlive(jpqlBuilder, isFirst);

        // 경매 시작시간 - 현재 시간으로 오름차순
        jpqlBuilder.append(" ORDER BY FUNCTION('TIMESTAMPDIFF', SECOND, " +
            "CURRENT_TIMESTAMP(), " +
            "FUNCTION('TIMESTAMP', a.startedAt)) ASC");

        TypedQuery<AuctionRoom> query = entityManager.createQuery(jpqlBuilder.toString(),
            AuctionRoom.class);

        // 페이지 네이션 적용
        applyPagination(auctionListRequest, query);

        // 파라미터 적용
        applyCategoryAndKeywordParameter(auctionListRequest, query);

        return query.getResultList();
    }

    public List<AuctionRoom> findAllBySearchConditionOnlyBookmarked(
        AuctionListRequest auctionListRequest, Member member) {
        StringBuilder jpqlBuilder = new StringBuilder(
            "SELECT DISTINCT a FROM AuctionRoom a JOIN a.itemList i");
        jpqlBuilder.append(" LEFT JOIN Bookmark b ON b.auctionRoom = a");

        boolean isFirst = true;
        // 카테고리 적용
        isFirst = applyCategory(auctionListRequest, jpqlBuilder, isFirst);

        // 검색어 적용
        isFirst = applyKeyword(auctionListRequest, jpqlBuilder, isFirst);

        // auctionRoomLiveState가 "OFF_LIVE"가 아닌 경우만 조회
        searchBeforeOrOnlive(jpqlBuilder, isFirst);

        // 북마크 적용
        jpqlBuilder.append(" AND b.isAdded = 1 AND b.member = :member");

        // 경매 시작시간 - 현재 시간으로 오름차순
        jpqlBuilder.append(" ORDER BY FUNCTION('TIMESTAMPDIFF', SECOND, " +
            "CURRENT_TIMESTAMP(), " +
            "FUNCTION('TIMESTAMP', a.startedAt)) ASC");

        TypedQuery<AuctionRoom> query = entityManager.createQuery(jpqlBuilder.toString(),
            AuctionRoom.class);

        // 페이지 네이션 적용
        applyPagination(auctionListRequest, query);

        // 파라미터 적용
        query.setParameter("member", member);
        applyCategoryAndKeywordParameter(auctionListRequest, query);

        return query.getResultList();
    }

    private boolean applyCategory(AuctionListRequest auctionListRequest, StringBuilder jpqlBuilder,
        boolean isFirst) {
        if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList()
            .isEmpty()) {
            jpqlBuilder.append(" WHERE i.itemCategory IN :categoryList");
            isFirst = false;
        }
        return isFirst;
    }

    private boolean applyKeyword(AuctionListRequest auctionListRequest, StringBuilder jpqlBuilder,
        boolean isFirst) {
        if (auctionListRequest.getKeyword() != null && !auctionListRequest.getKeyword().isEmpty()) {
            if (isFirst) {
                jpqlBuilder.append(" WHERE");
                isFirst = false;

            } else {
                jpqlBuilder.append(" AND");
            }
            jpqlBuilder.append(
                " (a.name LIKE :keyword OR i.name LIKE :keyword OR i.description LIKE :keyword)");
        }
        return isFirst;
    }

    private void searchBeforeOrOnlive(StringBuilder jpqlBuilder, boolean isFirst) {
        if (isFirst) {
            jpqlBuilder.append(" WHERE a.auctionRoomLiveState <> 'OFF_LIVE'");
        } else {
            jpqlBuilder.append(" AND a.auctionRoomLiveState <> 'OFF_LIVE'");
        }
    }

    private void applyPagination(AuctionListRequest auctionListRequest,
        TypedQuery<AuctionRoom> query) {
        int page = auctionListRequest.getPage();
        int perPage = auctionListRequest.getPerPage();
        int firstResult = (page - 1) * perPage;
        query.setFirstResult(firstResult);
        query.setMaxResults(perPage);
    }

    private void applyCategoryAndKeywordParameter(AuctionListRequest auctionListRequest,
        TypedQuery<AuctionRoom> query) {
        if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList()
            .isEmpty()) {
            query.setParameter("categoryList", auctionListRequest.getCategoryList());
        }
        if (auctionListRequest.getKeyword() != null && !auctionListRequest.getKeyword().isEmpty()) {
            query.setParameter("keyword", "%" + auctionListRequest.getKeyword() + "%");
        }
    }
}
