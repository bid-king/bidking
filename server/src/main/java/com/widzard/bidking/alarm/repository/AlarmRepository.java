package com.widzard.bidking.alarm.repository;

import com.widzard.bidking.alarm.entity.Alarm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findTop5ByMemberIdOrderByCreatedAtDesc(Long memberId);

}
