package com.jiajia.dao.bd;

import com.jiajia.entity.bd.Recandappform;
import org.springframework.stereotype.Repository;

public interface RecandappformMapper {

    Recandappform selectByPrimaryKey(String casenum);

}