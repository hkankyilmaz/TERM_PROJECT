package edu.sabanciuniv.authservice.dto;

import edu.sabanciuniv.authservice.model.Role;
import lombok.Builder;

import java.util.Set;

@Builder
public record CreateUserRequest(
        String name,
        String username,
        String password,
        Set<Role> authorities
){
}
