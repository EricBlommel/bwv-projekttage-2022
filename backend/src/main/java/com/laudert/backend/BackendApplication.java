package com.laudert.backend;

import com.laudert.backend.db.EventEntity;
import com.laudert.backend.db.EventRepository;
import com.laudert.backend.db.UserEntity;
import com.laudert.backend.db.UserRepository;
import org.apache.catalina.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Instant;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

/*    @Bean
    CommandLineRunner commandLineRunner(EventRepository eventRepository, UserRepository userRepository) {
        return args -> {
            UserEntity ebl = new UserEntity(
                "ni31ino23n1onerdi",
                "email",
                "ebl",
                "12345678"
            );

            EventEntity wacken = new EventEntity(
                "nidnio21io23nmm",
                "Wacken",
                Instant.now(),
                "Wacken ist toll",
                ebl
            );

            userRepository.save(ebl);
            eventRepository.save(wacken);

            System.out.println("test");

            userRepository
                .findById("ni31ino23n1onerdi")
                .ifPresentOrElse(
                    System.out::println,
                    () -> System.out.println("User not found"));

            eventRepository
                .findById("nidnio21io23nmm")
                .ifPresentOrElse(
                    System.out::println,
                    () -> System.out.println("event not found"));

        };
    }*/
}
