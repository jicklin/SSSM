package com.jiajia.controller;

import com.alibaba.fastjson.JSON;
import com.jiajia.entity.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-03-31.
 */
@Controller
@RequestMapping("/search")
public class SearchController {

    @RequestMapping("/family")
    @ResponseBody
    public String testSearch(@RequestBody List<UserEntity> users, Model model) {
        String result = "";
        if (users == null || users.size() == 0) {
            return "没有记录";
        }
        model.addAttribute("users",users);
        result = JSON.toJSONString(users);
        System.out.println(result);
        return result;


    }
    @RequestMapping("/family2")
    public String  testJstl(Model model){
        List<UserEntity> users=new ArrayList<UserEntity>();
        UserEntity user1=new UserEntity();
        user1.setUsername("马林");
        user1.setCertNo("123");
        users.add(user1);
        model.addAttribute("user2",users);
        return "success";

    }

}
