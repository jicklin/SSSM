package com.jiajia.service;

import java.util.List;

/**
 * Created by Administrator on 2017-04-05.
 */
public interface CommonService<T> {
    T getByPrimaryKey(String id);
    List<T> getAll();
}
