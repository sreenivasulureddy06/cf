package com.cf.managers.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StringUtils;

import com.cf.managers.manager.HomeManager;
import com.cf.response.SubmitRespose;
import com.cf.resquest.SubmitRequest;

public class HomeManagerImpl implements HomeManager {

	String userDir = System.getProperty("user.dir");
	
	@Override
	public String getHomeContent() {
		return "Home content API";
	}

	@Override
	public SubmitRespose submitRequest(SubmitRequest request) {
		SubmitRespose response = new SubmitRespose();
		StringBuilder sb = new StringBuilder();
		sb.append(emptyCheck(request.getFirstName()));
		sb.append(" @@### ");
		sb.append(emptyCheck(request.getPhoneNumber()));
		sb.append(" @@### ");
		sb.append(emptyCheck(request.getEmail()));
		sb.append(" @@### ");
		sb.append(emptyCheck(request.getDescription()));
		String filePath = userDir + "/request";
		File file = new File(filePath+"/request.txt");
		try(PrintWriter output = new PrintWriter(new FileWriter(file.getPath(),true))) {
			output.printf("%s\r\n", sb.toString());
        } catch (IOException ie) {
            ie.printStackTrace();
        }
		return response;
	}

	@Override
	public SubmitRespose requestsList() {
		SubmitRespose response = new SubmitRespose();
		try {
			String filePath = userDir + "/request";
			createDirectory(filePath);
			File file = new File(filePath+"/request.txt");
			List<String> allLines = new ArrayList<>();
			try(BufferedReader br  = new BufferedReader(new FileReader(file))){
				String strLine;
				while((strLine = br.readLine()) != null){
					allLines.add(strLine);
				}
			}
			SubmitRequest req = null;
			List<SubmitRequest> list = new ArrayList<>();
			for (String line : allLines) {
				req = new SubmitRequest();
				String[] l = line.split("@@###");
				if(l.length == 4) {
					req.setFirstName(l[0]);
					req.setPhoneNumber(l[1]);
					req.setEmail(l[2]);
					req.setDescription(l[3]);
					list.add(req);
				}
			}
			response.setRequests(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	private String emptyCheck(String string) {
		if(!StringUtils.isEmpty(string)) {
			return string;
		}
		return "";
	}
	
	private void createDirectory(String filePath) throws IOException {
		File dir = new File(filePath);
		if(!dir.exists()) {
			dir.mkdir();
		}
	}

}
