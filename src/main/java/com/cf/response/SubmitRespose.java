package com.cf.response;

import java.util.List;

import com.cf.resquest.Pagination;
import com.cf.resquest.SubmitRequest;

public class SubmitRespose {
	private List<SubmitRequest> requests;
	private Pagination pagination;

	public List<SubmitRequest> getRequests() {
		return requests;
	}

	public void setRequests(List<SubmitRequest> requests) {
		this.requests = requests;
	}
	
	public Pagination getPagination() {
		return pagination;
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
	
}
