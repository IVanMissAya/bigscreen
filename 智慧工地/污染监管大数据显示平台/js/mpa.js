/**
 * Created by 30947 on 2018/8/10.
 */
$(function(){
    var map;
    map = new BMap.Map("divMap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // 随机向地图添加25个标注
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);
    var markers = new BMap.Marker(new BMap.Point(116.404, 39.915));
    var point;
    var marker;
    var marker1;
    var marker2;
    var marker3;
    var marker4;
    //水质信息弹出框
    var sContent =
        "<div style='width: 350px'>"+
        "<h4 style='margin:6px 0;padding:0.2em 0'><span>MG2013</span><span style='float: right'>水质监测</span></h4>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>维护单位：</label>沱江简阳段31号1段</p>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>位置：</label>沱江简阳段31号1段</p>" +
        "<p style='border-bottom: 1px dashed #cccccc'></p>"+
        "<p style='margin-top:10px;line-height:1.5;font-size:13px;'><span style='display: inline-block;width: 32%;text-align: center;color: red'>高猛酸盐(1.2M/L)</span><span  style='display: inline-block;width: 32%;text-align: center'>总磷(1.2M/L)</span><span  style='display: inline-block;width: 32%;text-align: center'>氨氮(1.2M/L)</span></p>"+
        "</div>";
    //流量信息弹出框
    var sContent1 =
        "<div style='width: 350px'>"+
        "<h4 style='margin:6px 0;padding:0.2em 0'><span>MG2013</span><span style='float: right'>流量监测</span></h4>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>维护单位：</label>沱江简阳段31号1段</p>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>位置：</label>沱江简阳段31号1段</p>" +
        "<p style='border-bottom: 1px dashed #cccccc'></p>"+
        "<p style='margin-top:10px;line-height:1.5;font-size:13px;'><span style='display: inline-block;width: 32%;text-align: center;color: red'>水流时速(1.2KM/S)</span><span  style='display: inline-block;width: 32%;text-align: center'>大小(1.2M/L)</span></p>"+
        "</div>";
    //水位信息弹出框
    var sContent2 =
        "<div style='width: 350px'>"+
        "<h4 style='margin:6px 0;padding:0.2em 0'><span>MG2013</span><span style='float: right'>水位监测</span></h4>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>维护单位：</label>沱江简阳段31号1段</p>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>位置：</label>沱江简阳段31号1段</p>" +
        "<p style='border-bottom: 1px dashed #cccccc'></p>"+
        "<p style='margin-top:10px;line-height:1.5;font-size:13px;'><span style='display: inline-block;width: 32%;text-align: center;color: red'>最高位(1.2M)</span><span  style='display: inline-block;width: 32%;text-align: center'>最低位(0.2M)</span></p>"+
        "</div>";
    //视频信息弹出框
    var sContent3 =
        "<div style='width: 350px'>"+
        "<h4 style='margin:6px 0;padding:0.2em 0'><span>MG2013</span><span style='float: right'>视频监测</span></h4>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><video style='width: 100%;height: 200px;background-color: black'></video></p>"


    "</div>";
    //车辆信息弹出框
    var sContent4 =
        "<div style='width: 350px'>"+
        "<h4 style='margin:6px 0;padding:0.2em 0'><span>川A2013</span><span style='float: right'>车辆监测</span></h4>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>驾驶人：</label>李小华</p>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>所属人：</label>李小华</p>" +

        "<p style='margin:0;line-height:1.5;font-size:13px;'><label style='font-weight: 600'>所在位置：</label>沱江简阳段31号1段</p>" +
        "<p style='border-bottom: 1px dashed #cccccc'></p>"+
        "<p style='margin-top:10px;line-height:1.5;font-size:13px;'><span style='display: inline-block;width: 32%;text-align: center;'>标志(508)</span><span  style='display: inline-block;width: 32%;text-align: center'>排量(2T)</span><span style='display: inline-block;width: 32%;text-align: center;'>2015-10-09</span></p>"+
        "</div>";
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建水质信息窗口对象
    var infoWindow1 = new BMap.InfoWindow(sContent1);  // 创建水量信息窗口对象
    var infoWindow2 = new BMap.InfoWindow(sContent2);  // 创建水位信息窗口对象
    var infoWindow3 = new BMap.InfoWindow(sContent3);  // 创建视频信息窗口对象
    var infoWindow4 = new BMap.InfoWindow(sContent4);  // 创建视频信息窗口对象

    //选择专题图添加点
    //水质监测点
    $("#zt_4").change(function(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker= new BMap.Marker(point);
                map.addOverlay(marker);
                marker.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow);})
            }
        }
        else{
            map.clearOverlays();
        }
    })
    //水量监测点
    $("#zt_1").change(function(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker1= new BMap.Marker(point);
                map.addOverlay(marker1);
                marker1.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow1);})
            }
        }
        else{
            map.clearOverlays();
        }
    })
    //水位监测点
    $("#zt_5").change(function(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker3= new BMap.Marker(point);
                map.addOverlay(marker3);
                marker3.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow2);})
            }
        }
        else{
            map.clearOverlays();
        }
    })
    //视频监测点
    $("#zt_6").change(function(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker2= new BMap.Marker(point);
                map.addOverlay(marker2);
                marker2.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow3);})
            }
        }
        else{
            map.clearOverlays();
        }
    })
    //车辆监测点
    $("#zt_2").change(function(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker4= new BMap.Marker(point);
                map.addOverlay(marker4);
                marker4.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow4);})
            }
        }
        else{
            map.clearOverlays();
        }

    })
    function addLocal(){
        map.addOverlay(markers);
    }
    function inputCheck(){
        if($(this).is(':checked')){
            for (var i = 0; i < 25; i ++) {
                point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                marker4= new BMap.Marker(point);
                map.addOverlay(marker4);
                marker4.addEventListener("click", function(){
                    this.openInfoWindow(infoWindow4);})
            }
        }
        else{
            map.clearOverlays();
        }
    }
})







//加载百度地图
