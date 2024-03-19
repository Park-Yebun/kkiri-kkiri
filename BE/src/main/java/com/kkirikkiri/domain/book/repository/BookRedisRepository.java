package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.dto.StoryResponse;
import org.springframework.data.repository.CrudRepository;

public interface BookRedisRepository extends CrudRepository<StoryResponse, Long> {

}
