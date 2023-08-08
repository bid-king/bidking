package com.widzard.bidking.bookmark.controller;

import com.widzard.bidking.bookmark.dto.request.BookmarkStatusRequest;
import com.widzard.bidking.bookmark.service.BookmarkService;
import com.widzard.bidking.member.entity.Member;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity<?> changeBookmarkStatus(
        @AuthenticationPrincipal Member member,
        @RequestBody @Valid BookmarkStatusRequest request) {
        bookmarkService.updateBookmark(member, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
