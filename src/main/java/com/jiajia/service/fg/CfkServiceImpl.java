package com.jiajia.service.fg;

import com.alibaba.fastjson.JSON;
import com.jiajia.dao.fg.CfkMapper;
import com.jiajia.entity.fg.Cfk;
import com.jiajia.service.CfkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017-03-29.
 */
@Service("cfkService")
public class CfkServiceImpl implements CfkService {
    @Autowired
    private CfkMapper cfkMapper;
    @Override
    public Cfk getByPrimaryKey(String proid) {
        Cfk cfk=cfkMapper.selectByPrimaryKey(proid);
        System.out.println(JSON.toJSONString(cfk));
        return cfkMapper.selectByPrimaryKey(proid);
    }

    @Override
    public List<Cfk> getAll() {
        return cfkMapper.selectAll();
    }
}
