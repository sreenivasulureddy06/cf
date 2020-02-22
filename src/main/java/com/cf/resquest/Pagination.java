package com.cf.resquest;

public class Pagination {
	private Integer pageSize = 10;
	private Integer pageNumber = 1;
	private Integer totalCount;
	private Integer noOfColumn = 1;
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}
	public Integer getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}
	public Integer getNoOfColumn() {
		return noOfColumn;
	}
	public void setNoOfColumn(Integer noOfColumn) {
		this.noOfColumn = noOfColumn;
	}
	
}
