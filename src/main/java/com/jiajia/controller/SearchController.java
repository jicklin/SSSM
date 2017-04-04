package com.jiajia.controller;

import com.alibaba.fastjson.JSON;
import com.jiajia.entity.UserEntity;
import com.sun.corba.se.spi.orbutil.fsm.Guard;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Administrator on 2017-03-31.
 */
@Controller
@RequestMapping("/search")
public class SearchController {

    @RequestMapping("/family")
    @ResponseBody
    public String testSearch(@RequestBody List<UserEntity> users) {
        String result = "";
        if (users == null || users.size() == 0) {
            return "没有记录";
        }
        result = JSON.toJSONString(users);
        System.out.println(result);
        return result;


    }

}
