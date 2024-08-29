package edu.sabanciuniv.authservice.dto;


import edu.sabanciuniv.authservice.model.Role;
import lombok.Builder;

@Builder
public record AuthResponse<role>(

        String name,
        String username,
        String token,
        String email,
        String refreshToken,
        String message,
        Role role


) {
}
