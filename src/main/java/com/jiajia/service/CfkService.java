package com.jiajia.service;

import com.jiajia.entity.fg.Cfk;

import java.util.List;

/**
 * Created by Administrator on 2017-03-29.
 */
public interface CfkService {

     Cfk getByPrimaryKey(String proid);

     List<Cfk> getAll();
}
