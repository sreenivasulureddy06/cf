package com.cf.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cf.managers.impl.HomeManagerImpl;
import com.cf.services.HomeService;

@RestController
public class HomeServiceImpl implements HomeService {
	
	//@Autowired
	//private HomeManagerImpl homeManager;

	@Override
	@PostMapping("/homeContent")
	public String homeContent() {
		return "Home Conetet API!!!!";
	}

}
