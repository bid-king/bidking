package com.widzard.bidking.alarm.scheduler;

import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.alarm.service.AlarmServiceImpl;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.bookmark.repository.BookmarkRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
public class scheduler {

    private final AuctionRoomRepository auctionRoomRepository;
    private final BookmarkRepository bookmarkRepository;
    private final AlarmService alarmService;

    @Scheduled(cron = "0 * * * * *")
    public void upcomingAlarm() {
        List<Optional<AuctionRoom>> auctionRoomList = auctionRoomRepository.findUpcomingAuctionRoomList(
            LocalDateTime.now().plusHours(1));
        for (Optional<AuctionRoom> auctionRoom : auctionRoomList
        ) {
            if (auctionRoom.isPresent()) {
                //등록한 경매가 곧 시작됨을 알림(판매자)
                alarmService.send(auctionRoom.get().getSeller(), Content.AUCTION_UPCOMING,
                    AlarmType.AUCTION);

                //해당 경매가 곧 시작됨을 알림(구매자)
                List<Optional<Bookmark>> bookmarkList = bookmarkRepository.findBookmarkByAuctionRoom(
                    auctionRoom.get());
                for (Optional<Bookmark> bookmark : bookmarkList
                ) {
                    alarmService.send(bookmark.get().getMember(), Content.AUCTION_UPCOMING_BOOKMARK,
                        AlarmType.AUCTION);
                }
            }
        }
    }
}
