package com.laudert.backend;

import com.laudert.backend.domain.ERole;
import com.laudert.backend.domain.Role;
import com.laudert.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner createRoles(RoleRepository roleRepository) {
        return args -> {
            for (ERole eRole : ERole.values()) {
                if (!roleRepository.findByName(eRole).isPresent()) {
                    roleRepository.save(new Role(eRole));
                }
            }
        };
    }
}
