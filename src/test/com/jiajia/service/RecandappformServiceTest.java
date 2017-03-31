package com.jiajia.service;

import com.jiajia.util.Constants;
import com.jiajia.util.DataSourceHandler;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by Administrator on 2017-03-29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring/spring-mybatis.xml", "classpath:spring/spring-mvc.xml","classpath:spring/spring-redis.xml"})
public class RecandappformServiceTest {
    @Autowired
    private RecandappformService recandappformService;

    @Test
    public void testGetByPrimaryKey() throws Exception {
        DataSourceHandler.SetDataSource(Constants.ORADB);
        recandappformService.getByPrimaryKey("201600000930");

    }
}