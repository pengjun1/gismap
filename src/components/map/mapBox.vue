<template>
	<!-- <div> -->
		<div class="mapBox" :id="fieldsDetail ? fieldsDetail.id : 'map123'" >
		<div class="control" v-if="showAll">
			<input id="tipinput" placeholder="查询地点:市政务中心;  查询天气:合肥市"/>
			<div class="weatherinfo">
				<p id='activecast'></p>
				<p id='forecast'></p>
			</div>
		</div>
		</div>
	<!-- </div> -->
</template>

<script>
export default {
	props:['fieldsDetail','fieldsList','showAll'],
	data(){
		return {
			map:null,
			polygon:[],
		}
	},
	mounted(){
		this.init()
	},
	methods:{
		// 初始化地图
		init(){
			// 地图容器
			this.map = new AMap.Map(this.fieldsDetail ? this.fieldsDetail.id : 'map123', {
				resizeEnable: true,
				// center:[117.6, 31.6],
				zooms: [3, 19],
				zoom: 11,
				layers: [
					new AMap.TileLayer({
						tileUrl: this.$store.state.GoogleS,
						zooms: [3, 19],
					}),
					new AMap.TileLayer.RoadNet()
				],
			});
			
			if(this.fieldsDetail) this.setPolygonOne()
			if(this.fieldsList) {
				this.setPolygonList()
				
				var _this = this
				this.basicControl(this.map,_this)
				this.searchControl(this.map,_this)
				this.locateControl(this.map)

				// console.log(map.getCenter());
				// var address = this.codeToAddress([map.getCenter().lng, map.getCenter().lat])
				// this.weatherControl('合肥市')
				// this.map = map
			}
		},

		// 坐标转换
		codeToAddress(lnglat) {
			var Geocoder = new AMap.Geocoder()
			return Geocoder.getAddress(lnglat)
		},

		// 基础控件-图层控件
		basicControl(map,_this) {
			AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
				map.addControl(new BasicControl.LayerSwitcher({
					baseLayers: [
						{
							enable: true,
							id: 'GoogleSatellite',
							name: ' 谷歌 影像',
							layer: new AMap.TileLayer({
								tileUrl: _this.$store.state.GoogleS
							}),
						},
						{
							// enable: true,
							id: 'GoogleMap',
							name: ' 谷歌 地图',
							layer: new AMap.TileLayer({
								tileUrl: _this.$store.state.GoogleM
							}),
						},
						{
							// enable: true,
							id: 'GaodeSatellite',
							name: ' 高德 影像',
							layer: new AMap.TileLayer.Satellite()
						},
						// {
						// 	// enable: true,
						// 	id: 'GaodeMap',
						// 	name: ' 高德 地图',
						// 	layer: new AMap.TileLayer.RoadNet()
						// },
					]
				}))
			})
		},

		// 搜索控件
		searchControl(map,_this) {
			var placeSearch = new AMap.PlaceSearch({map}); 
			AMap.event.addListener(
				new AMap.Autocomplete({
					input: "tipinput"
				}), 
				"select", 
				(e) => {
					placeSearch.setCity(e.poi.adcode);
					placeSearch.search(e.poi.name);
					_this.weatherControl(e.poi.name)
			});
		},

		// 定位控件
		locateControl(map) {
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
		},

		// 天气控件
		weatherControl(addressName) {
			AMap.plugin('AMap.Weather', function() {
				var weather = new AMap.Weather();
				//查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
				weather.getLive(addressName, function(err, data) {
					if (!err) {
						var str = [];
						str.push('<p><b>实时天气</b><br/></p>');
						str.push('<p>城市/区：' + data.city + '</p>');
						str.push('<p>天气：' + data.weather + '</p>');
						str.push('<p>温度：' + data.temperature + '℃</p>');
						str.push('<p>风向：' + data.windDirection + '</p>');
						str.push('<p>风力：' + data.windPower + ' 级</p>');
						str.push('<p>空气湿度：' + data.humidity + '</p>');
						str.push('<p>发布时间：' + data.reportTime + '</p>');
						document.getElementById('activecast').innerHTML = str.join('');
					}
				});
				//未来4天天气预报
				weather.getForecast(addressName, function(err, data) {
					if (err) {return;}
					var str = [];
					str.push('<hr/><br/><p><b>预报天气</b><br/></p>');
					for (var i = 0,dayWeather; i < data.forecasts.length; i++) {
						dayWeather = data.forecasts[i];
						str.push(dayWeather.date+' <span class="weather">'+dayWeather.dayWeather+'</span> '+ dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃' + '<br>');
					}
					document.getElementById('forecast').innerHTML = str.join('');
				});
			});
		},

		// 绘制一个多边形
		setPolygonOne() {
			var path = []
			JSON.parse(this.fieldsDetail.lnglats).filter((item,index) => {
				path[index] = [item.lng , item.lat]
			})
			this.polygon = new AMap.Polygon({
				path,  
				fillColor: this.fieldsDetail.mapColor, // 多边形填充颜色
				borderWeight: 1, // 线条宽度，默认为 1
				strokeColor: this.fieldsDetail.mapColor, // 线条颜色
				fillOpacity:.5
			});

			this.setCateIcon([this.fieldsDetail.longitude,this.fieldsDetail.latitude],this.fieldsDetail)

			this.map.add(this.polygon);
			this.map.setFitView([ this.polygon ])
		},

		// 绘制多个多边形
		setPolygonList() {
			var path = []
			var polygonArr= []

			this.fieldsList.filter((item,index) => {
				path.push([])
				JSON.parse(item.lnglats).filter((item1,index1) => {
					path[index][index1] = [item1.lng , item1.lat]
				})

				this.polygon[index] = new AMap.Polygon({
					path: path[index],  
					fillColor: item.mapColor, // 多边形填充颜色
					borderWeight: 1, // 线条宽度，默认为 1
					strokeColor: item.mapColor, // 线条颜色
					fillOpacity:.5
				})
				
				this.polygon[index].on('click', () => {
					this.$emit('clickFields',item.id)
					// this.map.panTo([item.longitude,item.latitude])
					// this.map.setFitView(this.polygon[index])
					console.log(item.address.province);
					// var address = this.weatherControl(item.address)
					// console.log(address);
				})
				
				polygonArr.push(this.polygon[index])
				
				this.map.add( this.polygon[index] )

				if(item.catelist.length!=0) {
					// item.catelist.filter(item2 => {
						this.setCateIcon([item.longitude,item.latitude], item)
					// })
				}else{
					this.setCateIcon([item.longitude,item.latitude], 0)
				}
			})
			this.map.setFitView( polygonArr )
		},

		// 绘制品种图标
		setCateIcon(lnglat,item) {
			var iconUrl = ''
			if(item.catelist){
				if(item.catelist.length == 0) iconUrl = require('@/assets/image/fields/0.png')
				else if(item.catelist[0].parentId == 1) iconUrl = require('@/assets/image/fields/1.png')
				else if(item.catelist[0].parentId == 2) iconUrl = require('@/assets/image/fields/2.png')
				else if(item.catelist[0].parentId == 3) iconUrl = require('@/assets/image/fields/3.png')
			}else{
				iconUrl = require('@/assets/image/fields/0.png')
			}

			var icon = new AMap.Icon({
				size: new AMap.Size(10, 10),
				image: iconUrl,
				imageSize: new AMap.Size(10, 10),
			});

			var marker = new AMap.Marker({
				icon: icon,
				position: new AMap.LngLat(lnglat[0] , lnglat[1]),
				offset: new AMap.Pixel(-5, -5)
			});

			this.map.add(marker);
		},
	},
	watch: {
		fieldsDetail(){
			this.init()
		},
		fieldsList(){
			this.init()
		}
	}
}
</script>

<style lang="less" scoped>

.mapBox{
	width: 100%;
	height: 100%;
	background-color: #476959!important;
}
/deep/.amap-logo{
	display: none!important;
}
/deep/.amap-copyright {
	opacity:0;
}
// 定位
/deep/.amap-geolocation-con{
	top: 63px!important;
	.amap-geo{
		width: 25px;
		height: 25px;
	}
}
// 图层
/deep/.amap-ui-control-position-rt{
	top: 110px;
	right: 10px;
	// width: 37px;
	text-align: center;
	i{
		width: 30px;
	}
}
// 搜索
#tipinput{
	z-index: 999;
	position: absolute;
	top: 60px;
	left: 44%;
	transform: translateX(-50%);
	// background-color: red;
	padding: 7px 10px;
	width: 76%;
	max-width: 400px;
}
// 天气
.weatherinfo{
	z-index: 999;
	position: absolute;
	top: 100px;
	left: 10px;
	background-color: rgba(255, 255, 255, 1);
}
</style>
