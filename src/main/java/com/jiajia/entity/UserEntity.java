package com.jiajia.entity;

import java.io.Serializable;

/**
 * Created by Administrator on 2017-03-27.
 */
public class UserEntity implements Serializable {
    private String username;//用户名
    private String certNo;//用户密码

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCertNo() {
        return certNo;
    }

    public void setCertNo(String certNo) {
        this.certNo = certNo;
    }
}
