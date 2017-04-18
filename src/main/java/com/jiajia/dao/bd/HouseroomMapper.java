package com.jiajia.dao.bd;

import com.github.pagehelper.Page;
import com.jiajia.entity.bd.Houseroom;


public interface HouseroomMapper {
    Houseroom selectByPrimaryKey(String houseroomid);

    Page<Houseroom> selectAll();

     int countAll();
}