package com.cf.managers.manager;

import com.cf.response.SubmitRespose;
import com.cf.resquest.SubmitRequest;

public interface HomeManager {
	public String getHomeContent();
	public SubmitRespose submitRequest(SubmitRequest request);
	public SubmitRespose requestsList();
}
