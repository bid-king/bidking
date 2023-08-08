package com.widzard.bidking.bookmark.service;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.bookmark.dto.request.BookmarkStatusRequest;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.bookmark.repository.BookmarkRepository;
import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final AuctionRoomRepository auctionRoomRepository;

    @Override
    @Transactional
    public Long updateBookmark(Member member, BookmarkStatusRequest request) {
        long auctionRoomId = Long.parseLong(request.getAuctionRoomId());
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId)
            .orElseThrow(() -> new AuctionRoomNotFoundException());

        Optional<Bookmark> savedBookmark = bookmarkRepository.findBookmarkByMemberAndAuctionRoom(
            member, auctionRoom);

        if (savedBookmark.isPresent()) {
            savedBookmark.get().changeStatus();
        } else {
            Bookmark bookmark = Bookmark.createBookmark(member, auctionRoom);
            bookmarkRepository.save(bookmark);
        }
        return auctionRoom.getId();
    }
}
