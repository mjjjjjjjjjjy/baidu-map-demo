/**
 * 
 */
package com.thingsrun.device.map.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thingsrun.device.map.dao.BdGatewayInfoDao;
import com.thingsrun.device.map.vo.BdGatewayInfo;

/**
 *
 * @author Mo Jianyue
 *
 * @date 创建时间 2019年1月26日 上午9:58:24
 * 
 */
@Controller
public class DeviceMap {
    
    @Autowired
    private BdGatewayInfoDao bdGatewayInfoDao;
    
    @RequestMapping("/device/map")
    public String deviceMap(){
        return "/map/deviceDistributionMap";
    }
    
    @RequestMapping("/device/bdGatewayInfo")
    @ResponseBody
    public List<BdGatewayInfo> getBdGatewayInfo() {
        return bdGatewayInfoDao.queryAllDeviceOn();
    }
}
