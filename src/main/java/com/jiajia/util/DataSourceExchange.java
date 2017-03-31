package com.jiajia.util;

import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Component;

/**
 * 切换数据源拦截器方法 通过包名来自动注入
 * Created by Administrator on 2017-03-29.
 */
@Component("dataSourceExchange")
public class DataSourceExchange {

    public void before(JoinPoint point){
        //通过反射获取类
        Class<?> aClass=point.getTarget().getClass();
        //获取类名
        String className=aClass.getName();
        //获取service下包名
        String whichDataSource=className.substring(19,className.lastIndexOf("."));
        if("bd".equals(whichDataSource)){
            DataSourceHandler.SetDataSource(Constants.ORADB);
        }else {
            DataSourceHandler.SetDataSource(Constants.SQLDB);
        }

    }

    public void after(){
        DataSourceHandler.clearDataSource();
    }
}
