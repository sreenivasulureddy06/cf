package com.cf.managers.impl;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.cf.managers.manager.HomeManager;
import com.cf.response.SubmitRespose;
import com.cf.resquest.SubmitRequest;

public class HomeManagerImpl implements HomeManager {

	public static String requestPath = "\\cf-1.0.0\\BOOT-INF\\classes\\public\\request";
	public static String requestFilePath = System.getProperty("user.dir") + requestPath+"/request.txt";
	
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
		try (FileWriter f = new FileWriter(requestFilePath, true);
                BufferedWriter b = new BufferedWriter(f);
                PrintWriter p = new PrintWriter(b);) {
            p.println(sb.toString());
        } catch (IOException ie) {
            ie.printStackTrace();
        }
		return response;
	}

	@Override
	public SubmitRespose requestsList() {
		SubmitRespose response = new SubmitRespose();
		try {
			List<String> allLines = Files.readAllLines(Paths.get(requestFilePath));
			SubmitRequest req = null;
			List<SubmitRequest> list = new ArrayList<>();
			for (String line : allLines) {
				req = new SubmitRequest();
				String[] l = line.split("@@###");
				req.setFirstName(l[0]);
				req.setPhoneNumber(l[1]);
				req.setEmail(l[2]);
				req.setDescription(l[3]);
				list.add(req);
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

}
