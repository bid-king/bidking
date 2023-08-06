package com.widzard.bidking.alarm.repository;

import com.widzard.bidking.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

}
