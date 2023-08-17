package com.widzard.bidking.bookmark.service;

import com.widzard.bidking.bookmark.dto.request.BookmarkStatusRequest;
import com.widzard.bidking.member.entity.Member;

public interface BookmarkService {

    Long updateBookmark(Member member, BookmarkStatusRequest request);

}
