package com.example.elearning.auth;

import com.example.elearning.security.JwtService;
import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.exceptions.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthResponse authenticate(AuthRequest request) {
        try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                    .accessToken(jwtToken)
                    .build();

        } catch (AuthenticationException ex) {
            if (repository.findByEmail(request.getEmail()).isEmpty()) {
                throw new UsernameNotFoundException("This email does not exist");
            }else {
                throw new UnauthorizedException("Incorrect password");
            }
        }
    }

}

