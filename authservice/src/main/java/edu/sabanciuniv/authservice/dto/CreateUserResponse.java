package edu.sabanciuniv.authservice.dto;

import lombok.Builder;
import org.springframework.http.HttpStatus;


@Builder
public record CreateUserResponse(
        HttpStatus httpStatus,
        AuthResponse authResponse
) {
}
