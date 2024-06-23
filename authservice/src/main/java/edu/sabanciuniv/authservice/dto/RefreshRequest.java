package edu.sabanciuniv.authservice.dto;


import lombok.Builder;

@Builder
public record RefreshRequest (
        String refreshToken,
        String username
) {
}
