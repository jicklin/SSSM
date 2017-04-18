package com.jiajia.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jiajia.entity.DataRequest;
import com.jiajia.entity.DataResponse;
import com.jiajia.entity.UserEntity;
import com.jiajia.entity.bd.Houseroom;
import com.jiajia.service.HouseroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-03-31.
 */
@Controller
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private HouseroomService houseroomService;

    @RequestMapping(value="/family/{jsonStr}",method = RequestMethod.GET)
    @ResponseBody
    public DataResponse<Houseroom> testSearch(@PathVariable("jsonStr") String jsonStr , DataRequest request, Model model) {
        String result = "";
        List<UserEntity> users=JSON.parseArray(jsonStr,UserEntity.class);
        int count;//总记录数
        int limit = request.getRows() <= 0 ? 20 : request.getRows();//每页显示数量
        int totalPages;//总页数
        int page = request.getPage() <= 0 ? 1 : request.getPage();//当前显示页码
        Page<Houseroom> list=null;
        DataResponse<Houseroom> response=new DataResponse<Houseroom>();
//        Houseroom room=houseroomService.getByPrimaryKey("ABAC583922D7446591234E1BDAA354DD");
        count=houseroomService.getCount();
        totalPages=(int)Math.ceil(count/limit);
        PageHelper.startPage(page,limit);
        list=houseroomService.getAll();
        //list.add(room);
        response.setRecords(count);
        response.setTotal(totalPages);
        response.setPage(page);
        response.setRows(list);
        System.out.println(result);
        return response;


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
