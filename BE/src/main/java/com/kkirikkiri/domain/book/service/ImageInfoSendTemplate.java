package com.kkirikkiri.domain.book.service;

import com.kkirikkiri.domain.book.dto.ImageRequest;
import com.kkirikkiri.domain.book.dto.ImageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageInfoSendTemplate {

    @Value("${myapp.fastApi.endpoint}")
    private String fastApiEndpoint;

    public void sendGenerateImageRequest(ImageRequest imageRequest) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ImageRequest> requestEntity = new HttpEntity<>(imageRequest, headers);

        restTemplate.exchange(fastApiEndpoint, HttpMethod.POST, requestEntity, ImageResponse.class);
    }
}
