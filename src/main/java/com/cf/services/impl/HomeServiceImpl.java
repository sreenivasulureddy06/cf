package com.cf.services.impl;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cf.managers.impl.HomeManagerImpl;
import com.cf.response.SubmitRespose;
import com.cf.resquest.SubmitRequest;
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
	
	@PostMapping(value="/submit/request", consumes={"application/json"}, produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public SubmitRespose submitRequest(@RequestBody SubmitRequest request) {
		HomeManagerImpl manager = new HomeManagerImpl();
		return manager.submitRequest(request);
	}
	
	@GetMapping(value = "/submit/list",produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public SubmitRespose requestsList() {
		HomeManagerImpl manager = new HomeManagerImpl();
		return manager.requestsList();
	}

}
