package edu.kh.project.test;

public class Calculator {
	
	public int add (int a, int b) {
		return a + b;
	}
	
	public int subtract (int a, int b) {
		return a - b;
	}
	
	public int multiply(int a, int b) {
		return a * b;
	}
	
	public int divide(int a, int b) {
		if(b == 0) {
			throw new IllegalArgumentException("0 으로 나눌 수 없음");
		}
		
		return a / b;
	}
	
	public boolean exam() {
		return 1 == 1;
	}

}
