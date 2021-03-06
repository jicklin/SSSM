// 省份
var province_arr = new Array(
		"北京市", "上海市", "天津市", "重庆市", "中国台湾", "中国香港", "中国澳门", 
		"河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", 
		"安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省",
		"海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", 
		"内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区");
 
// 城市
var city_arr = new Array();
city_arr[0] = "";
city_arr[1] = "北京市区|北京市辖区";
city_arr[2] = "上海市区|上海市辖区";
city_arr[3] = "天津市区|天津市辖区";
city_arr[4] = "重庆市区|重庆市辖区";
city_arr[5] = "中国台湾";
city_arr[6] = "中国香港";
city_arr[7] = "中国澳门";
city_arr[8] = "石家庄|张家口市|承德市|秦皇岛市|唐山市|廊坊市|保定市|沧州市|衡水市|邢台市|邯郸市";
city_arr[9] = "太原市|大同市|朔州市|阳泉市|长治市|晋城市|忻州地区|吕梁地区|晋中市|临汾地区|运城地区";
city_arr[10] = "沈阳市|朝阳市|阜新市|铁岭市|抚顺市|本溪市|辽阳市|鞍山市|丹东市|大连市|营口市|盘锦市|锦州市|葫芦岛市";
city_arr[11] = "长春市|白城市|松原市|吉林市|四平市|辽源市|通化市|白山市|延边朝鲜族自治州";
city_arr[12] = "哈尔滨市|齐齐哈尔市|牡丹江市|佳木斯市|大庆市|鸡西市|双鸭山市|伊春市|七台河市|鹤岗市|黑河市|绥化市|大兴安岭行署";
city_arr[13] = "南京市|徐州市|连云港|宿迁市|淮阴市|盐城市|扬州市|泰州市|南通市|镇江市|常州市|无锡市|苏州市";
city_arr[14] = "杭州市|湖州市|嘉兴市|舟山市|宁波市|绍兴市|金华市|台州市|温州市|丽水地区";
city_arr[15] = "合肥市|宿州市|淮北市|阜阳市|蚌埠市|淮南市|滁州市|马鞍山市|芜湖市|铜陵市|安庆市|黄山市|六安市|巢湖市|池州地区|宣城地区";
city_arr[16] = "福州市|南平市|三明市|莆田市|泉州市|厦门市|漳州市|龙岩市|宁德市";
city_arr[17] = "南昌市|九江市|景德镇市|鹰潭市|新余市|萍乡市|赣州市|上饶地区|抚州地区|宜春地区|吉安地区";
city_arr[18] = "济南市|聊城市|德州市|东营市|淄博市|潍坊市|烟台市|威海市|青岛市|日照市|临沂市|枣庄市|济宁市|泰安市|莱芜市|滨州地区|菏泽地区";
city_arr[19] = "郑州市|三门峡市|洛阳市|焦作市|新乡市|鹤壁市|安阳市|濮阳市|开封市|商丘市|许昌市|漯河市|平顶山市|南阳市|信阳市|省直辖行政单位|周口地区|驻马店地区";
city_arr[20] = "武汉市|十堰市|襄攀市|荆门市|孝感市|黄冈市|鄂州市|黄石市|咸宁市|荆州市|宜昌市|省直辖行政单位|恩施土家族苗族自治州|襄樊市";
city_arr[21] = "长沙市|张家界市|常德市|益阳市|岳阳市|株洲市|湘潭市|衡阳市|郴州市|永州市|邵阳市|怀化市|娄底市|湘西土家族苗族自治州";
city_arr[22] = "广州市|清远市|韶关市|河源市|梅州市|潮州市|汕头市|揭阳市|汕尾市|惠州市|东莞市|深圳市|珠海市|江门市|佛山市|肇庆市|云浮市|阳江市|茂名市|湛江市";
city_arr[23] = "海口市|三亚市|省直辖行";
city_arr[24] = "成都市|广元市|绵阳市|德阳市|南充市|广安市|遂宁市|内江市|乐山市|自贡市|泸州市|宜宾市|攀枝花市|巴中地区|达川市|资阳地区|眉山地区|雅安地区|阿坝藏族羌族自治州|甘孜藏族自治州|凉山彝族自治州";
city_arr[25] = "贵阳市|六盘水市|遵义市|毕节地区|铜仁地区|安顺地区|黔东南苗族侗族自治地区|黔南布依族苗族自治区|黔西南布依族苗族自治州";
city_arr[26] = "昆明市|曲靖市|玉溪市|丽江地区|昭通地区|思茅地区|临沧地区|保山地区|德宏傣族景颇族自治州|怒江僳僳族自治州|迪庆藏族自治州|大理白族自治州|楚雄彝族自治州|红河哈尼族自治州|文山壮族自治州|西双版纳傣族自治州";
city_arr[27] = "西安市|延安市|铜川市|渭南市|咸阳市|宝鸡市|汉中市|榆林市|商洛地区|安康地区";
city_arr[28] = "兰州市|嘉峪关市|金昌市|白银市|天水市|酒泉地区|张掖地区|武威地区|庆阳地区|平凉地区|定西地区|陇南地区|临夏回族自治州|甘南藏族自治州";
city_arr[29] = "西宁市|海东地区|西宁市|海北藏族|海南藏族|黄南藏族|果洛藏族|玉树藏族|海西蒙古";
city_arr[30] = "呼和浩特|包头市|乌海市|赤峰市|呼伦贝尔盟|兴安盟|哲里木盟|锡林郭勒盟|乌兰察布盟|伊克昭盟|巴彦淖尔盟|阿拉善盟";
city_arr[31] = "南宁市|桂林市|柳州市|梧州市|贵港市|玉林市|钦州市|北海市|防城港市|南宁地区|百色地区|河池地区|柳州地区|贺州地区";
city_arr[32] = "拉萨市|那曲地区|昌都地区|林芝地区|山南地区|日喀则|阿里地区";
city_arr[33] = "银川市|石嘴山市|吴忠市|固原地区";
city_arr[34] = "乌鲁木齐市|克拉玛依市|自治区直辖行政单位|喀什地区|阿克苏地区|和田地区|吐鲁番地区|哈密地区|克孜勒苏柯尔克孜|博尔塔拉蒙古自治州|昌吉回族自治州|巴音郭楞蒙古自治州|伊犁哈萨克自治州|伊犁地区|塔城地区|阿勒泰地区";

 
 
function populateCity(provinceElementId, cityElementId) {
	 
    var selectedProvinceIndex = document.getElementById(provinceElementId).selectedIndex;
 
    var cityElement = document.getElementById(cityElementId);
 
    cityElement.length = 0;
    cityElement.options[0] = new Option('选择 城市', '');
    cityElement.selectedIndex = 0;
 
    var city_arr2 = city_arr[selectedProvinceIndex].split("|");
 
    for (var i = 0; i < city_arr2.length; i++) {
    	cityElement.options[cityElement.length] = new Option(city_arr2[i], city_arr2[i]);
    }
}
 
function populateProvinces(provinceElementId, cityElementId) {
	
    var provinceElement = document.getElementById(provinceElementId);
    
    provinceElement.length = 0;
    provinceElement.options[0] = new Option('选择 省份', '-1');
    provinceElement.selectedIndex = 0;
    
    for (var i = 0; i < province_arr.length; i++) {
    	provinceElement.options[provinceElement.length] = new Option(province_arr[i], province_arr[i]);
    }
 
 
    if (cityElementId) {
    	provinceElement.onchange = function () {
            populateCity(provinceElementId, cityElementId);
        };
    }
}