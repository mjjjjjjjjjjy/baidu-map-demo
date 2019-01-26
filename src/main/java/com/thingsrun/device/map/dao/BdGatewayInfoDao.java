package com.thingsrun.device.map.dao;
/**
* @author MoJianyue
* @version 创建时间：2019年1月26日 下午2:58:35
*/

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.thingsrun.device.map.vo.BdGatewayInfo;

@Repository
public class BdGatewayInfoDao {
    
    
    private static final Logger LOG = LoggerFactory.getLogger(BdGatewayInfoDao.class);
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public List<BdGatewayInfo> queryAllDeviceOn() {
        String sql = "select * from bd_gateway_info where status = 1 ";
        List<BdGatewayInfo> query = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(BdGatewayInfo.class));
        LOG.info("返回的数量为={}",query.size());
        return query;
    }


}
