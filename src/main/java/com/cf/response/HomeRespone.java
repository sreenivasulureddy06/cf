package com.cf.response;

import java.util.ArrayList;
import java.util.List;

import com.cf.resquest.ImageContainer;
import com.cf.resquest.Pagination;

public class HomeRespone {
	private List<ImageContainer> images = new ArrayList<ImageContainer>();
	private Pagination pagination;

	public List<ImageContainer> getImages() {
		return images;
	}

	public void setImages(List<ImageContainer> images) {
		this.images = images;
	}

	public Pagination getPagination() {
		return pagination;
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
	
}
