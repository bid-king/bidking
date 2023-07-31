package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
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
        StringBuilder jpqlBuilder = new StringBuilder("SELECT DISTINCT a FROM AuctionRoom a JOIN a.itemList i");

        // 카테고리 적용
        if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList().isEmpty()) {
            jpqlBuilder.append(" WHERE i.itemCategory IN :categoryList");
        }

        // 검색어 적용
        if (auctionListRequest.getKeyword() != null && !auctionListRequest.getKeyword().isEmpty()) {
            if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList().isEmpty()) {
                jpqlBuilder.append(" AND");
            } else {
                jpqlBuilder.append(" WHERE");
            }
            jpqlBuilder.append(" (a.name LIKE :keyword OR i.name LIKE :keyword OR i.description LIKE :keyword)");
        }

        // auctionRoomLiveState가 "OFF_LIVE"가 아닌 경우만 조회
        jpqlBuilder.append(" AND a.auctionRoomLiveState <> 'OFF_LIVE'");

        // 경매 시작시간 - 현재 시간으로 오름차순
        jpqlBuilder.append(" ORDER BY FUNCTION('TIMESTAMPDIFF', SECOND, " +
            "CURRENT_TIMESTAMP(), " +
            "FUNCTION('TIMESTAMP', a.startedAt)) ASC");

        TypedQuery<AuctionRoom> query = entityManager.createQuery(jpqlBuilder.toString(), AuctionRoom.class);

        // 페이지 네이션 적용
        int page = auctionListRequest.getPage();
        int perPage = auctionListRequest.getPerPage();
        int firstResult = (page - 1) * perPage;
        query.setFirstResult(firstResult);
        query.setMaxResults(perPage);

        // 파라미터 적용
        if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList().isEmpty()) {
            query.setParameter("categoryList", auctionListRequest.getCategoryList());
        }
        if (auctionListRequest.getKeyword() != null && !auctionListRequest.getKeyword().isEmpty()) {
            query.setParameter("keyword", "%" + auctionListRequest.getKeyword() + "%");
        }

        return query.getResultList();
    }

}
