package com.jiajia.util;

import org.aspectj.lang.JoinPoint;

/**
 * Created by Administrator on 2017-03-30.
 */
public class RedisRemove {
    private RedisUtil redisUtil;

    public void setRedisUtil(RedisUtil redisUtil) {
        this.redisUtil = redisUtil;
    }

    public void remove(JoinPoint point){
        Class<?> aclass=point.getTarget().getClass();
        String className=aclass.getName();
        String akey=className+"_getAll";
       if( redisUtil.exists(akey)){
           redisUtil.remove(akey);
       }

    }
}
