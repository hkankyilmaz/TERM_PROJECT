package edu.sabanciuniv.authservice.dto;

public record AuthRequest (
        String username,
        String password
){
}