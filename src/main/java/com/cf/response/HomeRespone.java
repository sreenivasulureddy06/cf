package com.cf.response;

import java.util.ArrayList;
import java.util.List;

import com.cf.resquest.ImageContainer;

public class HomeRespone {
	private List<ImageContainer> images = new ArrayList<ImageContainer>();

	public List<ImageContainer> getImages() {
		return images;
	}

	public void setImages(List<ImageContainer> images) {
		this.images = images;
	}
	
}
