package com.jiajia.util;

/**
 * 动态数据源
 * Created by Administrator on 2017-03-29.
 */
public class DataSourceHandler {
    /**
     * 线程本地环境
     */
    private static final ThreadLocal<String> dataSources=new ThreadLocal<String>();

    /**
     * 设置数据源类型
     * @param dataSource
     */
    public  static void SetDataSource(String dataSource){
        dataSources.set(dataSource);
    }

    /**
     * 获取数据源类型
     * @return
     */
    public static String getDataSource(){

        return dataSources.get();
    }
    /**
     * 清空数据源
     */
    public static void clearDataSource(){
        dataSources.remove();
    }
}
