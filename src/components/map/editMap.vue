<template>
  <div class="editMap">
    <div id="container"></div>
    <div class="top">
      <!-- <div class="back" @click="$router.back()">返回</div> -->
      <div id="myPageTop" v-if="!startFlag">
          <input id="tipinput" placeholder="请输入详细地址搜索" />
          <div class="icon">
            <!-- <img src="@/assets/image/map/search.png" alt=""> -->
          </div>
      </div>
    </div>
    
    <div class="bottom" v-if="startFlag==3">
      <div class="bg">
        <div class="block">
          <span class="demonstration">拖拽实点调整区域,拖拽虚点增加节点</span>
        </div>
        <div class="block">
          <span class="demonstration" :style="'color:'+fieldsInfo.mapColor">选择轮廓颜色</span>
          <el-color-picker v-model="fieldsInfo.mapColor" :predefine="predefineColors" @change="changeColor"></el-color-picker>
        </div>
        <div class="btn">
          <!-- <div class="reDraw" @click='reDraw'>重新绘制</div> -->
          <div class="saveAndQuit" @click='saveAndQuit'>保存并退出</div>
        </div>
      </div>
    </div>
    <div class="bottom" v-else>
      <div :class="{'startDraw':true,'back':startFlag==1}" @click="btnDraw">{{startFlag==1 ? '⮐ 撤销' : '开始绘制'}}</div>
      <!-- <div class="text">
        <div>
          显示已绘制的地块
        </div>
        <van-switch v-model="isShow" active-color="#66CE90" inactive-color="#99989A" size=".12rem" @change="showFields"/>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props:{
    startFlag:{
      default:0
    },
    fieldsInfo:{
    }
  },

  data(){
    return {
      map:'',//地图
      path:[],//坐标集合
      circleMarker:[],//圆点
      textMarker:'',//文本
      polyline:'',//折线
      polygon:'',//多边形
      isShow:true,//显示地块
      // startFlag: this.startFlag | 0,// 绘制状态: 0:未开始,1:开始绘制,2:绘制结束
      // mapColor: this.fieldsInfo ? this.fieldsInfo.mapColor : '#EB7D3B',//当前颜色
      predefineColors: [
        '#EC7E3B',
        '#FFFD72',
        '#99F667',
        '#98F7FD',
        '#071AEA',
        '#D84BEE',
        '#D5DEAC',
        '#71F077',
        '#AC26E6',
        '#4387F5',
        '#E83D5E',
        '#E0CC44',
        '#6E49E7',
        '#DF9665',
        '#60CFD1',
        '#E95534',
        '#58BD50',
        '#E83DED',
        '#D883B8',
        '#7899E1',
      ],
    }
  },
  mounted(){
    this.init()
    if(this.startFlag == 3) {
      JSON.parse(this.fieldsInfo.lnglats).filter(item => {
        this.path.push([item.lng, item.lat])
      })
      this.endDraw()
    }
    var search = document.querySelector('.amap-sug-result')
    search.style = "z-index:999999!important"
  },
  methods:{
    // 地图初始化
    init(){

        // 地图容器
        var map = new AMap.Map('container', {
            resizeEnable: true,
            zooms: [3, 19],//设置地图级别范围
            zoom: 10,
        });

        // 控件
        AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {

          // 图层控件
          map.addControl(new BasicControl.LayerSwitcher({
              baseLayers: [
						{
							enable: true,
							id: 'GoogleSatellite',
							name: ' 谷歌 影像',
							layer: new AMap.TileLayer({
								tileUrl: this.$store.state.GoogleS
							}),
						},
						{
							// enable: true,
							id: 'GoogleMap',
							name: ' 谷歌 地图',
							layer: new AMap.TileLayer({
								tileUrl: this.$store.state.GoogleM
							}),
						},
						{
							// enable: true,
							id: 'GaodeSatellite',
							name: ' 高德 影像',
							layer: new AMap.TileLayer.Satellite()
						},
						{
							// enable: true,
							id: 'GaodeMap',
							name: ' 高德 地图',
							layer: new AMap.TileLayer.RoadNet()
						},
              ]
          }))
          })

        // 定位控件
        map.plugin('AMap.Geolocation', function () {
          map.addControl(new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'RT',    //定位按钮停靠位置，默认：'LB'，左下角
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          }));
        });

        //搜索控件
        var placeSearch = new AMap.PlaceSearch({
          map: map,
        });  
        //注册监听，当选中某条记录时会触发
        AMap.event.addListener(
          new AMap.Autocomplete({
            input: "tipinput",
          }), 
          "select", 
          (e) => {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
          }
        );
        this.map = map
    },

    // 显示地块
    showFields(){
      if(this.isShow) {
        this.polygon.show()
        this.polyline.show()
        this.textMarker.show()
        // this.circleMarker.show()
      }
      else {
        this.polygon.hide()
        this.polyline.hide()
        this.textMarker.hide()
        // this.circleMarker.hide()
      }
    },

    // 开始绘制/撤销 按钮
    btnDraw(){
      if(this.startFlag==1){

        this.path.pop()

        this.map.remove(this.circleMarker[this.path.length])
        this.map.remove(this.textMarker)
        this.map.remove(this.polyline);//移除上一个文本标记

        this.polyline = new AMap.Polyline({
          path: this.path,
          // isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 1,
          strokeColor: "#E77D3E", 
          strokeOpacity: 1,
          strokeWeight: 2,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 10,
        })
        this.polyline.setMap(this.map)
        // 缩放地图到合适的视野级别
        // this.map.setFitView([ this.polyline ])

        if(this.path.length==0) {
          this.startFlag = 0
          this.map.off('click',this.clickToDraw)
        }
      }else{
        this.startFlag = 1
        this.map.on('click',this.clickToDraw)
      }
    },
    
    // 点击绘制
    clickToDraw(e){
      // 当前点和点集合
      // var dot = [e.lnglat.lng,e.lnglat.lat]
      var dot = e.lnglat
      this.path.push(dot)
    
      // 圆点标记
      this.circleMarker[this.path.length-1] = new AMap.CircleMarker({
        center:dot,
        radius:8,//3D视图下，CircleMarker半径不要超过64px
        strokeColor:'#EB7D3B',
        strokeWeight:3,
        strokeOpacity:0.5,
        fillColor:'white', 
        fillOpacity:1,
        zIndex:50,
        bubble:false,
        cursor:'pointer',
        // clickable: true,
        draggable: false
      })
      this.circleMarker[this.path.length-1].setMap(this.map)

      // 给第一个点绑定结束事件
      if(this.path.length==1) this.circleMarker[0].on('click',this.endDraw)

      // 纯文本标记
      if(this.textMarker) this.map.remove(this.textMarker);//移除上一个文本标记
      this.textMarker = new AMap.Text({
        text:this.path.length==1 ? '打第一个点' : '继续打点',
        anchor:'bottom-center', // 设置文本标记锚点
        draggable:true,
        cursor:'pointer',
        animation:'AMAP_ANIMATION_DROP',
        // angle:10,
        style:{
          'padding': '.05rem .1rem',
          // 'margin-bottom': '1rem',
          // 'border-radius': '.25rem',
          'background-color': 'rgba(68,132,95,.8)',
          'border':'1px solid #fff!important',
          // 'width': '15rem',
          'border-width': 0,
          // 'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
          'text-align': 'center',
          'font-size': '.1rem',
          'color': '#fff'
        },
        position: dot
      });
      this.textMarker.setMap(this.map);

      // 折线
      if(this.polyline) this.map.remove(this.polyline);//移除上一个文本标记
      this.polyline = new AMap.Polyline({
        path: this.path,
        // isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 1,
        strokeColor: "#E77D3E", 
        strokeOpacity: 1,
        strokeWeight: 2,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 10,
      })
      this.polyline.setMap(this.map)
      // 缩放地图到合适的视野级别
      // this.map.setFitView([ this.polyline ])
    },

    // 结束绘制
    endDraw(){
      this.map.remove(this.textMarker)
      this.map.remove(this.polyline);
      
      this.polygon = new AMap.Polygon({
        path: this.path,  
        fillColor: this.fieldsInfo.mapColor, // 多边形填充颜色
        borderWeight: 1, // 线条宽度，默认为 1
        strokeColor: this.fieldsInfo.mapColor, // 线条颜色
        fillOpacity:.5
      });
      this.map.add(this.polygon);
      this.startFlag = 3
      this.map.off('click',this.clickToDraw)

      this.circleMarker.filter((item,index) => {
        item.setMap(null)
      })

      this.map.setFitView(this.polyline)

      var polyEditor = new AMap.PolyEditor(this.map, this.polygon)

      polyEditor.open()

      polyEditor.on('addnode', function(event) {
          // log.info('触发事件：addnode')
          this.map.setFitView(this.polyline)
      })

      polyEditor.on('adjust', function(event) {
          // log.info('触发事件：adjust')
          this.map.setFitView(this.polyline)
      })
      

      polyEditor.on('removenode', function(event) {
          // log.info('触发事件：removenode')
          this.map.setFitView(this.polyline)
      })

      polyEditor.on('end', function(event) {
          // log.info('触发事件： end')
          this.map.setFitView(this.polyline)
      })


    },

    // 颜色选择
    changeColor(color){
      this.fieldsInfo.mapColor = color
      this.polygon.setOptions({
        fillColor:this.fieldsInfo.mapColor,
        strokeColor:this.fieldsInfo.mapColor
      })
    },

    // 重新绘制
    reDraw(){
      location.reload()
    },

    // 保存退出
    saveAndQuit(){
        if(this.polyline){
          this.polyline.setMap(this.map)
          this.map.setFitView([ this.polyline ])
        }

        var center = this.map.getCenter()
        this.fieldsInfo.latitude = center.lat.toString()
        this.fieldsInfo.longitude = center.lng.toString()
        this.fieldsInfo.mapArea = (AMap.GeometryUtil.ringArea(this.path)/666.666666).toFixed(2)
        this.fieldsInfo.lnglats = JSON.stringify(this.path)

        // 获取地理位置
        var _this = this
        AMap.plugin('AMap.Geocoder', function () {
            var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: '010'
            })
            geocoder.getAddress(center, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    _this.fieldsInfo.address = result.regeocode.formattedAddress

                    // 地块信息对象
                    _this.$emit('getNewMap',_this.fieldsInfo)
                }
            })
        })
    }
  }
}
</script>

