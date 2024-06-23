package edu.sabanciuniv.authservice.controller;

import edu.sabanciuniv.authservice.dto.AuthRequest;
import edu.sabanciuniv.authservice.dto.CreateUserRequest;
import edu.sabanciuniv.authservice.model.Token;
import edu.sabanciuniv.authservice.model.User;
import edu.sabanciuniv.authservice.service.JwtService;
import edu.sabanciuniv.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {


    private final UserService service;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(UserService service, JwtService jwtService, AuthenticationManager authenticationManager) {

        this.service = service;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    @GetMapping("/welcome")
    public String welcome() {
        return "Hello World! Welcome to the auth service!";
    }

    @PostMapping("/addNewUser")
    public User addUser(@RequestBody CreateUserRequest request) {
        return service.createUser(request);
    }

    @PostMapping("/generateToken")
    public String generateToken(@RequestBody AuthRequest request) {

        try {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.username(), request.password());
            Authentication authentication = authenticationManager.authenticate(authToken);
            log.info("authentication is " + authentication.isAuthenticated());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(request.username());
            }
            log.info("invalid username " + request.username());
            throw new UsernameNotFoundException("invalid username {} " + request.username());
        }catch (Exception e){

            log.error("Error while generating token", e);
            throw e;
        }

    }

    @GetMapping("/user")
    public String getUserString() {
        return "This is USER!";
    }

    @GetMapping("/admin")
    public String getAdminString() {
        return "This is ADMIN!";
    }
}
