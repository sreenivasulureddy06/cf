package com.cf;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringAndReactApplication {

	private final static Logger LOGGER = LoggerFactory.getLogger(SpringAndReactApplication.class.getClass());
	
	public static void main(String[] args) {
		LOGGER.debug("Start the application");
		SpringApplication.run(SpringAndReactApplication.class, args);
	}
}
