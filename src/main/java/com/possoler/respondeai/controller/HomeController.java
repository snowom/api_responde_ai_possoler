package com.possoler.respondeai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin("*")
@Controller
public class HomeController {

    private ModelAndView mv;

    @GetMapping("/")
    public ModelAndView index() {
        mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }

    @GetMapping("/home")
    public ModelAndView home() {
        mv = new ModelAndView();
        mv.setViewName("home");
        return mv;
    }

    @GetMapping("/token")
    public ModelAndView token() {
        mv = new ModelAndView();
        mv.setViewName("token");
        return mv;
    }
}
