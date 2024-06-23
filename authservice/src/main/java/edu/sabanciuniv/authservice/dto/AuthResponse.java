package edu.sabanciuniv.authservice.dto;


import lombok.Builder;

@Builder
public record AuthResponse(

        String token,
        String refreshToken,
        String message


) {
}
