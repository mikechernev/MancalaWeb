package com.mikechernev.mancala.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String index(@CookieValue(value = "playerhash", defaultValue = "") String userId, Model model) {
        model.addAttribute("playerhash", userId);

        return "index";
    }

    @RequestMapping("/{gameId}")
    public String hello(@CookieValue(value = "playerhash", defaultValue = "") String userId, @PathVariable String gameId, Model model) {
        model.addAttribute("playerhash", userId);
        model.addAttribute("gameId", gameId);

        return "game";

    }

}