



/**
     * 初始化全局model变量
     */
    var cityData = [];
    var citySetStatus = false; //判断数据是否已全部按城市归类状态
    var time = 0;

    var app = angular.module('device-map', []);
    //var app = angular.module('device-map', ['ngTouch', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'toggle-switch', 'ui.grid.selection', 'ui.grid.autoResize']);

    /**
     * 初始化全局model变量
     */
    app.run(function ($rootScope) {
        $rootScope.addMaterialsData = []; //添加弹窗素材列表数据
        $rootScope.selectedMaterialsData = []; //添加弹窗-选择素材列表数据
        $rootScope.addEquipmentGridOptions = null;
    });

    /**
     * 控制器
     */
    app.controller('device-map-controller', ['$rootScope', '$scope', 'i18nService', '$uibModal',  'uiGridConstants', function ($rootScope, $scope, i18nService, $modal, uiGridConstants) {
       // app.controller('device-map-controller', ['$rootScope', '$scope', 'i18nService', '$uibModal',  'uiGridConstants', function ($rootScope, $scope, i18nService, $modal, uiGridConstants) {
		/*var callback = function(deviceData){
	        
			var map = new BMap.Map("map", {}); 

	        // 创建Map实例
	        map.centerAndZoom(new BMap.Point(105.000, 38.000), 5);     // 初始化地图,设置中心点坐标和地图级别
	        map.enableScrollWheelZoom();                        //启用滚轮放大缩小
	        
	        // 添加带有定位的导航控件
	        var navigationControl = new BMap.NavigationControl({
	            // 靠左上角位置
	            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
	            // LARGE类型
	            type: BMAP_NAVIGATION_CONTROL_LARGE,
	            
	            // 启用显示定位
	            enableGeolocation: true
	        });

	        map.addControl(navigationControl);
	        
	        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
	            var points = [];  // 添加海量点数据
	            
	            for (var i = 0; i < data.data.length; i++) {
	              points.push(new BMap.Point(data.data[i][0], data.data[i][1]));
	            }
	            
	            for (var i = 0; i < deviceData.length; i++) {
	            	
	            	var stateInfo = deviceData[i].stateInfo;
	            	if(!stateInfo){
	            		continue;
	            	}
	            	var stateInfoObj = JSON.parse(stateInfo);
            		var location = "";
            		location = stateInfoObj.location;
            		console.log(location);
            		if(!location){
            			continue;
            		}
            		var a = location.split(",");
            		var b = a[0];//纬度
            		var c = a[1];//经度 百度地图中经度在前
            		points.push(new BMap.Point(c, b));
	              }
	            
	            var options = {
	               size: BMAP_POINT_SIZE_BIG,
	               shape: BMAP_POINT_SHAPE_CIRCLE,
	              // shape: BMAP_POINT_SHAPE_WATERDROP,//水滴形 加载速度较慢 影响使用时使时 使用圆形
	               
	               //color: '#d340c3'
	               color: '#ff9900'
	            }
	            var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
	            pointCollection.addEventListener('click', function (e) {
	              alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
	            });
	            map.addOverlay(pointCollection);  // 添加Overlay
	            
	        } else {
	            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
	        }
		}

		$.ajax({
                type:'get',
                url:'/device/bdGatewayInfo',
                cache:false,
                dataType:'json',
                success:function(data1){
                	callback(data1);
                	
                }
            });*/
    }]);
    
    
