package com.progettotweb.springbootserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringbootserverApplication is the main entry point for the Spring Boot application.
 * It is annotated with @SpringBootApplication, which is a convenience annotation that adds all of the following:
 */
@SpringBootApplication
public class SpringbootserverApplication {

    /**
     * The main method which serves as the entry point for the application.
     * It delegates to Spring Boot's SpringApplication class by calling run.
     * SpringApplication bootstraps our application, starting Spring which, in turn, starts the auto-configured Tomcat web server.
     *
     * @param args an array of command-line arguments passed to the application
     */
    public static void main(String[] args) {
        SpringApplication.run(SpringbootserverApplication.class, args);
    }

}