<style lang="less">
@import url('https://cache.amap.com/lbs/static/main1119.css');
.editMap{
  #container{
    height: 100%;
  }
  #container .amap-logo{
    display: none!important;
  }
  #container .amap-copyright {
    opacity:0;
  }
  .top{
    background-color: transparent;
    .back{
      font-size: .15rem;
      position: absolute;
      top: .45rem;
      left: .15rem;
      width: .5rem;
      height: .3rem;
      line-height: .3rem;
      padding: 0 .02rem;
      border-radius: 4px;
      // margin: 0 .15rem;
      background-color: #fff;
      color: #66CD91;
      text-align: center;
    }
    #myPageTop{
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      top: .45rem;
      right: .15rem;
      width: 2.83rem;
      height: .3rem;
      line-height: .3rem;
      border: none;
      border-radius: 4px;
      #tipinput{
        border: none;
        margin: 0 .2rem;
        width: 2rem;
      }
      .icon{
        background-color: #2CD18A;
        width: .5rem;
        height: .3rem;
        line-height: .38rem;
        border-radius: 4px;
        text-align: center;
        img{
          height: .17rem;
        }
      }
      }
  }
  .amap-maptypecontrol{
    top: .9rem;
    transform: scale(.8);
  }
  // 定位控件
  .amap-geolocation-con{
    top: .9rem!important;
    right: .15rem!important;
    width: .24rem;
    height: .24rem;
    overflow: hidden;
    border-radius: 50%;
    .amap-geo{
      width: 90%;
      height: 90%;
    }
  }
  // 图层控件
  .amap-ui-control-position-rt{  
    top: 1.25rem!important;
    right: .15rem!important;
    overflow: hidden;
    .amap-ui-control-layer-toggle{
      width: .24rem;
      height: .24rem;
      line-height: .24rem;
      transform: scale(.6);
    }
    .iconfont.icon-layer-switcher{
      margin: 0;
      padding: 0;
    }
 }
 .bottom{
     width: 100%;
     position: absolute;
     bottom: 0rem;
     left: 50%;
     transform: translate(-50%);
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
   .startDraw{
     font-size: .18rem;
    //  width: .8rem;
      margin: .3rem 0;
     padding: .08rem .3rem;
     border-radius: .3rem;
     box-shadow: #499367 0px -2px 3px inset;
     background-color:#66CD91;
     color: #fff;
   }
   .back{
     box-shadow: #9D474C 0px -2px 3px inset;
     background-color: #DB646A;
   }
   .text{
     font-size: .1rem;
     color: #888;
     background-color: rgba(237,236,234,.8);
     padding:.05rem .1rem;
     margin-top: .1rem;
     border-radius: 4px;
     display: flex;
     justify-content: space-evenly;
     align-items: center;
   }
   .bg{
     width: 100%;
     height: 1.5rem;
     background-color: rgba(0,0,0,.6);
     display: flex;
     justify-content: space-evenly;
     flex-direction: column;

     .block{
       font-size: .14rem;
       color: #2CD18A;
       display: flex;
       justify-content: center;
       align-items: center;
       .el-color-picker{
         margin: 0 .2rem;
       }
     }
      .btn{
        font-size: .18rem;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          color: #2CD18A;
          border: 1px solid #999;
          padding: .08rem .35rem;
          border-radius: .4rem;
          margin: 0 .06rem;
        }
        .saveAndQuit{
          color: #fff;
          border: 1px solid #438860;
          background-color: #66CD91;
          box-shadow: #438860 0px -2px 3px inset;
        }
      }
   }
}
}


</style>
