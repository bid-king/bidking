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

    public List<AuctionRoom> findAllBySearchCondition(AuctionListRequest auctionListRequest){
        StringBuilder jpqlBuilder = new StringBuilder("select distinct a from AuctionRoom a");

        //카테고리 적용
        if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList().isEmpty()) {
            jpqlBuilder.append(" left join fetch a.itemList i where i.itemCategory.id in :categoryList");
        } else {
            jpqlBuilder.append(" left join fetch a.itemList");
        }

        // 검색어 적용
        if (auctionListRequest.getKeyword() != null && !auctionListRequest.getKeyword().isEmpty()) {
            jpqlBuilder.append(" where");
            if (auctionListRequest.getCategoryList() != null && !auctionListRequest.getCategoryList().isEmpty()) {
                jpqlBuilder.append(" (a.name like :keyword or i.name like :keyword or i.description like :keyword)");
            } else {
                jpqlBuilder.append(" (a.name like :keyword or a.itemList.name like :keyword or a.itemList.description like :keyword)");
            }
        }

        // 내림차순 정렬
        jpqlBuilder.append(" order by a.id desc");

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