/*    app.controller('device-map-controller', ['$rootScope', '$scope', 'i18nService', '$uibModal', 'ReportMapService', 'uiGridConstants', function ($rootScope, $scope, i18nService, $modal, service, uiGridConstants) {

        //初始化model
        $scope.company = '';
        $scope.lng = '';
        $scope.lat = '';
        $scope.branchSelectData = []; //分公司下拉
        $scope.branchtData = []; //分公司列表
        $scope.branchtDisplay = true; //分公司列表隐藏显示

        //初始化加载地图
        var height = $(window).height() - 130;

        $('#map').css('height',  height + 'px');
        $('#map').css('max-height',  height + 'px');

        var map = new BMap.Map("map", {}); 

        // 创建Map实例
        map.centerAndZoom(new BMap.Point(105.000, 38.000), 5);     // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom();                        //启用滚轮放大缩小
        
        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            
            // 启用显示定位
            enableGeolocation: true
        });

        map.addControl(navigationControl);
        
        
        

        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
            //获取全国分公司列表
            var timeObj = utils.dateRange('yestoday'); //获取昨天日期

            var params = {
                staTime: timeObj.startTime,
                endTime: timeObj.endTime
            }

            service.getBranch(params, function(res) {
                res.sort(function(a, b) {
                    return b.fansCount - a.fansCount;
                });

                res.forEach(function(v, index) {
                    var name = v.name.split('-');
                    v.cname = name[1];
                    $scope.branchtData.push(v);

                    name = name[1].split('分公司');
                    v.cbbreviation = name[0];
                    $scope.branchSelectData.push(v);
                });

                $('.ranking').css('height', height + 'px');
                $('.ranking').css('overflow-y', 'auto');
            });

            //获取全国所有设备插入到地图标注
            service.getDevice(function(response) {
                //添加海量点数据
                var setPoints = function(mapData, pointSize) {
                    var points = [];

                    mapData.forEach(function(v, index) {
                        if (v.shopLongitude > 0 && v.shopLatitude > 0) {
                            mapData[index].longitude = v.shopLongitude;
                            mapData[index].latitude = v.shopLatitude;
                            mapData[index].shopName = v.shopName = v.shopName == null ? '' : v.shopName;
                            mapData[index].address = v.address = v.address == null ? '' : v.address;
                            points.push(new BMap.Point(mapData[index].longitude, mapData[index].latitude));

                            if (!citySetStatus) {
                                (cityData[v.cityName] || (cityData[v.cityName] = [])).push(mapData[index]);
                            }
                        } else {
                            mapData[index].shopName = v.shopName = v.shopName == null ? '' : v.shopName;
                            mapData[index].address = v.address = v.address == null ? '' : v.address;
                            points.push(new BMap.Point(v.longitude, v.latitude));

                            if (!citySetStatus) {
                                (cityData[v.cityName] || (cityData[v.cityName] = [])).push(v);
                            }
                        }
                    });

                    citySetStatus = true;

                    //点击提示地址信息窗口
                    var options = {
                        size: pointSize == 'BMAP_POINT_SIZE_SMALL' ? BMAP_POINT_SIZE_SMALL : BMAP_POINT_SIZE_BIG,
                        shape: BMAP_POINT_SHAPE_CIRCLE,
                        color: '#ED2D2D'
                    }

                    var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection

                    //添加Overlay
                    map.addOverlay(pointCollection);

                    pointCollection.addEventListener('click', function (e) {
                        response.forEach(function(v, index) {
                            if (v.longitude == e.point.lng && v.latitude == e.point.lat) {
                                var point = new BMap.Point(e.point.lng, e.point.lat);

                                var infoWindow = new BMap.InfoWindow('地址：' +  v.address, {
                                    width : 200,     // 信息窗口宽度
                                    title : '<b style="color: #CC5522;">'+ v.shopName +'</b>', // 信息窗口标题
                                    enableMessage: true //设置允许信息窗发送短息
                                });

                                map.openInfoWindow(infoWindow, point); // 打开信息窗口
                            }
                        });
                    });
                }
                
                //写入海量点
                setPoints(response, 'BMAP_POINT_SIZE_BIG');

                //搜索设备号事件
                document.getElementById('deviceNumberSearch').addEventListener('click', function() {
                    for (var i in response) {
                        if (response[i].id == $scope.deviceNumber) {
                            clearInterval(time);

                            var point = new BMap.Point(response[i].longitude, response[i].latitude);

                            var infoWindow = new BMap.InfoWindow('地址：' +  response[i].address, {
                                width : 200,     // 信息窗口宽度
                                title : '<b style="color: #CC5522;">'+ response[i].shopName +'</b>', // 信息窗口标题
                                enableMessage: true //设置允许信息窗发送短息
                            });

                            map.openInfoWindow(infoWindow, point); // 打开信息窗口
                            map.centerAndZoom(point, 15);
                            break;
                        } else {
                            clearInterval(time);

                            time = setTimeout(function() {
                                toastr["warning"]("设备号不存在");
                            }, 500);
                        }
                    }
                });

                //搜索设备编号事件
                document.getElementById('serialNumberSearch').addEventListener('click', function() {
                    for (var i in response) {
                        if (response[i].serialNumber == $scope.serialNumber) {
                            clearInterval(time);

                            var point = new BMap.Point(response[i].longitude, response[i].latitude);

                            var infoWindow = new BMap.InfoWindow('地址：' +  response[i].address, {
                                width : 200,     // 信息窗口宽度
                                title : '<b style="color: #CC5522;">'+ response[i].shopName +'</b>', // 信息窗口标题
                                enableMessage: true //设置允许信息窗发送短息
                            });

                            map.openInfoWindow(infoWindow, point); // 打开信息窗口
                            map.centerAndZoom(point, 15);
                            break;
                        } else {
                            clearInterval(time);

                            time = setTimeout(function() {
                                toastr["warning"]("设备编号不存在");
                            }, 500);
                        }
                    }
                });

                //监听分公司下拉宽选择事件
                $scope.companyChange = function() {
                    $scope.deviceNumber = '';
                    $scope.serialNumber = '';

                    if ($scope.company != '') {
                        map.clearOverlays();

                        var local = new BMap.LocalSearch(map, {
                            renderOptions:{map: map}
                        });

                        local.search($scope.company);

                        //添加海量点数据
                        setPoints(cityData[$scope.company + '市'], 'BMAP_POINT_SIZE_BIG');
                    } else {
                        map.clearOverlays();
                        map.centerAndZoom('中国', 5);

                        //添加海量点数据
                        setPoints(response, 'BMAP_POINT_SIZE_BIG');
                    }
                }
            });
        } else {
            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
        }

        //分公司列表显示隐藏
        $scope.showToHide = function() {
            if ($scope.branchtDisplay) {
                $scope.branchtDisplay = false;
            } else {
                $scope.branchtDisplay = true;
            }
        }
    }]);*/

    /*--------------------------------------------------------------
     | 自定义服务
     |--------------------------------------------------------------
    */
    /*app.factory('ReportMapService', ['$http', function ($http) {
        return {
            *//**
             * 获取表格分页数据
             * @author Sea
             * @param {object} pageParams 页码、条数、过滤、排序
             * @param {function} callbackFun 分页回调
             * @date 2017-10-11
             * @return void
             *//*
            getPage: function (pageParams, callbackFun) {
                pageParams.pageNumber = (pageParams.pageNumber - 1);

                $http.get('/ad/ReportMap', {
                    params: pageParams
                }).success(function (response, status, headers, congfig) {
                    if (callbackFun) {
                        callbackFun(response);
                    } else {
                        throw new Error('未填写参数');
                    }
                });
            },
            *//**
             * 获取素材表格分页数据
             * @author Sea
             * @param {object} pageParams 页码、条数、过滤、排序
             * @param {function} callbackFun 分页回调
             * @date 2017-11-04
             * @return void
             *//*
            getMaterialPage: function(pageParams, callbackFun) {
                pageParams.pageNumber = (pageParams.pageNumber - 1);

                $http.get('/ad/material', {
                    params: pageParams
                }).success(function(response, status, headers, congfig) {
                    if (callbackFun) {
                        callbackFun(response);
                    } else{
                        throw new Error('未填写参数');
                    }
                });
            },
            *//**
             * 获取设备表格分页数据
             * @author Sea
             * @param {object} pageParams 页码、条数、过滤、排序
             * @param {function} callbackFun 分页回调
             * @date 2017-11-04
             * @return void
             *//*
            getEquipmentPage: function(pageParams, callbackFun) {
                pageParams.pageNumber = (pageParams.pageNumber - 1);

                $http.get('/ad/publish/machine', {
                    params: pageParams
                }).success(function(response, status, headers, congfig) {
                    if (callbackFun) {
                        callbackFun(response);
                    } else{
                        throw new Error('未填写参数');
                    }
                });
            },
            //获取全国设备
            getDevice: function(callbackFun) {
                $http.get('/report/map/allMachine')
                    .success(function (response, status, headers, congfig) {
                        if (callbackFun) {
                            callbackFun(response);
                        } else {
                            throw new Error('未填写参数');
                        }
                    });
            },
            //获取分公司列表
            getBranch: function(params, callbackFun) {
                $http.get('/report/map/branch/list', {
                    params: params
                })
                .success(function(response, status, headers, congfig) {
                    if (callbackFun) {
                        callbackFun(response);
                    } else{
                        throw new Error('未填写参数');
                    }
                });
            },
        }
    }]);*/
