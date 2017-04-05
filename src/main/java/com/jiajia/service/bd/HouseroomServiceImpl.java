package com.jiajia.service.bd;

import com.jiajia.dao.bd.HouseroomMapper;
import com.jiajia.entity.bd.Houseroom;
import com.jiajia.service.CommonServiceImpl;
import com.jiajia.service.HouseroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017-04-05.
 */
@Service("houseroomService")
public class HouseroomServiceImpl  implements HouseroomService  {
    @Autowired
    private HouseroomMapper houseroomMapper;


    @Override
    public Houseroom getByPrimaryKey(String id) {
        return houseroomMapper.selectByPrimaryKey(id);
    }
}
