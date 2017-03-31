package com.jiajia.dao.fg;

import com.jiajia.entity.fg.Cfk;

import java.util.List;

public interface CfkMapper {
    int deleteByPrimaryKey(String proid);

    int insert(Cfk record);

    int insertSelective(Cfk record);

    Cfk selectByPrimaryKey(String proid);

    int updateByPrimaryKeySelective(Cfk record);

    int updateByPrimaryKey(Cfk record);

    List<Cfk>  selectAll();
}