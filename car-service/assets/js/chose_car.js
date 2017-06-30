/**
 * Created by zhouzelin on 2016/7/27.
 * 用于选择车辆
 * 使用前确保导入以下文件
 * mui.min.css,mui.picker.css,mui.poppicker.css
 * mui.min.js,mui.picker.js,mui.poppicker.js
 */
    //选择车牌号前缀
    function choseLicense(divId,div2Id){
    /*
     *@param
     *divId 触发控件元素的id
     *div2Id 显示数据的元素的id
     */
        if(!arguments[2]){
        	  mui.init();
        }
        mui.ready(function() {
            //二级级联
            var cityPicker = new mui.PopPicker({
                layer: 2
            });
            cityPicker.setData(licenseData);
            var result = document.getElementById(divId);
            var showCityPickerButton = document.getElementById(div2Id);
            showCityPickerButton.addEventListener('tap', function(event) {
                jQuery('.mui-poppicker').css('display','block');
                document.getElementById('arrow').className = 'up';
                setTimeout(function(){
                    cityPicker.show(function(items) {
                        result.innerText = (items[0] || {}).text + (items[1] || {}).text ;
                        document.getElementById('arrow').className = 'down';
                        //返回 false 可以阻止选择框的关闭
                        //return false;
                    });
                },30);
            }, false);
            jQuery('.mui-poppicker-btn-cancel').on('tap',function(){
                document.getElementById('arrow').className = 'down';
            });
        });
    }

    //选择车品牌车型车款
    function choseCar(divId,div2Id,brandid,modelid,detailid){
    /*
     *@param
     *divId 触发控件元素的id
     *div2Id 显示数据的元素的id
     *brandid 保存品牌id的隐藏input框的id
     *modelid 保存车型id的隐藏input框的id
     *detaild 保存车款id的隐藏input框的id
     */
        mui.init();
        mui.ready(function() {
            //三级级联
            var carPicker = new mui.PopPicker();
            //获取品牌
            jsonAjax(API.API_LIST.CAR_CARINFO_GETCARBRAND,{},function(res){
                if(res.status==1){
                    var arr = [];
                    mui.each(res.data,function(index,item){
                        var obj = {};
                        obj.text = '<img src="'
                            +item.logo+'" style="height:100%;vertical-align:middle;margin-right:0.5rem;"><span>'
                            +item.brand+'</span>';
                        obj.text2 = item.brand;
                        obj.value = item.brandid;
                        arr.push(obj);
                    });
                    carPicker.setData(arr);
                }else{
                    mui.alert(res.info);
                }
            });

            var showCarPickerButton = document.getElementById(divId);
            showCarPickerButton.addEventListener('tap', function(event) {
                var lastResult = "";
                carPicker.show(function(items) {
                    lastResult += items[0].text2+' ';
                    document.getElementById(brandid).value = items[0].value;
                    //获取车款
                    jsonAjax(API.API_LIST.CAR_CARINFO_GETCARMODEL,{brandid:items[0].value},function(res){
                        if(res.status==1){
                            var arr = [];
                            mui.each(res.data,function(index,item){
                                var obj = {};
                                obj.text = item.model;
                                obj.value = item.modelid;
                                arr.push(obj);
                            });
                            var carPicker2 = new mui.PopPicker();
                            carPicker2.setData(arr);
                            carPicker2.show(function(items) {
                                lastResult += items[0].text+' ';
                                document.getElementById(modelid).value = items[0].value;
                                //获取车型
                                jsonAjax(API.API_LIST.CAR_CARINFO_GETCARDETAIL,{modelid:items[0].value},function(res){
                                    if(res.status==1){
                                        var arr = [];
                                        mui.each(res.data,function(index,item){
                                            var obj = {};
                                            obj.text = item.detail;
                                            obj.value = item.detailid;
                                            arr.push(obj);

                                        });
                                        var carPicker3 = new mui.PopPicker();
                                        carPicker3.setData(arr);
                                        carPicker3.show(function(items) {
                                            lastResult += items[0].text;
                                            document.getElementById(detailid).value = items[0].value;
                                            document.getElementById(div2Id).innerHTML = lastResult;
                                        });
                                    }else{
                                        mui.alert(res.info);
                                    }
                                })

                            });

                        }else{
                            mui.alert(res.info);
                        }
                    });

                });
            }, false);
        });
    }
