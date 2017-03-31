package com.jiajia.service.bd;

import com.alibaba.fastjson.JSON;
import com.jiajia.dao.bd.RecandappformMapper;
import com.jiajia.entity.bd.Recandappform;
import com.jiajia.service.RecandappformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017-03-29.
 */
@Service("recandappformService")
public class RecandappformServiceImpl implements RecandappformService{
    @Autowired
    private RecandappformMapper recandappformMapper;
    @Override
    public Recandappform getByPrimaryKey(String caseNum) {
        Recandappform recandappform= recandappformMapper.selectByPrimaryKey(caseNum);
        System.out.println(JSON.toJSONString(recandappform));
        return recandappformMapper.selectByPrimaryKey(caseNum);
    }
}
