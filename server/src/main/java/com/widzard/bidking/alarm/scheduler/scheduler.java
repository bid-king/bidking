package com.widzard.bidking.alarm.scheduler;

import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
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
    private final AlarmService alarmService;

    @Scheduled(cron = "0 * * * * *")
    public void upcomingAlarm() {
        List<Optional<AuctionRoom>> auctionRoomList = auctionRoomRepository.findUpcomingAuctionRoomList(
            LocalDateTime.now().plusHours(1));
        for (Optional<AuctionRoom> auctionRoom : auctionRoomList
        ) {
            if (auctionRoom.isPresent()) {
                alarmService.sendAuctionUpComingToSeller(auctionRoom.get().getSeller());

                alarmService.sendAuctionUpComingToBookmarkMember(auctionRoom.get());
            }
        }
    }
}
