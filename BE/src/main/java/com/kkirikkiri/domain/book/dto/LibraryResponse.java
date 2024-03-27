package com.kkirikkiri.domain.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LibraryResponse {

    private String title;
    private String author;
    private String summary;
    private String imageURL;
    private Integer download;
    private String date;
    private Boolean possession;

}
