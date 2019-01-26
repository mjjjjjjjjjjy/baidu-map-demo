
        //初始化加载地图
        var height = $(window).height() - 230;

        $('#map').css('height',  height + 'px');
        $('#map').css('max-height',  height + 'px');
        
        var map = new BMap.Map("map", {}); 

    // 创建Map实例
//    map.centerAndZoom(new BMap.Point(105.000, 38.000), 6);     // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom('中国', 5);
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
        var options = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_STAR,
            color: '#d340c3'
        }
        var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
        pointCollection.addEventListener('click', function (e) {
          alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
        map.addOverlay(pointCollection);  // 添加Overlay
        
    } else {
        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
    }