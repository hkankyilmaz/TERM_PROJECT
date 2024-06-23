package edu.sabanciuniv.authservice.controller;

import edu.sabanciuniv.authservice.dto.AuthRequest;
import edu.sabanciuniv.authservice.dto.AuthResponse;
import edu.sabanciuniv.authservice.dto.CreateUserRequest;
import edu.sabanciuniv.authservice.dto.RefreshRequest;
import edu.sabanciuniv.authservice.model.User;
import edu.sabanciuniv.authservice.service.JwtService;
import edu.sabanciuniv.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {

    private final UserService service;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthenticationController(UserService service, JwtService jwtService, AuthenticationManager authenticationManager, UserService userService) {

        this.service = service;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }


    @GetMapping("/welcome")
    public String welcome() {
        return "Hello World! Welcome to the auth service!";
    }

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody CreateUserRequest request) {

        HttpStatus status = service.createUser(request);
        String message = status == HttpStatus.CREATED ? "User created successfully" : "Error while creating user";

        return new ResponseEntity<>(message, status);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> generateToken(@RequestBody AuthRequest request) {

        try {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.username(), request.password());
            Authentication authentication = authenticationManager.authenticate(authToken);
            log.info("authentication is " + authentication.isAuthenticated());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            if (authentication.isAuthenticated()) {

                String token = jwtService.generateToken(request.username());
                String refToken = jwtService.generateRefreshToken(request.username());
                String message = "Token and Refresh Token generated successfully";

                AuthResponse authResponse = AuthResponse.builder()
                        .token(token)
                        .refreshToken(refToken)
                        .message(message)
                        .build();

                return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
            }
            log.info("invalid username " + request.username());
            throw new UsernameNotFoundException("invalid username {} " + request.username());
        } catch (Exception e) {
            String message = "Error while generating token";
            log.error(message, e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshRequest request) {

        try {
            UserDetails user = userService.loadUserByUsername(jwtService.extractUser(request.refreshToken()));
            if (jwtService.validateRefreshToken(request.refreshToken(), user)) {
                String token = jwtService.generateToken(jwtService.extractUser(request.refreshToken()));
                String refToken = jwtService.generateRefreshToken(jwtService.extractUser(request.refreshToken()));
                String message = "Token and Refresh Token generated successfully";

                AuthResponse authResponse = AuthResponse.builder()
                        .token(token)
                        .refreshToken(refToken)
                        .message(message)
                        .build();

                return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
            }
            throw new Exception("Invalid refresh token");
        } catch (Exception e) {
            String message = "Error while generating token";
            log.error(message, e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    @GetMapping("/user")
    public String getUserString() {
        return "This is USER!";
    }
//
//    @GetMapping("/admin")
//    public String getAdminString() {
//        return "This is ADMIN!";
//    }
}
