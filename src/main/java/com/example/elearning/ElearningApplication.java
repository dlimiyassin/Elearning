package com.example.elearning;

import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.entities.Role;
import com.example.elearning.entities.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ElearningApplication implements CommandLineRunner {
	public static void main(String[] args) {
		SpringApplication.run(ElearningApplication.class, args);
	}

	/*                       setup account for admin                  */
	public ElearningApplication(UserRepository repository,PasswordEncoder passwordEncoder) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
	}
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	@Override
	public void run(String... args) throws Exception {
		if (repository.findByEmail("admin@gmail.com").isEmpty()){
			var user = User.builder()
					.firstname("yassine")
					.lastname("dlimi")
					.email("admin@gmail.com")
					.password(passwordEncoder.encode("1234"))
					.role(Role.ADMIN)
					.build();
			repository.save(user);
		}
	}
}
