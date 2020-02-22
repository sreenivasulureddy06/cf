package com.cf.resquest;

import java.util.ArrayList;
import java.util.List;

public class HomeRequest {
	private List<String> images = new ArrayList<String>();
	private Pagination pagination;

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public Pagination getPagination() {
		return pagination;
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
	
}
