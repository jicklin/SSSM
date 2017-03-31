package com.jiajia.service;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.jiajia.entity.fg.Cfk;
import com.jiajia.util.RedisUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by Administrator on 2017-03-29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring/spring-mybatis.xml", "classpath:spring/spring-mvc.xml","classpath:spring/spring-redis.xml"})
public class CfkServiceTest {
    @Autowired
    private CfkService cfkService;
    @Autowired
    private RedisUtil redisUtil;

    @Test
    public void testGetByPrimaryKey() throws Exception {
        cfkService.getByPrimaryKey("0007620E-89B6-4972-93D7-25D788754070");

    }

    @Test
    public void testGetAll(){
       // redisUtil.remove("com.jiajia.service.fg.CfkServiceImpl_getAll");
        PageHelper.startPage(2,10);
        List<Cfk> cfks=cfkService.getAll();
        for(Cfk cfk:cfks){
            System.out.println(JSON.toJSONString(cfk));
        }
    }
}