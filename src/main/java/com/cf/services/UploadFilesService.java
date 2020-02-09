package com.cf.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface UploadFilesService {
	public String uploadFiles(MultipartFile[] submissions) throws IllegalStateException, IOException;
}
