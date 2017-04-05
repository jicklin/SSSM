package com.jiajia.dao;

/**
 * Created by Administrator on 2017-04-05.
 */
public interface CommonMapper<T> {
    T selectByPrimaryKey(String id);
}
