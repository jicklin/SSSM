package com.jiajia.dao.bd;

import com.jiajia.entity.bd.Recandappform;

public interface RecandappformMapper {
    int deleteByPrimaryKey(String casenum);

    int insert(Recandappform record);

    int insertSelective(Recandappform record);

    Recandappform selectByPrimaryKey(String casenum);

    int updateByPrimaryKeySelective(Recandappform record);

    int updateByPrimaryKey(Recandappform record);
}