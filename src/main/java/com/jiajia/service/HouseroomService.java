package com.jiajia.service;

import com.github.pagehelper.Page;
import com.jiajia.entity.bd.Houseroom;

import java.util.List;

/**
 * Created by Administrator on 2017-04-05.
 */
public interface HouseroomService {
    Houseroom getByPrimaryKey(String id);

    Page<Houseroom> getAll();

    int getCount();
}
