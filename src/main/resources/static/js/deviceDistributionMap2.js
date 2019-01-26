
        //初始化加载地图
        /*var height = $(window).height() - 130;

        $('#map').css('height',  height + 'px');
        $('#map').css('max-height',  height + 'px');*/
	
		//var deviceData = [];

		var callback = function(deviceData){
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
	            
	            /*for (var i = 0; i < data.data.length; i++) {
	              points.push(new BMap.Point(data.data[i][0], data.data[i][1]));
	            }*/
	            
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
            });



        
