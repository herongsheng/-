console.log($("#end"))

var app=angular.module("myapp",['ngRoute'],RouteConfig);
  function RouteConfig($routeProvider){
      // $routeProvider固定写法,路由提供者
      $routeProvider
        .when('/',{
          templateUrl:"./tpl/sp.html"
          // 你就把这个页面想象成,就在一个页面里面写
        })
        .when('/cart',{
          templateUrl:"./tpl/cart.html"
        })
    }
// 控制器
    app.controller("cont",function($scope){
      $scope.data=[
      {goodsId:"101010","image":"./image/nangua.png",name:"皮蛋廋肉粥配包子",sell:"5453",good:"100%",price:"19",yuanjia:"26",num:"0",disbool:true},
      {goodsId:"101011","image":"./image/图层-5.png",name:"链子黑桃黑米粥",sell:"6563",good:"80%",price:"32",yuanjia:"46",num:"0",disbool:true},
      {goodsId:"101012","image":"./image/图层-3.png",name:"雪梨银耳百合粥",sell:"2451",good:"90%",price:"20",yuanjia:"30",num:"0",disbool:true},
      {goodsId:"101013","image":"./image/nangua.png",name:"南瓜粥",sell:"3448",good:"70%",price:"17",yuanjia:"20",num:"0",disbool:true},
      ];


      $scope.sum=0;// sum计算总价
     
      $scope.cart=[]; // 第一一个数组把去重的放在里面

      // $scope.num=0;//计算单个有多少个商品
      $scope.price=0;//计算单个商品价格
     
      $scope.cc=0; // 计算总商品个数

       // alert(888)
      $scope.set=function(goodsId,bool){

  
       if($scope.cc>0){
       

       }
        
        angular.forEach($scope.data,function(item,index){
        //负负为正,把价格转成数字类型
               // $scope.sum+=item.price*item.num;//全商品总价
   
        item.price=-(-item.price);
        item.num=-(-item.num);

           
       

          if(goodsId===item.goodsId){
              
          
            if(bool){ 
             $scope.cc++;
            $scope.sum+=item.price
              item.num++;
              console.log(item.num)
          // $scope.cc+=item.num;

              $("#end").css({"background":"cyan"});

              // $scope.sum+=item.price*item.num;//全商品总价
                

                // console.log($scope.sum)
            }else{   
             $scope.cc--;

         // 这里设置当单个商品大于0时才执行减
              if(item.num>0){
                 $scope.sum-=item.price;//全商品总价
                  // $scope.cc-=item.num;
             

              }


              item.num--;
             
              // if($scope.sum<0){
              // // $("#box>ul").css({"display":"none"});
              // // console.log($("#box>ul"));
              // console.log(999)
              //   $scope.sum=0;
              // }
               
              if($scope.cc<0){
               $("#end").css({"background":"cyan"});
                $scope.cc=0;
              }

             if(item.num<0){ 
              // console.log($("#box>ul:eq("+this.index()+")"))
              // $("#box>ul").css({"display":"none"});
              item.num=0;
              }
           
             
            }
             // 去除相同商品
            if(item.num>0){
             $scope.item2=[];
           
              // console.log(item);
              $scope.cart.push(item); 
              // console.log($scope.cart);
              for(var i=0,len=$scope.cart.length;i<len;i++){
                // console.log(i)
                if($scope.item2.indexOf($scope.cart[i])<0){
                
                  $scope.item2.push($scope.cart[i]); 

                }
             

              } 
              // console.log($scope.item2);

            }
             // 设置满20起送
              
            
            if($scope.sum>20){
          
               $("#xuan").css({"display":"none"});

               $("#jiesua").css({"display":"block"});

            }else{

               $("#xuan").css({"display":"block"});

               $("#jiesua").css({"display":"none"});

            }
            

            // fly函数
             var flyer = $('<img class="u-flyer" src="'+item.image+'">');      
                        //鼠标在页面点击开始位置计算.
                  var top = $(window).scrollTop();
                  
                  var dh = event.pageY;

                  var newh = dh - top;

                  // 鼠标结束位置计算 
                  var oDiv = $('#end').offset();
                  var newdh = oDiv.top - top;

                  flyer.fly({
                    start: {
                      left: event.pageX,
                      top: newh
                    },
                    end: {
                      left: oDiv.left,
                      top: newdh,
                      width: 10,
                      height: 10
                    }
                  });
          }


        })

      }



    });
    // 滑屏部分

    app.directive('direc',function(){
                 
                  return {
                      restrict:'AE', 
                      replace : true, 
                      compile:function(){
                      //选项卡部分
                var tabsSwiper = new Swiper('#tabs-container',{
                  speed:500,
                  onSlideChangeStart: function(){
                    $(".tabs .active").removeClass('active')
                    $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active')  
                  }
                })
                $(".tabs a").on('touchstart mousedown',function(e){
                  e.preventDefault()
                  $(".tabs .active").removeClass('active')
                  $(this).addClass('active')
                  tabsSwiper.slideTo( $(this).index() )
                })
                $(".tabs a").click(function(e){
                  e.preventDefault()
                })
                
                // 划屏部分
                  var mySwiper1 = new Swiper ('#slide1', {
                            direction : 'vertical',
                            slidesPerView : 'auto',//一屏放几个slide
                              freeMode : true,//启用用户滑动惯性
                              onTap: function(){
              //                click事件在移动端有300ms延迟
                              //使用 onTap来代替 click
                 // console.log(mySwiper1.clickedIndex);//返回当前点击,索引值

               mySwiper2.slideTo(mySwiper1.clickedIndex);
              //slideTo强制让滑屏翻转到相应索引值slide位置
                   var index=mySwiper1.clickedIndex;
                   // console.log(index);
                
                  $('#ullist>li:eq('+index+')').addClass("active").siblings().removeClass("active");

                              }
                           
                        }); 
                 var mySwiper2 = new Swiper ('#slide2', {
                          direction : 'vertical',
                            freeMode : true,//启用用户滑动惯性
                            autoHeight: true, //高度随内容变化
                            onSlideChangeStart: function(swiper){
                              var index=swiper.activeIndex;
                              $('#ullist>li:eq('+index+')').addClass("active").siblings().removeClass("active");
                              }


          }); 
          // 每渲染一次执行一次
        }
    };
});

// 点击出现商品



