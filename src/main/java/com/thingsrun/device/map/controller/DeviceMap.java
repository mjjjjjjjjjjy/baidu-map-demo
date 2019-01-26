/**
 * 
 */
package com.thingsrun.device.map.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Mo Jianyue
 *
 * @date 创建时间 2019年1月26日 上午9:58:24
 * 
 */
@Controller
public class DeviceMap {
    
    @RequestMapping("/device/map")
    public String deviceMap(){
        return "/map/deviceDistributionMap";
    }
}
