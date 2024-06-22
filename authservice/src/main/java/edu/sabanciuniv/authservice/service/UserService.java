package edu.sabanciuniv.authservice.service;

import edu.sabanciuniv.authservice.dto.CreateUserRequest;
import edu.sabanciuniv.authservice.model.User;
import edu.sabanciuniv.authservice.repo.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserDetailsService {


    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserById(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public User createUser(CreateUserRequest request) {

        User newUser = new User(request.name(),
                                request.username(),
                                passwordEncoder.encode(request.password()),
                                true,
                                true,
                                true,
                                true,
                                request.authorities()
                                );

        return userRepository.save(newUser);
    }

    public User getUserById(String id){
        return userRepository.getUserById(id);
    }


}
