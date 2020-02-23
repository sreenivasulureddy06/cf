package com.cf.services.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cf.constants.Constants;
import com.cf.response.HomeRespone;
import com.cf.resquest.HomeRequest;
import com.cf.resquest.ImageContainer;
import com.cf.resquest.Pagination;
import com.cf.services.UploadFilesService;

@RestController
public class UploadFilesServiceImpl implements UploadFilesService {
	
	//public static String imagesPath = "\\cf-1.0.0\\BOOT-INF\\classes\\public\\appimage";
	//public static String designImagesPath = "\\cf-1.0.0\\BOOT-INF\\classes\\public\\designs";
	//public static String imagesPath = "\\target\\classes\\public\\static\\appimage";
	//public static String designImagesPath = "\\target\\classes\\public\\static\\designs";
	//public static String uploadingDir = System.getProperty("user.dir") + imagesPath;
	//public static String uploadingDesignDir = System.getProperty("user.dir") + designImagesPath;
	String userDir = System.getProperty("user.dir");

	@PostMapping("/upload/images")
	public String uploadFiles(@RequestParam("file") MultipartFile[] submissions) throws IllegalStateException, IOException {
		try {
			String filePath = userDir + "/appimage";
			createDirectory(filePath);
			for(MultipartFile uploadedFile : submissions) {
				File file = new File(filePath +"\\"+ uploadedFile.getOriginalFilename());
				uploadedFile.transferTo(file);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Constants.SUCCESS;
	}
	
	@PostMapping(value = "/list/images", produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone listImages(@RequestBody HomeRequest request) {
		HomeRespone response = listFiles("appimage", request);
		return response;
	}	
	
	@PostMapping(value="/delete/images", consumes={"application/json"}, produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone deleteImages(@RequestBody HomeRequest request) {
		HomeRespone response = new HomeRespone();
		String filePath = userDir + "/appimage";
		File dir = new File(filePath);
		try {
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
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return listFiles("appimage", request);
	}
	
	@PostMapping("/upload/design/images")
	public String uploadDesignFiles(@RequestParam("file") MultipartFile[] submissions) throws IllegalStateException, IOException {
		try {
			String filePath = userDir + "/designs";
			createDirectory(filePath);
			for(MultipartFile uploadedFile : submissions) {
				File file = new File(filePath +"\\"+ uploadedFile.getOriginalFilename());
				uploadedFile.transferTo(file);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Constants.SUCCESS;
	}
	
	@PostMapping(value = "/list/design/images", produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone listDesignImages(@RequestBody HomeRequest request) {
		HomeRespone response = listFiles("designs", request);
		return response;
	}
	
	@PostMapping(value="/delete/design/images", consumes={"application/json"}, produces={"application/json"})
	@CrossOrigin(origins = "http://localhost:3000")
	public HomeRespone deleteDesignImages(@RequestBody HomeRequest request) {
		HomeRespone response = new HomeRespone();
		String filePath = userDir + "/designs";
		File dir = new File(filePath);
		try {
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
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return listFiles("designs", request);
	}
	
	private HomeRespone listFiles(String uiPath, HomeRequest request) {
		HomeRespone response = new HomeRespone();
		int pageSize = 10;
		int pageNumber = 1;
		int totalCount = 0;
		int startIndex = 1;
		int endIndex = startIndex;
		int noOfPages = 1;
		Pagination pagination = request.getPagination();
		if(null != pagination) {
			pageSize = pagination.getPageSize();
			pageNumber = pagination.getPageNumber();
			startIndex = (pageNumber - 1) * pageSize;
			endIndex = startIndex + pageSize;
			noOfPages = pagination.getNoOfPages();
		}
		List<ImageContainer> list = new ArrayList<>();
		File file;
		try {
			String folderPath = userDir+"/"+uiPath;
			file = new File(folderPath);
			File[] fileList = file.listFiles();
			if(null != fileList) {
				File[] result;
				totalCount = fileList.length;
				if(startIndex >= totalCount) {
					startIndex = totalCount--;
				}
				if(endIndex >= totalCount) {
					endIndex = totalCount--;
				}
				if(null != pagination) {
					result = Arrays.copyOfRange(fileList, startIndex, endIndex);
				} else {
					result = fileList;
				}
				for(File f : result){
					InputStream is = new FileInputStream(f);
					ByteArrayOutputStream bao = new ByteArrayOutputStream();
					try {
						byte[] buffer = new byte[1024];
			            int length;
			            while ((length = is.read(buffer)) > 0) {
			            	bao.write(buffer, 0, length);
			            }
						ImageContainer image = new ImageContainer();
						image.setMimeType("image/"+FilenameUtils.getExtension(f.getName()));
						image.setName(f.getName());
						image.setData(bao.toByteArray());
						list.add(image);
					} catch (Exception e) {
						
					} finally {
						bao.close();
						is.close();
					}
				}
				response.setImages(list);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(null != pagination) {
			pagination.setPageNumber(pageNumber);
			pagination.setPageSize(pageSize);
			noOfPages = totalCount/pageSize;
			if(totalCount%pageSize != 0) {
				noOfPages++;
			}
			pagination.setTotalCount(totalCount);
			pagination.setNoOfPages(noOfPages);
			response.setPagination(pagination);
		}
		return response;
	}
	private void createDirectory(String filePath) throws IOException {
		File dir = new File(filePath);
		if(!dir.exists()) {
			dir.mkdir();
		}
	}

}
