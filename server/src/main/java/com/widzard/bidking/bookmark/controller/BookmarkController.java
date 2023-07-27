package com.widzard.bidking.bookmark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {


    @GetMapping
    public ResponseEntity<String> getBookmarkedAuctions() {
        return new ResponseEntity<>("getBookmarkedAuctions", HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> saveBookmark() {
        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Integer> deleteBookmark() {
        return new ResponseEntity<>(1, HttpStatus.OK);
    }

}
