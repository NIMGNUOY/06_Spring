package edu.kh.book.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.book.model.dto.Book;
import edu.kh.book.model.service.BookService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("book")
public class BookController {

	private BookService service;


	@GetMapping("selectAllList")
	public List<Book> selectAllList() {

	return service.selectAllList();

	}
	
}
