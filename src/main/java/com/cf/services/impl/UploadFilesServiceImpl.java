package com.cf.services.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cf.constants.Constants;
import com.cf.response.HomeRespone;
import com.cf.resquest.HomeRequest;
import com.cf.services.UploadFilesService;

@RestController
public class UploadFilesServiceImpl implements UploadFilesService {
	
	public static String imagesPath = "\\target\\classes\\public\\static\\appimage";
	public static String uploadingDir = System.getProperty("user.dir") + imagesPath;

	@PostMapping("/upload/images")
	public String uploadFiles(@RequestParam("file") MultipartFile[] submissions) throws IllegalStateException, IOException {
		System.out.println("User Path => "+uploadingDir);
		try {
			for(MultipartFile uploadedFile : submissions) {
				File file = new File(uploadingDir +"\\"+ uploadedFile.getOriginalFilename());
				uploadedFile.transferTo(file);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Constants.SUCCESS;
	}
	
	@GetMapping(value = "/list/images", produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone listImages() {
		HomeRespone response = listFiles();
		return response;
	}	
	
	@PostMapping(value="/delete/images", consumes={"application/json"}, produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone deleteImages(@RequestBody HomeRequest request) {
		HomeRespone response = new HomeRespone();
		File dir = new File(uploadingDir);
		if(dir.isDirectory() == false) {
			return response;
		}
		List<String> fileNames = new ArrayList<>();
		if(null != request && null != request.getImages()){
			for(String s : request.getImages()) {
				fileNames.add(s);
			}
		}
		File[] listFiles = dir.listFiles();
		for(File file : listFiles){
			if(fileNames.contains(file.getName())) {
				file.delete();
			}
		}
		return listFiles();
	}
	
	private HomeRespone listFiles() {
		HomeRespone response = new HomeRespone();
		List<String> list = new ArrayList<>();
		File file = new File(uploadingDir);
		File[] fileList = file.listFiles();
		for(File f : fileList){
			System.out.println(imagesPath+"/"+f.getName());
			list.add("/static/appimage"+"/"+f.getName());
		}
		response.setImages(list);
		return response;
	}

}
