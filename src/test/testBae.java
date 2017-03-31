import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.omg.CORBA.portable.ApplicationException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2017-03-27.
 */
public class testBae {
    @Test
    public void testsqlSession(){
        ApplicationContext ac=new ClassPathXmlApplicationContext("classpath:spring/spring-mybatis.xml");
        SqlSessionFactory sqlSessionFactory= (SqlSessionFactory) ac.getBean("sqlSessionFactory");
        System.out.println(sqlSessionFactory.getClass().getName());
    }
}
